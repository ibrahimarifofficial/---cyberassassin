'use client'

import ImageWithFallback from '../ImageWithFallback'

export default function ImageContentSection() {
  return (
    <section className="image-content-section" id="image-content" style={{
      padding: 'var(--spacing-5xl) 0',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Full Width Image with Rounded Borders */}
          <div style={{
            position: 'relative',
            width: '100vw',
            height: '600px',
            borderRadius: '24px',
            overflow: 'hidden',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}>
            <ImageWithFallback
              src="/assets/images/about-2.jpg"
              alt="Cybersecurity Innovation"
              style={{
                width: '100%',
                height: '600px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '24px'
              }}
              loading="lazy"
            />

            {/* Content Box - Bottom Right Corner */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '600px',
              height: '240px',
              padding: 'var(--spacing-3xl) var(--spacing-3xl) 0 var(--spacing-3xl)',
              background: `
                radial-gradient(circle at top left, rgba(249, 0, 77, 0.08) 0%, transparent 40%),
                radial-gradient(circle at top right, rgba(255, 182, 193, 0.06) 0%, transparent 40%),
                radial-gradient(circle at bottom right, rgba(249, 0, 77, 0.05) 0%, transparent 40%),
                #000000
              `,
              backdropFilter: 'blur(10px)',
              borderTopLeftRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {/* Heading at Top */}
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: '#ffffff',
                lineHeight: '1.2',
                margin: '0',
                letterSpacing: '-0.02em',
                alignSelf: 'flex-start'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Advanced Security Solutions
                </span>
              </h2>

              {/* Paragraph at Bottom with Small Font Size */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-body-light)',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: '0',
                alignSelf: 'flex-end',
                marginTop: 'auto'
              }}>
                We deliver cutting-edge cybersecurity solutions powered by advanced AI technology. Our expert team combines 
                deep industry knowledge with innovative approaches to protect your digital assets and ensure business continuity 
                in an ever-evolving threat landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .image-content-section > div > div > div > div:last-child {
            width: 500px !important;
            padding: var(--spacing-md) var(--spacing-xl) !important;
          }
        }

        @media (max-width: 768px) {
          .image-content-section > div > div > div {
            height: 400px !important;
          }

          .image-content-section > div > div > div img {
            height: 400px !important;
          }

          .image-content-section > div > div > div > div:last-child {
            position: relative !important;
            width: 100% !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            border-bottom-left-radius: 24px !important;
            border-bottom-right-radius: 24px !important;
            padding: var(--spacing-xl) !important;
            margin-top: var(--spacing-lg) !important;
          }
        }
      `}</style>
    </section>
  )
}

