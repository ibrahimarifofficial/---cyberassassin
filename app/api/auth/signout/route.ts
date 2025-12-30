import { signOut } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    await signOut({ redirect: false })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Sign out failed' },
      { status: 500 }
    )
  }
}

