'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import './PageLoader.css'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    // Complete loading after a short delay
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="page-loader">
      <div className="page-loader__overlay">
        {/* Shield Loader */}
        <div className="page-loader__shield-wrapper">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <path d="M40 8 L16 16 L16 28 C16 40 24 50 40 58 C56 50 64 40 64 28 L64 16 Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

