// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Check if we're in build phase
const isBuildPhase = () => {
  if (typeof process === 'undefined') return false
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    process.env.NEXT_PHASE?.includes('build') === true
  )
}

// Lazy load handlers to prevent build-time initialization
async function getHandlers() {
  // During build, return dummy handlers immediately
  if (isBuildPhase()) {
    return {
      GET: async () => new Response(JSON.stringify({ error: 'Not available during build' }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }),
      POST: async () => new Response(JSON.stringify({ error: 'Not available during build' }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }),
    }
  }

  try {
    const { handlers } = await import('@/auth')
    return handlers
  } catch (error: any) {
    console.error('Error loading auth handlers:', error)
    return {
      GET: async () => new Response(JSON.stringify({ error: 'Authentication service unavailable' }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }),
      POST: async () => new Response(JSON.stringify({ error: 'Authentication service unavailable' }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }),
    }
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
