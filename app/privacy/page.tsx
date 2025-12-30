'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import InfiniteSlider from '@/components/InfiniteSlider'

export default function PrivacyPage() {
  useSmoothScroll()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        ctx.fillStyle = `rgba(249, 0, 77, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15
            ctx.strokeStyle = `rgba(249, 0, 77, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="privacy-hero" 
          id="privacy-hero" 
          role="region" 
          aria-label="Privacy Hero section"
          style={{
            position: 'relative',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            overflow: 'hidden',
            background: '#000000'
          }}
        >
          {/* Global Background Gradient Transition */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 10%, rgba(249, 0, 77, 0.12) 0%, transparent 35%),
              radial-gradient(circle at 80% 30%, rgba(0, 0, 0, 0.9) 0%, transparent 45%),
              radial-gradient(circle at 40% 60%, rgba(0, 0, 0, 0.8) 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.7) 0%, transparent 45%),
              radial-gradient(circle at 10% 90%, rgba(249, 0, 77, 0.08) 0%, transparent 30%),
              linear-gradient(180deg, #000000 0%, #000000 50%, #000000 100%)
            `,
            backgroundAttachment: 'fixed',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>

          {/* Particle Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 0.4
            }}
          ></canvas>

          {/* Curved Pink Lines Background */}
          <svg 
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 0.4
            }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Left Curved Line */}
            <path
              d="M 0 80 Q 250 250 350 450 T 450 750"
              stroke="#f9004d"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(249, 0, 77, 0.5))',
                animation: 'glowPulse 3s ease-in-out infinite'
              }}
            />
            <circle
              cx="450"
              cy="750"
              r="3"
              fill="#f9004d"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(249, 0, 77, 1))'
              }}
            />
            <circle
              r="4"
              fill="#f9004d"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(249, 0, 77, 1))',
                animation: 'moveAlongPathLeft 4s linear infinite'
              }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 0 80 Q 250 250 350 450 T 450 750"
              />
            </circle>

            {/* Right Curved Line */}
            <path
              d="M 1200 80 Q 950 250 850 450 T 750 750"
              stroke="#f9004d"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(249, 0, 77, 0.5))',
                animation: 'glowPulse 3s ease-in-out infinite 1.5s'
              }}
            />
            <circle
              cx="750"
              cy="750"
              r="3"
              fill="#f9004d"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(249, 0, 77, 1))'
              }}
            />
            <circle
              r="4"
              fill="#f9004d"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(249, 0, 77, 1))',
                animation: 'moveAlongPathRight 4s linear infinite 0.5s'
              }}
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin="0.5s"
                path="M 1200 80 Q 950 250 850 450 T 750 750"
              />
            </circle>
          </svg>

          <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'var(--spacing-5xl)',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 var(--spacing-xl)',
              minHeight: '60vh'
            }}>
              {/* Left Side - Vertical Text */}
              <div style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
                fontWeight: 'var(--font-weight-heading-light)',
                color: '#ffffff',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.8,
                position: 'relative',
                paddingRight: 'var(--spacing-xl)',
                whiteSpace: 'nowrap'
              }}>
                CyberAssassin
                <div style={{
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.5px',
                  height: '70%',
                  background: 'linear-gradient(180deg, #f9004d 0%, transparent 100%)',
                  opacity: 0.6
                }}></div>
              </div>

              {/* Center Content */}
              <div style={{
                textAlign: 'left',
                position: 'relative'
              }}>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 'var(--font-weight-heading-light)',
                  lineHeight: '1.1',
                  margin: '0 0 var(--spacing-lg) 0',
                  letterSpacing: '-0.02em'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9004d 50%, #ff6b9d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Privacy Policy
                  </span>
                </h1>

                {/* Paragraph below heading */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  fontWeight: 'var(--font-weight-body-light)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                  margin: '0 0 var(--spacing-xl) 0',
                  maxWidth: '550px'
                }}>
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                {/* Breadcrumb Navigation */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  fontSize: 'var(--font-size-sm)',
                  fontFamily: 'var(--font-body)'
                }}>
                  <Link 
                    href="/" 
                    style={{
                      color: '#f9004d',
                      textDecoration: 'none',
                      transition: 'opacity 0.3s ease',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Home
                  </Link>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 14 14" 
                    fill="none" 
                    style={{ color: '#f9004d', flexShrink: 0 }}
                  >
                    <circle cx="7" cy="7" r="6" fill="#f9004d" />
                    <path d="M5.5 7L7 8.5L8.5 7M7 5.5V8.5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: '#ffffff', fontWeight: '400' }}>Privacy Policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Text Bar */}
          <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', zIndex: 2 }}>
            <InfiniteSlider />
          </div>
        </section>

        {/* Content Section */}
        <section className="privacy-content" style={{
          padding: 'var(--spacing-5xl) 0',
          position: 'relative',
          background: 'var(--color-bg-primary)'
        }}>
          <div className="container">
            <div style={{
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: 'var(--spacing-4xl)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-base)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.8'
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    1. Introduction
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    CyberAssassin ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    2. Information We Collect
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    We may collect information about you in a variety of ways:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <strong>Personal Data:</strong> Name, email address, phone number, and other contact information you provide when contacting us or using our services.
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent on pages.
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.
                    </li>
                  </ul>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    3. How We Use Your Information
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    We use the information we collect to:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Provide, maintain, and improve our services</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Process your requests and respond to your inquiries</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Send you technical notices and support messages</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Monitor and analyze trends, usage, and activities</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Detect, prevent, and address technical issues</li>
                  </ul>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    4. Information Sharing and Disclosure
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>With service providers who assist us in operating our website and conducting our business</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>When required by law or to respond to legal process</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>To protect our rights, privacy, safety, or property</li>
                  </ul>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    5. Data Security
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    6. Your Rights
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    You have the right to:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Access and receive a copy of your personal data</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Rectify inaccurate or incomplete data</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Request deletion of your personal data</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Object to processing of your personal data</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Request restriction of processing</li>
                  </ul>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    7. Cookies
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    We use cookies to enhance your experience on our website. You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    8. Changes to This Privacy Policy
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    marginTop: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.02em'
                  }}>
                    9. Contact Us
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <strong>Email:</strong> privacy@cyberassassin.com<br />
                    <strong>Address:</strong> 123 Cyber Security Avenue, Tech District, CA 94105, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <a href="#privacy-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

