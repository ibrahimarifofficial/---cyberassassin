'use client'

import { useState, useEffect } from 'react'

export function useContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleTriggerClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const trigger = target.closest('[id^="contactTrigger"]')
      
      if (trigger) {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('click', handleTriggerClick)
    return () => document.removeEventListener('click', handleTriggerClick)
  }, [])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}

