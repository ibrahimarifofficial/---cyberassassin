// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Lazy load handlers to prevent build-time initialization
async function getHandlers() {
  try {
    const { handlers } = await import('@/auth')
    return handlers
  } catch (error: any) {
    // If we're in build phase, return a dummy handler
    if (typeof process !== 'undefined' && 
        (process.env.NEXT_PHASE?.includes('build') || !process.env.DATABASE_URL)) {
      return {
        GET: async () => new Response('Not available during build', { status: 503 }),
        POST: async () => new Response('Not available during build', { status: 503 }),
      }
    }
    throw error
  }
}

export async function GET(request: Request) {
  const handlers = await getHandlers()
  return handlers.GET(request)
}

export async function POST(request: Request) {
  const handlers = await getHandlers()
  return handlers.POST(request)
}
