'use client'

import ImageWithFallback from '../ImageWithFallback'

const awards = [
  {
    title: 'Best Cybersecurity Firm 2024',
    issuer: 'Global Security Awards',
    year: '2024',
    icon: '🏆',
    description: 'Recognized for excellence in AI-driven security solutions',
  },
  {
    title: 'ISO 27001 Certified',
    issuer: 'International Standards',
    year: '2023',
    icon: '✅',
    description: 'Certified for information security management systems',
  },
  {
    title: 'Innovation in AI Security',
    issuer: 'Tech Innovation Council',
    year: '2023',
    icon: '💡',
    description: 'Awarded for groundbreaking AI threat detection technology',
  },
  {
    title: 'SOC 2 Type II Compliant',
    issuer: 'Security Compliance Board',
    year: '2022',
    icon: '🔒',
    description: 'Highest level of security and compliance certification',
  },
  {
    title: 'Customer Excellence Award',
    issuer: 'Enterprise Security Forum',
    year: '2024',
    icon: '⭐',
    description: 'Outstanding customer satisfaction and service delivery',
  },
  {
    title: 'Top 10 Security Providers',
    issuer: 'Cybersecurity Magazine',
    year: '2024',
    icon: '🎯',
    description: 'Ranked among the world\'s leading security solution providers',
  },
]

export default function AwardsSection() {
  return (
    <section className="awards-section" id="awards" style={{
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(100, 100, 100, 0.02) 100%)',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(249, 0, 77, 0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(100, 100, 100, 0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
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
            Recognition & Excellence
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-weight-heading-light)',
            color: 'var(--color-text-primary)',
            margin: '0'
          }}>
            Awards & <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Certifications</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-xl)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {awards.map((award, index) => (
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.5)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 0, 77, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Gradient Overlay on Hover */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.1) 0%, transparent 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} className="award-overlay"></div>

              <div style={{
                fontSize: '48px',
                marginBottom: 'var(--spacing-md)',
                display: 'inline-block',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              >
                {award.icon}
              </div>

              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-primary)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-xs)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {award.year}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-sm)',
                lineHeight: '1.3'
              }}>
                {award.title}
              </h3>

              <div style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-primary)',
                fontWeight: '500',
                marginBottom: 'var(--spacing-sm)'
              }}>
                {award.issuer}
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                margin: '0'
              }}>
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


