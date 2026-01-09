import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all comments (for admin)
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

    const { searchParams } = new URL(request.url)
    const approved = searchParams.get('approved')
    const postId = searchParams.get('postId')

    // Validate and sanitize query parameters
    const where: any = {}
    
    if (approved !== null && approved !== '') {
      where.approved = approved === 'true'
    }
    
    if (postId && typeof postId === 'string' && postId.length < 100) {
      where.postId = postId
    }

    const comments = await prisma.comment.findMany({
      where,
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, comments }))
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to fetch comments')
    return addSecurityHeaders(NextResponse.json(
      { error: message },
      { status }
    ))
  }
}

// CREATE new comment (public)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    const rateLimitResult = rateLimit(request, 'public')
    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        { 
          success: false,
          error: rateLimitResult.message || 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429 }
      )
      if (rateLimitResult.retryAfter) {
        response.headers.set('Retry-After', rateLimitResult.retryAfter.toString())
      }
      return addSecurityHeaders(response)
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Invalid request body' 
        },
        { status: 400 }
      ))
    }

    // Validate and sanitize input
    const { validateComment } = await import('@/lib/security')
    const validation = validateComment(body)
    if (!validation.valid) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        },
        { status: 400 }
      ))
    }

    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: validation.sanitized!.postId },
    })

    if (!post) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Post not found' 
        },
        { status: 404 }
      ))
    }

    const comment = await prisma.comment.create({
      data: {
        postId: validation.sanitized!.postId,
        name: validation.sanitized!.name,
        email: validation.sanitized!.email,
        content: validation.sanitized!.content,
        approved: false, // Comments need approval
      },
    })

    return addSecurityHeaders(NextResponse.json({
      success: true,
      message: 'Comment submitted successfully. It will be visible after approval.',
    }))
  } catch (error: any) {
    console.error('Error creating comment:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create comment')
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message 
      },
      { status }
    ))
  }
}

