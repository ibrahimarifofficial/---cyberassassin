import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// DELETE subscriber (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.subscriber.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}

// UPDATE subscriber (toggle active status - admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { active } = body

    if (typeof active !== 'boolean') {
      return NextResponse.json(
        { error: 'Active status is required and must be a boolean' },
        { status: 400 }
      )
    }

    const subscriber = await prisma.subscriber.update({
      where: { id: params.id },
      data: {
        active,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, subscriber })
  } catch (error: any) {
    console.error('Error updating subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update subscriber' },
      { status: 500 }
    )
  }
}



