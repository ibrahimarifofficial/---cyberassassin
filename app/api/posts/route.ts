import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all posts
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

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, posts }))
  } catch (error: any) {
    console.error('Error fetching posts:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to fetch posts')
    return addSecurityHeaders(NextResponse.json(
      { error: message },
      { status }
    ))
  }
}

// CREATE new post
export async function POST(request: NextRequest) {
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
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published,
      featured,
      category,
      tags,
      metaTitle,
      metaDescription,
      keywords,
      focusKeyword,
      indexable,
      follow,
    } = body

    // Validate required fields
    if (!title || !title.trim()) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Title is required' 
        },
        { status: 400 }
      ))
    }

    // Sanitize inputs
    const { sanitizeInput } = await import('@/lib/security')
    const sanitizedTitle = sanitizeInput(title)
    const postSlug = slug ? sanitizeInput(slug) : sanitizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const post = await prisma.post.create({
      data: {
        title: sanitizedTitle,
        slug: postSlug,
        excerpt: excerpt ? sanitizeInput(excerpt) : null,
        content: content || '',
        featuredImage: featuredImage || null,
        authorId: authResult.session!.user.id,
        published: published || false,
        featured: featured || false,
        category,
        tags: tags || [],
        metaTitle,
        metaDescription,
        keywords,
        focusKeyword,
        indexable: indexable !== undefined ? indexable : true,
        follow: follow !== undefined ? follow : true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, post }))
  } catch (error: any) {
    console.error('Error creating post:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create post')
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message 
      },
      { status }
    ))
  }
}

