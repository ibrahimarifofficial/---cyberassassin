import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Get DATABASE_URL and validate it
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('⚠️ DATABASE_URL environment variable is not set!')
}

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

// Helper function to check database connection
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

    // Try to connect
    await prisma.$connect()
    
    // Try a simple query to verify connection works
    await prisma.$queryRaw`SELECT 1`
    
    return { connected: true, error: null, code: null }
  } catch (error: any) {
    return {
      connected: false,
      error: error.message || 'Database connection failed',
      code: error.code || 'UNKNOWN',
    }
  }
}

