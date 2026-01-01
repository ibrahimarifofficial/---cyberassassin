import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get DATABASE_URL and validate it
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('⚠️ DATABASE_URL environment variable is not set!')
}

// Enhanced Prisma Client configuration for better connection handling
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function to check database connection with retry logic
export async function checkDatabaseConnection() {
  try {
    // First check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return {
        connected: false,
        error: 'DATABASE_URL environment variable is not set',
        code: 'MISSING_ENV',
      }
    }

    // Try to connect with timeout
    const connectPromise = prisma.$connect()
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 10000)
    )
    
    await Promise.race([connectPromise, timeoutPromise])
    
    // Try a simple query to verify connection works
    await prisma.$queryRaw`SELECT 1`
    
    return { connected: true, error: null, code: null }
  } catch (error: any) {
    // Don't disconnect on error - let Prisma handle connection pooling
    return {
      connected: false,
      error: error.message || 'Database connection failed',
      code: error.code || 'UNKNOWN',
    }
  }
}

