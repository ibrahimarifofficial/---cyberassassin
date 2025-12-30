'use client'

import { useState } from 'react'
import ImageWithFallback from '../ImageWithFallback'

const stories = [
  {
    company: 'TechCorp Global',
    industry: 'Financial Services',
    challenge: 'Facing sophisticated APT attacks targeting customer data',
    solution: 'Implemented AI-driven threat detection and 24/7 monitoring',
    result: '99.9% threat detection rate, zero data breaches in 2 years',
    logo: 'https://i.pravatar.cc/80?img=1',
    metric: '99.9%',
    metricLabel: 'Threat Detection',
  },
  {
    company: 'HealthSecure Inc',
    industry: 'Healthcare',
    challenge: 'HIPAA compliance and patient data protection',
    solution: 'Custom security framework with automated compliance monitoring',
    result: '100% compliance rate, reduced security incidents by 85%',
    logo: 'https://i.pravatar.cc/80?img=2',
    metric: '85%',
    metricLabel: 'Reduction',
  },
  {
    company: 'E-Commerce Pro',
    industry: 'Retail',
    challenge: 'DDoS attacks disrupting online operations',
    solution: 'Multi-layered defense with real-time traffic analysis',
    result: 'Zero downtime, 99.99% uptime maintained during peak attacks',
    logo: 'https://i.pravatar.cc/80?img=3',
    metric: '99.99%',
    metricLabel: 'Uptime',
  },
]

export default function SuccessStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="success-stories-section" id="success-stories" style={{
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(100, 100, 100, 0.02) 100%)',
      overflow: 'hidden'
    }}>
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
            Client Success
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-weight-heading-light)',
            color: 'var(--color-text-primary)',
            margin: '0'
          }}>
            Real Results, <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Real Impact</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--spacing-xl)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {stories.map((story, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(249, 0, 77, 0.2)',
                borderRadius: '24px',
                padding: 'var(--spacing-2xl)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: activeIndex === index 
                  ? 'linear-gradient(135deg, rgba(249, 0, 77, 0.15) 0%, transparent 100%)'
                  : 'transparent',
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
                borderRadius: '24px'
              }}></div>

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--spacing-lg)',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-primary)',
                    background: 'rgba(249, 0, 77, 0.1)'
                  }}>
                    <ImageWithFallback
                      src={story.logo}
                      alt={story.company}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-heading-medium)',
                      color: 'var(--color-text-primary)',
                      margin: '0 0 var(--spacing-xs) 0'
                    }}>
                      {story.company}
                    </h3>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-primary)',
                      fontWeight: '500'
                    }}>
                      {story.industry}
                    </div>
                  </div>
                </div>

                {/* Metric Badge */}
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-md)',
                  background: 'rgba(249, 0, 77, 0.2)',
                  border: '1px solid rgba(249, 0, 77, 0.4)',
                  borderRadius: '16px',
                  minWidth: '100px',
                  transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    lineHeight: '1'
                  }}>
                    {story.metric}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--spacing-xs)'
                  }}>
                    {story.metricLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-primary)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    Challenge
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    margin: '0'
                  }}>
                    {story.challenge}
                  </p>
                </div>

                <div style={{
                  marginBottom: 'var(--spacing-md)'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-primary)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    Solution
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6',
                    margin: '0'
                  }}>
                    {story.solution}
                  </p>
                </div>

                <div style={{
                  padding: 'var(--spacing-md)',
                  background: 'rgba(249, 0, 77, 0.1)',
                  border: '1px solid rgba(249, 0, 77, 0.3)',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-primary)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    Result
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.6',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {story.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


