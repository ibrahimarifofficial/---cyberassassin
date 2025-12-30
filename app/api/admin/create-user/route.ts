import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Allow GET method for easy browser access
export async function GET(request: NextRequest) {
  try {
    // Get credentials from environment variables
    const email = process.env.ADMIN_EMAIL || 'admin@cyber.com'
    const password = process.env.ADMIN_PASSWORD || 'admin'

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create or update admin user
    const user = await prisma.user.upsert({
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
      note: 'You can now login with these credentials at /admin/login',
    })
  } catch (error: any) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create admin user',
        details: error.stack,
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

    // Create or update admin user
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
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create admin user',
      },
      { status: 500 }
    )
  }
}

