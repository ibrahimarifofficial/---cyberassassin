import type { NextAuthConfig } from 'next-auth'

// Check if we're in build phase - skip initialization if so
const isBuildPhase = () => {
  if (typeof process === 'undefined') return false
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    process.env.NEXT_PHASE?.includes('build') === true ||
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

    // Support both AUTH_SECRET (NextAuth v5) and NEXTAUTH_SECRET (fallback)
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

    const authConfig: NextAuthConfig = {
      secret: secret,
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

// Export handlers - completely lazy, only created when accessed
// This function is only called when handlers are actually needed (at runtime)
function createHandlers() {
  const nextAuth = getNextAuth()
  return {
    GET: async (request: Request) => {
      return nextAuth.handlers.GET(request)
    },
    POST: async (request: Request) => {
      return nextAuth.handlers.POST(request)
    },
  }
}

// Export handlers as a getter function to prevent build-time evaluation
// This ensures Next.js doesn't try to analyze the handlers during build
let _handlers: ReturnType<typeof createHandlers> | null = null

const getHandlers = () => {
  if (!_handlers) {
    _handlers = createHandlers()
  }
  return _handlers
}

// Export handlers object - using Object.defineProperty to make it truly lazy
export const handlers = {} as ReturnType<typeof createHandlers>

Object.defineProperty(handlers, 'GET', {
  get() {
    return getHandlers().GET
  },
  enumerable: true,
  configurable: true
})

Object.defineProperty(handlers, 'POST', {
  get() {
    return getHandlers().POST
  },
  enumerable: true,
  configurable: true
})

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

