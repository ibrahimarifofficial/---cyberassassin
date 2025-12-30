'use client'

import { useState } from 'react'

const technologies = [
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'Neural Networks', 'Deep Learning'],
    icon: '🤖',
    color: '#f9004d',
  },
  {
    category: 'Security Tools',
    items: ['SIEM Systems', 'Firewall Management', 'Intrusion Detection', 'Vulnerability Scanners'],
    icon: '🛡️',
    color: '#00d9ff',
  },
  {
    category: 'Cloud Platforms',
    items: ['AWS Security', 'Azure Defender', 'Google Cloud', 'Multi-Cloud'],
    icon: '☁️',
    color: '#8B5CF6',
  },
  {
    category: 'Threat Intelligence',
    items: ['Real-time Monitoring', 'Behavioral Analysis', 'Threat Hunting', 'Forensics'],
    icon: '🔍',
    color: '#ff6b9d',
  },
]

export default function TechnologySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="technology-section" id="technology" style={{
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(249, 0, 77, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            Our Arsenal
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-weight-heading-light)',
            color: 'var(--color-text-primary)',
            margin: '0'
          }}>
            Cutting-Edge <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Technology Stack</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '700px',
            margin: 'var(--spacing-lg) auto 0',
            lineHeight: '1.7'
          }}>
            We leverage the most advanced technologies and tools to deliver unparalleled cybersecurity solutions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-xl)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {technologies.map((tech, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${tech.color}40`,
                borderRadius: '24px',
                padding: 'var(--spacing-2xl)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated Border Gradient */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: `linear-gradient(135deg, ${tech.color}20 0%, transparent 100%)`,
                opacity: hoveredIndex === index ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
                borderRadius: '24px'
              }}></div>

              <div style={{
                fontSize: '56px',
                marginBottom: 'var(--spacing-md)',
                display: 'inline-block',
                transform: hoveredIndex === index ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}>
                {tech.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-lg)',
                position: 'relative',
                zIndex: 1
              }}>
                {tech.category}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                position: 'relative',
                zIndex: 1
              }}>
                {tech.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${tech.color}30`,
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${tech.color}20 0%, transparent 70%)`,
                filter: 'blur(40px)',
                opacity: hoveredIndex === index ? 0.6 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  )
}


