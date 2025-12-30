'use client'

import { SessionProvider } from 'next-auth/react'
import PageLoader from '@/components/PageLoader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageLoader />
      {children}
    </SessionProvider>
  )
}

