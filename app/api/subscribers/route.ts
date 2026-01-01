import { NextRequest, NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection } from '@/lib/prisma'
import { auth } from '@/auth'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all subscribers (for admin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check database connection
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return NextResponse.json(
        { 
          success: false,
          subscribers: [],
          error: 'Database connection unavailable',
          message: 'Unable to fetch subscribers. Please check your database configuration.'
        },
        { status: 503 }
      )
    }

    let subscribers = []
    try {
      subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
      })
    } catch (error: any) {
      // Handle database connection errors
      if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
        return NextResponse.json(
          { 
            success: false,
            subscribers: [],
            error: 'Database server is unreachable',
            message: 'Please check your Supabase database status.'
          },
          { status: 503 }
        )
      }
      
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findMany')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return NextResponse.json(
          { 
            success: false,
            subscribers: [],
            error: 'Database model not initialized',
            message: 'Please run: npx prisma generate'
          },
          { status: 500 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true, subscribers })
  } catch (error: any) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { 
        success: false,
        subscribers: [],
        error: error.message || 'Failed to fetch subscribers'
      },
      { status: 500 }
    )
  }
}

// CREATE new subscriber (public)
export async function POST(request: NextRequest) {
  try {
    // Check database connection first
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection unavailable',
          message: 'Unable to subscribe at the moment. Please try again later.'
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email || !email.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email is required' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // Check if email already exists
    let existingSubscriber = null
    try {
      existingSubscriber = await prisma.subscriber.findUnique({
        where: { email: email.trim().toLowerCase() },
      })
    } catch (error: any) {
      // Handle database connection errors
      if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
        return NextResponse.json(
          { 
            success: false,
            error: 'Database server is unreachable',
            message: 'Unable to subscribe. The database may be paused or unavailable. Please try again later.'
          },
          { status: 503 }
        )
      }
      
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findUnique')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return NextResponse.json(
          { 
            success: false,
            error: 'Database model not initialized',
            message: 'Please contact administrator.'
          },
          { status: 500 }
        )
      }
      throw error
    }

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        // Already subscribed - return success with info message
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          subscriber: existingSubscriber,
          alreadySubscribed: true,
        })
      } else {
        // Reactivate if previously unsubscribed
        const subscriber = await prisma.subscriber.update({
          where: { email: email.trim().toLowerCase() },
          data: { active: true, updatedAt: new Date() },
        })
        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed!',
          subscriber,
        })
      }
    }

    // Create new subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email: email.trim().toLowerCase(),
        active: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      subscriber,
    })
  } catch (error: any) {
    console.error('Error creating subscriber:', error)
    
    // Handle database connection errors
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database server is unreachable',
          message: 'Unable to subscribe. The database may be paused or unavailable. Please try again later.'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create subscriber',
        message: 'An error occurred while subscribing. Please try again.'
      },
      { status: 500 }
    )
  }
}

