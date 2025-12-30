import type { NextAuthConfig } from 'next-auth'

// Check if we're in build phase - skip initialization if so
const isBuildPhase = () => {
  if (typeof process === 'undefined') return false
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')
  )
}

// Lazy load Prisma to avoid build-time database connection
const getPrisma = () => {
  if (isBuildPhase()) {
    // Return a dummy prisma client during build
    return {
      user: {
        findUnique: async () => null,
      },
    } as any
  }
  return require('@/lib/prisma').prisma
}

// Lazy initialization of NextAuth to prevent build-time execution
let nextAuthInstance: any = null

const getNextAuth = () => {
  // During build phase, return a dummy instance that won't be used
  if (isBuildPhase()) {
    return {
      handlers: {
        GET: async () => new Response('Not available during build', { status: 503 }),
        POST: async () => new Response('Not available during build', { status: 503 }),
      },
      signIn: async () => ({ error: 'Not available during build' }),
      signOut: async () => ({ error: 'Not available during build' }),
      auth: async () => null,
    }
  }
  
  if (!nextAuthInstance) {
    // Only import and initialize at runtime
    const NextAuth = require('next-auth').default
    const Credentials = require('next-auth/providers/credentials').default
    const bcrypt = require('bcryptjs')

    const authConfig: NextAuthConfig = {
      providers: [
        Credentials({
          name: 'Credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null
            }

            const db = getPrisma()
            const user = await db.user.findUnique({
              where: { email: credentials.email as string },
            })

            if (!user || !user.password) {
              return null
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            )

            if (!isPasswordValid) {
              return null
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          },
        }),
      ],
      session: {
        strategy: 'jwt',
      },
      pages: {
        signIn: '/admin/login',
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id
            token.role = (user as any).role
          }
          return token
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.id as string
            session.user.role = token.role as string
          }
          return session
        },
      },
    }

    nextAuthInstance = NextAuth(authConfig)
  }
  return nextAuthInstance
}

// Export getters that initialize NextAuth only when accessed
// Using a function to ensure lazy evaluation
function createHandlers() {
  return {
    GET: async (request: Request) => {
      const { handlers: authHandlers } = getNextAuth()
      return authHandlers.GET(request)
    },
    POST: async (request: Request) => {
      const { handlers: authHandlers } = getNextAuth()
      return authHandlers.POST(request)
    },
  }
}

// Export handlers - will only be created when accessed
export const handlers = createHandlers()

export const signIn = async (provider?: string, options?: any) => {
  const { signIn: authSignIn } = getNextAuth()
  if (provider) {
    return authSignIn(provider, options)
  }
  return authSignIn(options)
}

export const signOut = async (options?: any) => {
  const { signOut: authSignOut } = getNextAuth()
  return authSignOut(options)
}

export const auth = async () => {
  const { auth: authFn } = getNextAuth()
  return authFn()
}

