import { NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Public API to fetch published posts for blog pages
export async function GET() {
  try {
    // Check database connection first
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      console.error('Database connection failed:', dbCheck.error)
      return NextResponse.json(
        { 
          success: false,
          posts: [],
          error: 'Database connection unavailable. Please check your database configuration.',
          message: 'Unable to fetch blog posts at the moment. Please try again later.'
        },
        { status: 503 }
      )
    }

    const posts = await prisma.post.findMany({
      where: {
        published: true,
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
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, posts })
  } catch (error: any) {
    console.error('Error fetching public posts:', error)
    
    // Handle specific database errors
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return NextResponse.json(
        { 
          success: false,
          posts: [],
          error: 'Database server is unreachable. Please check your Supabase database status.',
          message: 'Unable to fetch blog posts. The database may be paused or unavailable.'
        },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        posts: [],
        error: error.message || 'Failed to fetch posts',
        message: 'An error occurred while fetching blog posts.'
      },
      { status: 500 }
    )
  }
}

