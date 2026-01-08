'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to new secure login URL
    router.replace('/admin/thecyberassassindashboardlogin2026-xyxyxz-01111')
  }, [router])

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      <p>Redirecting...</p>
    </div>
  )
}
