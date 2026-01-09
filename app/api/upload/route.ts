import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { prisma } from '@/lib/prisma'
import { requireAdmin, rateLimit, addSecurityHeaders, safeErrorResponse, validateFileUpload } from '@/lib/security'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for upload endpoint
    const rateLimitResult = rateLimit(request, 'upload')
    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        { 
          success: false,
          error: rateLimitResult.message || 'Too many upload requests. Please try again later.',
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

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: 'No file provided' 
        },
        { status: 400 }
      ))
    }

    // Validate file
    const validation = validateFileUpload(file)
    if (!validation.valid) {
      return addSecurityHeaders(NextResponse.json(
        { 
          success: false,
          error: validation.error || 'Invalid file' 
        },
        { status: 400 }
      ))
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file, 'media')

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: uploadResult.url,
        cloudinaryId: uploadResult.public_id,
        size: uploadResult.bytes,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        uploadedBy: authResult.session!.user.id,
      },
    })

    return addSecurityHeaders(NextResponse.json({
      success: true,
      media: {
        id: media.id,
        url: media.url,
        filename: media.filename,
        width: media.width,
        height: media.height,
      },
    }))
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Upload failed'
    if (error.message) {
      if (error.message.includes('Cloudinary configuration')) {
        errorMessage = 'Image upload service is not configured. Please contact administrator.'
      } else if (error.message.includes('Invalid')) {
        errorMessage = error.message
      } else {
        errorMessage = error.message
      }
    }
    
    const { message, status } = safeErrorResponse(error, errorMessage)
    return addSecurityHeaders(NextResponse.json(
      { 
        success: false,
        error: message 
      },
      { status }
    ))
  }
}

