'use client'

import Link from 'next/link'

const expertiseItems = [
  {
    title: 'Harnessing the Power of AI',
    description: 'We leverage cutting-edge artificial intelligence to detect, analyze, and neutralize cyber threats before they can breach your systems.',
  },
  {
    title: 'Ultimate Security Connectivity',
    description: 'Our 24/7 monitoring and real-time threat intelligence ensure your digital infrastructure stays protected around the clock.',
  },
  {
    title: 'Partners in Cybersecurity Success',
    description: 'We work closely with organizations to build customized security strategies that evolve with your business needs.',
  },
]

export default function ExpertiseSection() {
  return (
    <section className="expertise-section" id="expertise" style={{
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 'var(--spacing-4xl)',
          alignItems: 'stretch',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Left Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              marginBottom: 'var(--spacing-lg)'
            }}>
              <span className="shimmer-text" style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Our Expertise
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 'var(--font-weight-heading-light)',
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: 'var(--spacing-xl)',
              letterSpacing: '-0.02em'
            }}>
              Driving Growth with Our <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Expertise and Passion</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-body-light)',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.8',
              margin: '0',
              marginTop: 'auto'
            }}>
              At CyberAssassin, we combine elite cybersecurity expertise with cutting-edge AI technology to deliver 
              unparalleled protection for your digital assets. Our team ensures your business remains secure and resilient.
            </p>
          </div>

          {/* Vertical Line */}
          <div style={{
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.2) 80%, transparent 100%)',
            alignSelf: 'stretch'
          }}></div>

          {/* Right Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            {expertiseItems.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: 'var(--spacing-sm)',
                marginBottom: index < expertiseItems.length - 1 ? 'var(--spacing-xl)' : '0'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '18px',
                  height: '18px',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f9004d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                    <polyline points="16 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginBottom: 'var(--spacing-sm)',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-body-light)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: '1.7',
                    margin: '0'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <Link 
              href="/services" 
              className="btn btn--primary"
              style={{
                marginTop: 'var(--spacing-lg)',
                width: 'fit-content'
              }}
            >
              Learn More
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

