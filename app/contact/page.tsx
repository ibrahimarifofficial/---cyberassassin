'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Link from 'next/link'
import InfiniteSlider from '@/components/InfiniteSlider'

export default function ContactPage() {
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      }

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to send message. Please try again.'
        try {
          const result = await response.json()
          errorMessage = result.error || errorMessage
        } catch {
          // If JSON parsing fails, use default error message
        }
        setSubmitError(errorMessage)
        setSubmitSuccess(false)
        return
      }

      // Success case
      try {
        await response.json()
      } catch {
        // Even if JSON parsing fails, if response is OK, it's a success
      }
      setSubmitSuccess(true)
      setSubmitError('')
      e.currentTarget.reset()
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitError('An error occurred. Please try again.')
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="contact-hero" 
          id="contact-hero" 
          role="region" 
          aria-label="Contact Hero section"
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
                    Contact Us
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
                  Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
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
                  <span style={{ color: '#ffffff', fontWeight: '400' }}>Contact</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Text Bar */}
          <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', zIndex: 2 }}>
            <InfiniteSlider />
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="contact-content" style={{
          padding: 'var(--spacing-5xl) 0',
          position: 'relative',
          background: 'var(--color-bg-primary)'
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-4xl)',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {/* Contact Form */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 'var(--font-weight-heading-light)',
                  color: '#ffffff',
                  marginBottom: 'var(--spacing-xl)',
                  letterSpacing: '-0.02em'
                }}>
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-lg)'
                }}>
                  <div>
                    <label htmlFor="name" style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-base)',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#f9004d'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-base)',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#f9004d'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-base)',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#f9004d'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-base)',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#f9004d'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-base)',
                        resize: 'vertical',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#f9004d'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  {submitSuccess && (
                    <div style={{
                      padding: 'var(--spacing-md)',
                      background: 'rgba(76, 175, 80, 0.1)',
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                      borderRadius: '8px',
                      color: '#4caf50',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-base)',
                      marginTop: 'var(--spacing-md)'
                    }}>
                      ✓ Your message has been sent successfully! We will get back to you soon.
                    </div>
                  )}
                  {submitError && (
                    <div style={{
                      padding: 'var(--spacing-md)',
                      background: 'rgba(244, 67, 54, 0.1)',
                      border: '1px solid rgba(244, 67, 54, 0.3)',
                      borderRadius: '8px',
                      color: '#f44336',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-base)',
                      marginTop: 'var(--spacing-md)'
                    }}>
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={isSubmitting}
                    style={{
                      marginTop: 'var(--spacing-md)',
                      alignSelf: 'flex-start',
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '500px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.08) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(180, 180, 180, 0.06) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '24px',
                  padding: 'var(--spacing-3xl)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '500px'
                }}>
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 'var(--font-weight-heading-light)',
                      color: '#ffffff',
                      marginBottom: 'var(--spacing-lg)',
                      letterSpacing: '-0.02em'
                    }}>
                      Contact Information
                    </h2>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-xl)',
                      marginBottom: 'var(--spacing-xl)'
                    }}>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-md)',
                          marginBottom: 'var(--spacing-sm)'
                        }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'rgba(249, 0, 77, 0.1)',
                            border: '1px solid rgba(249, 0, 77, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                          <div>
                            <h3 style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'var(--font-size-base)',
                              fontWeight: '600',
                              color: '#ffffff',
                              margin: '0 0 var(--spacing-xs) 0'
                            }}>
                              Address
                            </h3>
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--font-size-base)',
                              color: 'rgba(255, 255, 255, 0.7)',
                              margin: '0',
                              lineHeight: '1.6'
                            }}>
                              123 Cyber Security Avenue<br />
                              Tech District, CA 94105<br />
                              United States
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(249, 0, 77, 0.1)',
                        border: '1px solid rgba(249, 0, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-base)',
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: '0 0 var(--spacing-xs) 0'
                        }}>
                          Phone
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: '0',
                          lineHeight: '1.6'
                        }}>
                          +1 (555) 123-4567<br />
                          +1 (555) 123-4568
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(249, 0, 77, 0.1)',
                        border: '1px solid rgba(249, 0, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'var(--font-size-base)',
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: '0 0 var(--spacing-xs) 0'
                        }}>
                          Email
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: '0',
                          lineHeight: '1.6'
                        }}>
                          info@cyberassassin.com<br />
                          support@cyberassassin.com
                        </p>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>

                  {/* Small Paragraph */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-body-light)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: '1.6',
                    margin: 'var(--spacing-lg) 0',
                    textAlign: 'center'
                  }}>
                    Our team is available 24/7 to assist you with any cybersecurity concerns or inquiries.
                  </p>

                  {/* Social Links */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(249, 0, 77, 0.1)',
                        border: '1px solid rgba(249, 0, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f9004d',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.2)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.1)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                      aria-label="LinkedIn"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.667 0H3.333C1.492 0 0 1.492 0 3.333v13.334C0 18.508 1.492 20 3.333 20h13.334C18.508 20 20 18.508 20 16.667V3.333C20 1.492 18.508 0 16.667 0zM6.667 16.667H3.333V6.667h3.334v10zM5 5.5c-1.013 0-1.833-.82-1.833-1.833S3.987 1.833 5 1.833 6.833 2.653 6.833 3.667 6.013 5.5 5 5.5zm11.667 11.167h-3.334v-5c0-1.192-.025-2.725-1.658-2.725-1.658 0-1.917 1.3-1.917 2.642v5.083H6.667V6.667h3.208v1.367h.042c.45-.842 1.55-1.725 3.183-1.725 3.392 0 4.025 2.233 4.025 5.133v5.225z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(249, 0, 77, 0.1)',
                        border: '1px solid rgba(249, 0, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f9004d',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.2)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.1)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                      aria-label="Twitter"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3.925a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 011.392 2.498a4.106 4.106 0 001.27 5.478 4.072 4.072 0 01-1.86-.513v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.293a11.616 11.616 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.341 8.341 0 0020 3.925z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(249, 0, 77, 0.1)',
                        border: '1px solid rgba(249, 0, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f9004d',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.2)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.1)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                      aria-label="GitHub"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </a>
                  </div>

                  {/* Note at Bottom */}
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-body-light)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: '1.5',
                    margin: '0',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    We will contact you within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - Full Width */}
        <section className="contact-map" style={{
          padding: '0 0 var(--spacing-5xl) 0',
          position: 'relative',
          background: 'var(--color-bg-primary)'
        }}>
          <div className="container" style={{ padding: '0' }}>
            <div style={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '500px',
              margin: '0 auto',
              maxWidth: '100%'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.41941548468145!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <a href="#contact-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

