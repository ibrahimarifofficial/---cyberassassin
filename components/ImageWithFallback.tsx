'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  priority?: boolean
  fill?: boolean
  sizes?: string
  style?: React.CSSProperties
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  loading = 'lazy',
  width,
  height,
  priority = false,
  fill = false,
  sizes,
  style
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Try without leading slash
      const fallback = src.startsWith('/') ? src.substring(1) : `/${src}`
      setImgSrc(fallback)
    } else {
      // If still fails, use regular img tag as fallback
      setUseFallback(true)
    }
  }

  // Fallback to regular img if Next.js Image fails
  if (useFallback || (!width && !height && !fill)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onError={handleError}
        style={style}
        decoding="async"
      />
    )
  }

  // Use Next.js Image for optimization
  if (fill) {
    return (
      <div className={className} style={{ position: 'relative', ...style }}>
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          onError={handleError}
          style={{ objectFit: 'cover' }}
        />
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      loading={priority ? 'eager' : loading}
      priority={priority}
      onError={handleError}
      style={style}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      quality={priority ? 90 : 75}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  )
}


