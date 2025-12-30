import { signIn } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      // Check if result has error
      if (result && typeof result === 'object' && 'error' in result) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // If we get here, login was successful
      // Create a response with Set-Cookie header for session
      const response = NextResponse.json({ success: true })
      
      return response
    } catch (signInError: any) {
      // If signIn throws an error, it's likely authentication failed
      console.error('SignIn error:', signInError)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
  } catch (error: any) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}

