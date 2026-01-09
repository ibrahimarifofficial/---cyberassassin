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
let prismaInstance: any = null
let prismaPromise: Promise<any> | null = null

const getPrisma = async () => {
  if (isBuildPhase()) {
    // Return a dummy prisma client during build
    return {
      user: {
        findUnique: async () => null,
      },
    } as any
  }
  
  if (!prismaInstance) {
    if (!prismaPromise) {
      prismaPromise = import('@/lib/prisma').then(module => module.prisma)
    }
    prismaInstance = await prismaPromise
  }
  return prismaInstance
}

// Lazy initialization of NextAuth to prevent build-time execution
let nextAuthInstance: any = null
let nextAuthPromise: Promise<any> | null = null

const getNextAuth = async () => {
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
    if (!nextAuthPromise) {
      // Use dynamic import for ESM packages
      nextAuthPromise = (async () => {
        const [NextAuthModule, CredentialsModule, bcryptModule] = await Promise.all([
          import('next-auth'),
          import('next-auth/providers/credentials'),
          import('bcryptjs')
        ])
        
        const NextAuth = NextAuthModule.default
        const Credentials = CredentialsModule.default
        const bcrypt = bcryptModule.default

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

                // Block old admin credentials
                const blockedEmails = ['admin@cyber.com', 'admin@cyber']
                if (blockedEmails.includes(credentials.email as string)) {
                  return null
                }

                const db = await getPrisma()
                const user = await db.user.findUnique({
                  where: { email: credentials.email as string },
                })

                if (!user || !user.password) {
                  return null
                }

                // Block old admin password
                if (credentials.password === 'admin') {
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
            signIn: '/admin/thecyberassassindashboardlogin2026-xyxyxz-01111',
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

        return NextAuth(authConfig)
      })()
    }
    nextAuthInstance = await nextAuthPromise
  }
  return nextAuthInstance
}

// Export handlers - completely lazy, only created when accessed
// This function is only called when handlers are actually needed (at runtime)
async function createHandlers() {
  const nextAuth = await getNextAuth()
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
let _handlers: Awaited<ReturnType<typeof createHandlers>> | null = null
let _handlersPromise: Promise<Awaited<ReturnType<typeof createHandlers>>> | null = null

const getHandlers = async () => {
  if (!_handlers) {
    if (!_handlersPromise) {
      _handlersPromise = createHandlers()
    }
    _handlers = await _handlersPromise
  }
  return _handlers
}

// Export handlers object - using Object.defineProperty to make it truly lazy
export const handlers = {} as Awaited<ReturnType<typeof createHandlers>>

Object.defineProperty(handlers, 'GET', {
  get() {
    // Return a function that awaits the handlers
    return async (request: Request) => {
      const h = await getHandlers()
      return h.GET(request)
    }
  },
  enumerable: true,
  configurable: true
})

Object.defineProperty(handlers, 'POST', {
  get() {
    // Return a function that awaits the handlers
    return async (request: Request) => {
      const h = await getHandlers()
      return h.POST(request)
    }
  },
  enumerable: true,
  configurable: true
})

export const signIn = async (provider?: string, options?: any) => {
  const nextAuth = await getNextAuth()
  const { signIn: authSignIn } = nextAuth
  if (provider) {
    return authSignIn(provider, options)
  }
  return authSignIn(options)
}

export const signOut = async (options?: any) => {
  const nextAuth = await getNextAuth()
  const { signOut: authSignOut } = nextAuth
  return authSignOut(options)
}

export const auth = async () => {
  const nextAuth = await getNextAuth()
  const { auth: authFn } = nextAuth
  return authFn()
}

