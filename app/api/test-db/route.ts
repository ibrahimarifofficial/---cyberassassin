import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Test database connection endpoint
export async function GET() {
  try {
    // Test 1: Check if DATABASE_URL is set
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_URL environment variable is not set',
        test: 'env_check',
      }, { status: 500 })
    }

    // Test 2: Check DATABASE_URL format
    const urlInfo = {
      hasProtocol: dbUrl.startsWith('postgresql://'),
      hasPassword: dbUrl.includes('Cyber'),
      hasEncodedPassword: dbUrl.includes('%40'),
      host: dbUrl.match(/@([^:]+):/)?.[1] || 'not found',
      port: dbUrl.match(/:(\d+)\//)?.[1] || 'not found',
    }

    // Test 3: Try to connect
    let connectionTest = null
    try {
      await prisma.$connect()
      connectionTest = { connected: true }
      await prisma.$disconnect()
    } catch (connectError: any) {
      connectionTest = {
        connected: false,
        error: connectError.message,
        code: connectError.code,
      }
    }

    // Test 4: Try a simple query
    let queryTest = null
    try {
      const result = await prisma.$queryRaw`SELECT 1 as test`
      queryTest = { success: true, result }
    } catch (queryError: any) {
      queryTest = {
        success: false,
        error: queryError.message,
        code: queryError.code,
      }
    }

    return NextResponse.json({
      success: connectionTest?.connected && queryTest?.success,
      tests: {
        env_check: {
          DATABASE_URL_set: !!dbUrl,
          DATABASE_URL_length: dbUrl.length,
          DATABASE_URL_preview: dbUrl.substring(0, 50) + '...',
        },
        url_format: urlInfo,
        connection: connectionTest,
        query: queryTest,
      },
      recommendations: [
        !urlInfo.hasEncodedPassword ? '⚠️ Password might not be URL-encoded. @ should be %40' : '✅ Password encoding looks correct',
        !connectionTest?.connected ? '❌ Cannot connect to database. Check Supabase status and connection string.' : '✅ Database connection successful',
        !queryTest?.success ? '❌ Database query failed. Check database permissions.' : '✅ Database query successful',
      ],
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

