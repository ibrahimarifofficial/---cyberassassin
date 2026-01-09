import { NextRequest, NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all subscribers (for admin)
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

    // Check database connection
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          subscribers: [],
          error: 'Database connection unavailable',
          message: 'Unable to fetch subscribers. Please check your database configuration.'
        },
        { status: 503 }
      ))
    }

    let subscribers = []
    try {
      subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
      })
    } catch (error: any) {
      // Handle database connection errors
      if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
        return addSecurityHeaders(NextResponse.json(
          { 
            success: false,
            subscribers: [],
            error: 'Database server is unreachable',
            message: 'Please check your Supabase database status.'
          },
          { status: 503 }
        ))
      }
      
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findMany')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return addSecurityHeaders(NextResponse.json(
          { 
            success: false,
            subscribers: [],
            error: 'Database model not initialized',
            message: 'Please run: npx prisma generate'
          },
          { status: 500 }
        ))
      }
      throw error
    }

    return addSecurityHeaders(NextResponse.json({ success: true, subscribers }))
  } catch (error: any) {
    console.error('Error fetching subscribers:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to fetch subscribers')
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        subscribers: [],
        error: message
      },
      { status }
    ))
  }
}

// CREATE new subscriber (public)
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

    // Check database connection first
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Database connection unavailable',
          message: 'Unable to subscribe at the moment. Please try again later.'
        },
        { status: 503 }
      ))
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

    const { email } = body

    if (!email || !email.trim()) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Email is required' 
        },
        { status: 400 }
      ))
    }

    // Validate email format using security utility
    const { isValidEmail } = await import('@/lib/security')
    if (!isValidEmail(email)) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      ))
    }

    // Sanitize email
    const sanitizedEmail = email.trim().toLowerCase()

    // Check if email already exists
    let existingSubscriber = null
    try {
      existingSubscriber = await prisma.subscriber.findUnique({
        where: { email: sanitizedEmail },
      })
    } catch (error: any) {
      // Handle database connection errors
      if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
        return addSecurityHeaders(NextResponse.json(
          { 
            success: false,
            error: 'Database server is unreachable',
            message: 'Unable to subscribe. The database may be paused or unavailable. Please try again later.'
          },
          { status: 503 }
        ))
      }
      
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findUnique')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return addSecurityHeaders(NextResponse.json(
          { 
            success: false,
            error: 'Database model not initialized',
            message: 'Please contact administrator.'
          },
          { status: 500 }
        ))
      }
      throw error
    }

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        // Already subscribed - return success with info message
        return addSecurityHeaders(NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true,
        }))
      } else {
        // Reactivate if previously unsubscribed
        const subscriber = await prisma.subscriber.update({
          where: { email: sanitizedEmail },
          data: { active: true, updatedAt: new Date() },
        })
        return addSecurityHeaders(NextResponse.json({
          success: true,
          message: 'Successfully resubscribed!',
        }))
      }
    }

    // Create new subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email: sanitizedEmail,
        active: true,
      },
    })

    return addSecurityHeaders(NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
    }))
  } catch (error: any) {
    console.error('Error creating subscriber:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create subscriber')
    
    // Handle database connection errors
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Database server is unreachable',
          message: 'Unable to subscribe. The database may be paused or unavailable. Please try again later.'
        },
        { status: 503 }
      ))
    }
    
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message,
        message: 'An error occurred while subscribing. Please try again.'
      },
      { status }
    ))
  }
}

