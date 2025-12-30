import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public API to fetch published posts for blog pages
export async function GET() {
  try {
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
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

