'use client'

import { useEffect, useRef } from 'react'

export function useCounterAnimation(
  ref: React.RefObject<HTMLDivElement>,
  stats: Array<{ count: number; suffix: string }>
) {
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animateCounters()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(ref.current)

    const animateCounters = () => {
      const counterElements = ref.current?.querySelectorAll('.why-choose-us__stat-number')
      if (!counterElements) return

      counterElements.forEach((counterElement, index) => {
        const target = stats[index]?.count || 0
        const suffix = stats[index]?.suffix || ''
        const duration = 2000
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          const currentValue = Math.floor(target * easeProgress)
          counterElement.textContent = currentValue + suffix

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            counterElement.textContent = target + suffix
          }
        }

        requestAnimationFrame(animate)
      })
    }

    return () => observer.disconnect()
  }, [ref, stats])
}


