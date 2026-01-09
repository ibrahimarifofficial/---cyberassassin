import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse, sanitizeInput } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all categories (public for blog, but secured)
export async function GET() {
  try {
    // Check database connection first
    const { checkDatabaseConnection } = await import('@/lib/prisma')
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          categories: [],
          error: 'Database connection unavailable',
          message: 'Unable to fetch categories. Please check your database configuration.'
        },
        { status: 503 }
      ))
    }

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, categories }))
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to fetch categories')
    
    // Handle database connection errors
    if (error.message?.includes("Can't reach database server") || error.code === 'P1001') {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          categories: [],
          error: 'Database server is unreachable',
          message: 'Please check your Supabase database status.'
        },
        { status: 503 }
      ))
    }
    
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        categories: [],
        error: message 
      },
      { status }
    ))
  }
}

// CREATE new category (admin only)
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

    // Require admin authentication
    const authResult = await requireAdmin(request)
    if (!authResult.authorized) {
      return addSecurityHeaders(authResult.response!)
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

    const { name, description } = body

    if (!name || !name.trim()) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Category name is required' 
        },
        { status: 400 }
      ))
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedDescription = description ? sanitizeInput(description) : null

    // Generate slug from name
    const slug = sanitizedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const category = await prisma.category.create({
      data: {
        name: sanitizedName,
        slug,
        description: sanitizedDescription,
      },
    })

    return addSecurityHeaders(NextResponse.json({ success: true, category }))
  } catch (error: any) {
    console.error('Error creating category:', error)
    const { message, status } = safeErrorResponse(error, 'Failed to create category')
    
    if (error.code === 'P2002') {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'Category with this name already exists' 
        },
        { status: 400 }
      ))
    }
    
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message 
      },
      { status }
    ))
  }
}

