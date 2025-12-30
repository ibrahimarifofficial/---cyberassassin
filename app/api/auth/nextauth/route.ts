import { handlers } from '@/auth'

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export const { GET, POST } = handlers

