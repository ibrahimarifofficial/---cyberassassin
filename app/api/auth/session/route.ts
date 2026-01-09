import { auth } from '@/auth'
import { NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()
    
    // Return session or null (NextAuth expects null, not 401)
    // This allows the client to handle unauthenticated state gracefully
    return NextResponse.json(session || null)
  } catch (error: any) {
    // Return null on error instead of 500, so client can handle it
    console.error('Session error:', error)
    return NextResponse.json(null)
  }
}

