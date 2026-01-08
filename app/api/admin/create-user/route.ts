import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Allow GET method for easy browser access
export async function GET(request: NextRequest) {
  try {
    // Debug: Log environment variables (without sensitive data)
    console.log('Environment check:', {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 50) + '...',
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      adminEmail: process.env.ADMIN_EMAIL || 'admin@cyber.com',
    })

    // Get credentials from environment variables
    const email = process.env.ADMIN_EMAIL || 'admin@cyber.com'
    const password = process.env.ADMIN_PASSWORD || 'admin'

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

    return NextResponse.json({
      success: true,
      message: 'Admin user created/updated successfully!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      loginCredentials: {
        email: email,
        password: password,
      },
      note: 'You can now login with these credentials at /admin/thecyberassassindashboardlogin2026-xyxyxz-01111',
    })
  } catch (error: any) {
    console.error('Error creating admin user:', error)
    
    // Provide helpful error message
    let errorMessage = error.message || 'Failed to create admin user'
    let suggestions: string[] = []
    
    if (errorMessage.includes("Can't reach database server") || error.code === 'P1001') {
      suggestions = [
        '1. Verify DATABASE_URL in Vercel environment variables is correct',
        '2. Check Supabase Dashboard → Project Settings → Database for connection string',
        '3. Make sure password in DATABASE_URL is URL-encoded (@ = %40)',
        '4. The connection string should be: postgresql://postgres:Cyber%40Database%40123@db.gibinsemhuoyntxagloj.supabase.co:5432/postgres',
        '5. After updating DATABASE_URL, redeploy your Vercel project'
      ]
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        ...(suggestions.length > 0 && { suggestions }),
        ...(process.env.NODE_ENV === 'development' && { details: error.stack }),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get credentials from request body or environment variables
    const body = await request.json().catch(() => ({}))
    const email = body.email || process.env.ADMIN_EMAIL || 'admin@cyber.com'
    const password = body.password || process.env.ADMIN_PASSWORD || 'admin'

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

    return NextResponse.json({
      success: true,
      message: 'Admin user created/updated successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      credentials: {
        email: email,
        password: password,
      },
    })
  } catch (error: any) {
    console.error('Error creating admin user:', error)
    
    let errorMessage = error.message || 'Failed to create admin user'
    let suggestions: string[] = []
    
    if (errorMessage.includes("Can't reach database server") || error.code === 'P1001') {
      suggestions = [
        '1. Verify DATABASE_URL in Vercel environment variables',
        '2. Connection string: postgresql://postgres:Cyber%40Database%40123@db.gibinsemhuoyntxagloj.supabase.co:5432/postgres',
        '3. Make sure password is URL-encoded (@ = %40)',
        '4. After updating, redeploy your Vercel project'
      ]
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        ...(suggestions.length > 0 && { suggestions }),
      },
      { status: 500 }
    )
  }
}

