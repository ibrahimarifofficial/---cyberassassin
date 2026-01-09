import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Rate limiting storage (in-memory, for production use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  // Public endpoints (contact, newsletter, comments)
  public: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10, // 10 requests per window
  },
  // Admin endpoints
  admin: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
  },
  // Auth endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 login attempts per window
  },
  // File upload
  upload: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 20, // 20 uploads per hour
  },
}

/**
 * Rate limiting middleware
 */
export function rateLimit(
  request: NextRequest,
  type: 'public' | 'admin' | 'auth' | 'upload' = 'public'
): { success: boolean; message?: string; retryAfter?: number } {
  const config = RATE_LIMIT_CONFIG[type]
  const ip = getClientIP(request)
  const key = `${ip}:${type}`
  const now = Date.now()

  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return { success: true }
  }

  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return {
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter,
    }
  }

  // Increment count
  record.count++
  rateLimitStore.set(key, record)
  return { success: true }
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare

  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

/**
 * Authentication middleware
 */
export async function requireAuth(request: NextRequest): Promise<{
  authorized: boolean
  session?: any
  response?: NextResponse
}> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        ),
      }
    }
    return { authorized: true, session }
  } catch (error) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Authentication failed', message: 'Unable to verify authentication' },
        { status: 401 }
      ),
    }
  }
}

/**
 * Admin role check
 */
export async function requireAdmin(request: NextRequest): Promise<{
  authorized: boolean
  session?: any
  response?: NextResponse
}> {
  const authResult = await requireAuth(request)
  if (!authResult.authorized) {
    return authResult
  }

  if (authResult.session?.user?.role !== 'admin') {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Forbidden', message: 'Admin access required' },
        { status: 403 }
      ),
    }
  }

  return authResult
}

/**
 * Input sanitization
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 10000) // Max length
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * URL validation
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Validate and sanitize contact form data
 */
export function validateContactForm(data: {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}): { valid: boolean; errors: string[]; sanitized?: any } {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required')
  }
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters')
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters')
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ]

  const allText = `${data.name} ${data.email} ${data.subject} ${data.message}`.toLowerCase()
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push('Invalid content detected')
      break
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name: sanitizeInput(data.name || ''),
      email: data.email?.trim().toLowerCase() || '',
      phone: data.phone ? sanitizeInput(data.phone) : null,
      subject: sanitizeInput(data.subject || ''),
      message: sanitizeInput(data.message || ''),
    },
  }
}

/**
 * Validate comment data
 */
export function validateComment(data: {
  postId?: string
  name?: string
  email?: string
  content?: string
}): { valid: boolean; errors: string[]; sanitized?: any } {
  const errors: string[] = []

  if (!data.postId || typeof data.postId !== 'string') {
    errors.push('Post ID is required')
  }
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required')
  }
  if (!data.content || data.content.trim().length < 5) {
    errors.push('Comment must be at least 5 characters')
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
  ]

  const allText = `${data.name} ${data.content}`.toLowerCase()
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push('Invalid content detected')
      break
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      postId: data.postId,
      name: sanitizeInput(data.name || ''),
      email: data.email?.trim().toLowerCase() || '',
      content: sanitizeInput(data.content || ''),
    },
  }
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  // Max file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ]

  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 10MB limit' }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only images are allowed.' }
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase()
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  if (!extension || !allowedExtensions.includes(extension)) {
    return { valid: false, error: 'Invalid file extension' }
  }

  return { valid: true }
}

/**
 * Generate CSRF token (simple implementation)
 */
export function generateCSRFToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, request: NextRequest): boolean {
  // For production, implement proper CSRF token validation
  // This is a simplified version
  if (!token) return false
  
  // Check Origin header
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  
  // Basic origin validation
  if (origin && host && !origin.includes(host)) {
    return false
  }
  
  return true
}

/**
 * Security headers helper
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
  }
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

/**
 * Safe error response (don't expose sensitive info)
 */
export function safeErrorResponse(
  error: any,
  defaultMessage: string = 'An error occurred'
): { message: string; status: number } {
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    return {
      message: defaultMessage,
      status: 500,
    }
  }

  // In development, show more details
  return {
    message: error?.message || defaultMessage,
    status: error?.status || 500,
  }
}

/**
 * Clean up rate limit store (run periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Clean up every 30 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 30 * 60 * 1000)
}

