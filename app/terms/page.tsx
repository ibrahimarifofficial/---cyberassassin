'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import InfiniteSlider from '@/components/InfiniteSlider'

export default function TermsPage() {
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
          className="terms-hero" 
          id="terms-hero" 
          role="region" 
          aria-label="Terms Hero section"
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
                    Terms and Conditions
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
                  <span style={{ color: '#ffffff', fontWeight: '400' }}>Terms and Conditions</span>
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
        <section className="terms-content" style={{
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
                    1. Agreement to Terms
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    By accessing and using the CyberAssassin website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
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
                    2. Use License
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    Permission is granted to temporarily access the materials on CyberAssassin's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Modify or copy the materials</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Use the materials for any commercial purpose or for any public display</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Attempt to reverse engineer any software contained on the website</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Remove any copyright or other proprietary notations from the materials</li>
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
                    3. Services
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    CyberAssassin provides cybersecurity services including but not limited to threat detection, vulnerability assessment, security consulting, and AI-driven security solutions. All services are provided subject to separate service agreements.
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
                    4. User Accounts
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
                  </p>
                  <ul style={{
                    paddingLeft: 'var(--spacing-xl)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Maintaining the security of your account and password</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>All activities that occur under your account</li>
                    <li style={{ marginBottom: 'var(--spacing-sm)' }}>Notifying us immediately of any unauthorized use</li>
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
                    5. Intellectual Property
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    The website and its original content, features, and functionality are owned by CyberAssassin and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
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
                    6. Disclaimer
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    The materials on CyberAssassin's website are provided on an 'as is' basis. CyberAssassin makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
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
                    7. Limitations
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    In no event shall CyberAssassin or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CyberAssassin's website.
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
                    8. Revisions
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    CyberAssassin may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
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
                    9. Governing Law
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
                    10. Contact Information
                  </h2>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <strong>Email:</strong> legal@cyberassassin.com<br />
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
      <a href="#terms-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

