import { NextRequest, NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all contact queries (for admin)
export async function GET(request: NextRequest) {
  try {
    // Check database connection
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return NextResponse.json(
        { 
          success: false,
          contacts: [],
          error: 'Database connection unavailable',
          message: 'Unable to fetch contacts. Please check your database configuration.'
        },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const read = searchParams.get('read')

    const where: any = {}
    
    if (read !== null && read !== '') {
      where.read = read === 'true'
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, contacts })
  } catch (error: any) {
    console.error('Error fetching contacts:', error)
    
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return NextResponse.json(
        { 
          success: false,
          contacts: [],
          error: 'Database server is unreachable',
          message: 'Please check your Supabase database status.'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        contacts: [],
        error: error.message || 'Failed to fetch contacts'
      },
      { status: 500 }
    )
  }
}

// CREATE new contact query (public)
export async function POST(request: NextRequest) {
  try {
    // Check database connection first
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection unavailable',
          message: 'Unable to send your message at the moment. Please try again later or contact us directly.'
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Name, email, subject, and message are required' 
        },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        read: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      contact,
    })
  } catch (error: any) {
    console.error('Error creating contact:', error)
    
    // Handle database connection errors
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Database server is unreachable',
          message: 'Unable to send your message. The database may be paused or unavailable. Please try again later or contact us directly.'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create contact',
        message: 'An error occurred while sending your message. Please try again.'
      },
      { status: 500 }
    )
  }
}

