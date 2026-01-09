import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { rateLimit, addSecurityHeaders, safeErrorResponse, isValidEmail } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Allow GET method for easy browser access (should be restricted in production)
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
    // Debug: Log environment variables (without sensitive data)
    console.log('Environment check:', {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 50) + '...',
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      adminEmail: process.env.ADMIN_EMAIL || 'admin@cyberassassin.com',
    })

    // Get credentials from environment variables
    const email = process.env.ADMIN_EMAIL || 'admin@cyberassassin.com'
    const password = process.env.ADMIN_PASSWORD || 'Cyberassassin@AdminPanel@123456'

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create or update admin user (Prisma will handle connection automatically)
    // Add timeout wrapper
    const userPromise = prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin',
        name: 'Admin',
      },
      create: {
        email,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    })

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database operation timeout after 15 seconds')), 15000)
    )

    const user = await Promise.race([userPromise, timeoutPromise]) as any

    return addSecurityHeaders(NextResponse.json({
      success: true,
      message: 'Admin user created/updated successfully!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      note: 'You can now login with these credentials at /admin/thecyberassassindashboardlogin2026-xyxyxz-01111',
    }))
  } catch (error: any) {
    console.error('Error creating admin user:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create admin user')
    
    return addSecurityHeaders(NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    ))
  }
}

export async function POST(request: NextRequest) {
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

    // Get credentials from request body or environment variables
    const email = body.email || process.env.ADMIN_EMAIL || 'admin@cyberassassin.com'
    const password = body.password || process.env.ADMIN_PASSWORD || 'Cyberassassin@AdminPanel@123456'

    // Validate email
    if (!isValidEmail(email)) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      ))
    }

    // Validate password strength
    if (!password || password.length < 8) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Password must be at least 8 characters long' 
        },
        { status: 400 }
      ))
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create or update admin user (Prisma handles connection automatically)
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin',
        name: body.name || 'Admin',
      },
      create: {
        email,
        password: hashedPassword,
        name: body.name || 'Admin',
        role: 'admin',
      },
    })

    return addSecurityHeaders(NextResponse.json({
      success: true,
      message: 'Admin user created/updated successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    }))
  } catch (error: any) {
    console.error('Error creating admin user:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create admin user')
    
    return addSecurityHeaders(NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    ))
  }
}

