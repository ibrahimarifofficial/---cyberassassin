'use client'

import { useState, useEffect, useRef } from 'react'

const milestones = [
  {
    year: '2013',
    title: 'Company Founded',
    description: 'CyberAssassin was established with a vision to revolutionize cybersecurity through AI-driven solutions.',
    icon: '🚀',
  },
  {
    year: '2016',
    title: 'First Major Breakthrough',
    description: 'Launched our proprietary AI threat detection system, protecting over 1000+ enterprises.',
    icon: '💡',
  },
  {
    year: '2019',
    title: 'Global Expansion',
    description: 'Expanded operations to 15+ countries, establishing ourselves as a global cybersecurity leader.',
    icon: '🌍',
  },
  {
    year: '2022',
    title: 'AI Innovation Lab',
    description: 'Opened state-of-the-art AI research facility, advancing next-generation security technologies.',
    icon: '🔬',
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description: 'Awarded "Best Cybersecurity Firm" and reached 4000+ satisfied clients worldwide.',
    icon: '🏆',
  },
]

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="timeline-section" id="timeline" style={{ 
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl)' }}>
          <span className="shimmer-text" style={{ 
            display: 'inline-block',
            fontSize: 'var(--font-size-sm)',
            fontWeight: '600',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: 'var(--spacing-md)'
          }}>
            Our Journey
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-weight-heading-light)',
            color: 'var(--color-text-primary)',
            margin: '0'
          }}>
            Milestones That <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Shaped Us</span>
          </h2>
        </div>

        <div ref={sectionRef} style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'var(--spacing-2xl) 0'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(180deg, #f9004d 0%, rgba(249, 0, 77, 0.3) 50%, #f9004d 100%)',
            transform: 'translateX(-50%)',
            zIndex: 0
          }}></div>

          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="timeline-item"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginBottom: 'var(--spacing-4xl)',
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.6s ease',
                zIndex: 1
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div style={{
                flex: index % 2 === 0 ? '0 0 45%' : '0 0 45%',
                textAlign: index % 2 === 0 ? 'right' : 'left',
                padding: index % 2 === 0 ? '0 var(--spacing-xl) 0 0' : '0 0 0 var(--spacing-xl)',
                order: index % 2 === 0 ? 1 : 2
              }}>
                <div style={{
                  background: 'rgba(249, 0, 77, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(249, 0, 77, 0.3)',
                  borderRadius: '20px',
                  padding: 'var(--spacing-xl)',
                  transition: 'all 0.3s ease',
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: activeIndex === index ? '0 8px 32px rgba(249, 0, 77, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {milestone.year}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {milestone.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7',
                    margin: '0'
                  }}>
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Center Icon */}
              <div style={{
                flex: '0 0 10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                order: 2,
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f9004d 0%, #ff1a5e 50%, #ff6b9d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  boxShadow: '0 8px 24px rgba(249, 0, 77, 0.4)',
                  border: '4px solid var(--color-bg-primary)',
                  transition: 'all 0.3s ease',
                  transform: activeIndex === index ? 'scale(1.2) rotate(360deg)' : 'scale(1)'
                }}>
                  {milestone.icon}
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div style={{
                flex: index % 2 === 0 ? '0 0 45%' : '0 0 45%',
                order: index % 2 === 0 ? 2 : 1
              }}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-item.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }
        .timeline-item:nth-child(5) { transition-delay: 0.5s; }
        
        @media (max-width: 768px) {
          .timeline-item {
            flex-direction: column !important;
          }
          .timeline-item > div {
            flex: 0 0 100% !important;
            text-align: center !important;
            padding: 0 !important;
            order: 1 !important;
          }
          .timeline-item > div:last-child {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  )
}


