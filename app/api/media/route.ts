import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse } from '@/lib/security'

// Force dynamic rendering - this route uses authentication
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request, 'admin')
    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        { 
          success: false,
          error: rateLimitResult.message || 'Too many requests',
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429 }
      )
      if (rateLimitResult.retryAfter) {
        response.headers.set('Retry-After', rateLimitResult.retryAfter.toString())
      }
      return addSecurityHeaders(response)
    }

    // Require admin authentication
    const authResult = await requireAdmin(request)
    if (!authResult.authorized) {
      return addSecurityHeaders(authResult.response!)
    }

    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        filename: true,
        url: true,
        width: true,
        height: true,
        format: true,
        createdAt: true,
      },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, media }))
  } catch (error: any) {
    console.error('Error fetching media:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to fetch media')
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message 
      },
      { status }
    ))
  }
}

