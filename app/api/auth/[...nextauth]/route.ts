// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// Completely lazy load - only import when route is actually called
export async function GET(request: Request) {
  // Check if we're in build phase
  const isBuild = typeof process !== 'undefined' && (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    process.env.NEXT_PHASE?.includes('build') === true
  )

  if (isBuild) {
    return new Response(JSON.stringify({ error: 'Not available during build' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // Dynamic import only when route is called
    const { handlers } = await import('@/auth')
    return handlers.GET(request)
  } catch (error: any) {
    console.error('Error loading auth handlers:', error)
    return new Response(JSON.stringify({ error: 'Authentication service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(request: Request) {
  // Check if we're in build phase
  const isBuild = typeof process !== 'undefined' && (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build' ||
    process.env.NEXT_PHASE?.includes('build') === true
  )

  if (isBuild) {
    return new Response(JSON.stringify({ error: 'Not available during build' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // Dynamic import only when route is called
    const { handlers } = await import('@/auth')
    return handlers.POST(request)
  } catch (error: any) {
    console.error('Error loading auth handlers:', error)
    return new Response(JSON.stringify({ error: 'Authentication service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
