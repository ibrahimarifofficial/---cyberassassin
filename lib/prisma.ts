import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    return { connected: true, error: null }
  } catch (error: any) {
    return { 
      connected: false, 
      error: error.message || 'Database connection failed',
      code: error.code || 'UNKNOWN'
    }
  }
}

