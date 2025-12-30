'use client'

import { useRef } from 'react'
import { useCounterAnimation } from '@/hooks/useCounterAnimation'

const stats = [
  { count: 4050, label: 'Satisfied Clients', suffix: '+' },
  { count: 150, label: 'Projects Completed', suffix: '+' },
  { count: 90, label: 'Business Growth', suffix: '%' },
  { count: 24, label: 'Security Monitoring', suffix: '/7' },
]

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  useCounterAnimation(statsRef, stats)

  return (
    <section className="why-choose-us" id="about-stats" style={{ padding: 'var(--spacing-5xl) 0', position: 'relative' }}>
      <div className="container">
        <div className="why-choose-us__container">
          <div className="why-choose-us__header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl)' }}>
            <div className="why-choose-us__eyebrow">
              <span className="shimmer-text">Our Impact</span>
            </div>
          </div>
          <h2 className="why-choose-us__title" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            Driving <span className="why-choose-gradient">Success</span> and <span className="why-choose-gradient">Security</span> for Our Clients
          </h2>

          <div className="why-choose-us__stats" ref={statsRef} style={{ 
            marginTop: 'var(--spacing-4xl)'
          }}>
            {stats.map((stat, index) => (
              <div key={index} className="why-choose-us__stat">
                <div className="why-choose-us__stat-number" data-count={stat.count}>0{stat.suffix}</div>
                <div className="why-choose-us__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

