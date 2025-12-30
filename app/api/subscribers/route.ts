import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// GET all subscribers (for admin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let subscribers = []
    try {
      subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
      })
    } catch (error: any) {
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findMany')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return NextResponse.json(
          { error: 'Database model not initialized. Please run: npx prisma generate' },
          { status: 500 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true, subscribers })
  } catch (error: any) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// CREATE new subscriber (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
      // If subscriber model doesn't exist, it means Prisma client needs regeneration
      if (error.message?.includes('subscriber') || error.message?.includes('findUnique')) {
        console.error('Prisma Subscriber model not found. Please run: npx prisma generate')
        return NextResponse.json(
          { error: 'Database model not initialized. Please contact administrator.' },
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
    return NextResponse.json(
      { error: error.message || 'Failed to create subscriber' },
      { status: 500 }
    )
  }
}

