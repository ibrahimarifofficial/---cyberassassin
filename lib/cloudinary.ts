import { v2 as cloudinary } from 'cloudinary'
import { Cloudinary } from '@cloudinary/url-gen'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Create Cloudinary instance for client-side
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})

// Server-side upload function
export async function uploadToCloudinary(file: File | Buffer, folder: string = 'blog'): Promise<{
  url: string
  public_id: string
  width?: number
  height?: number
  format?: string
  bytes?: number
}> {
  // Check if Cloudinary is configured
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is missing. Please check your environment variables.')
  }

  return new Promise(async (resolve, reject) => {
    try {
      let buffer: Buffer

      if (file instanceof File) {
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer()
        buffer = Buffer.from(arrayBuffer)
      } else {
        buffer = file
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `cyberassassin/${folder}`,
          resource_type: 'auto',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(new Error(error.message || 'Failed to upload image to Cloudinary'))
          } else if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            })
          } else {
            reject(new Error('Upload failed: No result from Cloudinary'))
          }
        }
      )

      uploadStream.end(buffer)
    } catch (error: any) {
      console.error('Error preparing file for upload:', error)
      reject(new Error(error.message || 'Failed to process file for upload'))
    }
  })
}

// Delete from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}

export default cloudinary

