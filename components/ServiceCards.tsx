'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ImageWithFallback from './ImageWithFallback'

const serviceCards = [
  {
    icon: encodeURI('/assets/images/cyber-security (1).png'),
    title: 'AI-Powered Penetration Testing',
    description: 'Leverage advanced AI algorithms to simulate sophisticated cyberattacks, automatically identify vulnerabilities, and assess your security posture with machine learning-driven threat modeling and real-time risk analysis.'
  },
  {
    icon: encodeURI('/assets/images/security (1).png'),
    title: 'Intelligent Web Application Security',
    description: 'Protect your web applications with AI-driven threat detection, automated vulnerability scanning, and intelligent security protocols that adapt to emerging threats in real-time.'
  },
  {
    icon: '/assets/images/cyber-security.png',
    title: 'AI-Enhanced Network Security',
    description: 'Safeguard your network infrastructure with AI-powered intrusion detection, behavioral analytics, and automated threat response systems that learn and adapt to protect against evolving cyber threats.'
  },
  {
    icon: encodeURI('/assets/images/cyber-security (2).png'),
    title: 'AI-Driven Data Privacy & Compliance',
    description: 'Ensure data confidentiality and regulatory compliance with intelligent data classification, automated privacy controls, and AI-powered compliance monitoring that adapts to changing regulations.'
  },
  {
    icon: '/assets/images/time-keeping.png',
    title: 'AI-Powered Incident Response & Threat Hunting',
    description: 'Deploy intelligent threat hunting capabilities with AI-driven anomaly detection, automated incident response, and predictive analytics to identify and neutralize threats before they impact your business.'
  },
  {
    icon: '/assets/images/secure-data.png',
    title: 'Intelligent Cloud Security',
    description: 'Secure your cloud infrastructure with AI-enhanced monitoring, automated security orchestration, and intelligent access controls that continuously learn and adapt to protect your cloud assets.'
  }
]

export default function ServiceCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioningRef = useRef(false)
  
  // Track window width for responsive slider
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }
    
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
    
    return () => {
      window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  // Create duplicated array for seamless infinite loop
  // We duplicate the array so we can loop seamlessly
  const allCards = [...serviceCards, ...serviceCards]

  // Auto-play slider with infinite loop - Completely rewritten for smooth transitions
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % serviceCards.length
          return next
        })
      }, 3000) // Change slide every 3 seconds
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])

  // Reset transition flag after animation completes
  useEffect(() => {
    isTransitioningRef.current = true
    const transitionDuration = windowWidth <= 480 ? 450 : 550 // Match CSS transition duration
    const timer = setTimeout(() => {
      isTransitioningRef.current = false
    }, transitionDuration)
    
    return () => clearTimeout(timer)
  }, [currentIndex, windowWidth])

  // Calculate transform for smooth sliding - responsive
  const getTransform = () => {
    // Use windowWidth state or default to desktop
    const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)
    const isMobile = width <= 768
    const isTablet = width <= 1024 && width > 768
    
    let cardWidth: number
    if (isMobile) {
      cardWidth = 100 // 1 card visible on mobile
    } else if (isTablet) {
      cardWidth = 100 / 2 // 2 cards visible on tablet
    } else {
      cardWidth = 100 / 3 // 3 cards visible on desktop
    }
    
    const safeIndex = currentIndex % serviceCards.length
    const offset = safeIndex * cardWidth
    return `translateX(-${offset}%)`
  }

  return <section style={{
      padding: 'var(--spacing-5xl) 0',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Gradients */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(ellipse at center top, rgba(249, 0, 77, 0.05) 0%, transparent 50%), radial-gradient(ellipse at center bottom, rgba(150, 150, 150, 0.08) 0%, transparent 50%), linear-gradient(135deg, rgba(249, 0, 77, 0.02) 0%, transparent 50%, rgba(100, 100, 100, 0.03) 100%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: 'var(--spacing-xl)',
          maxWidth: '1400px',
          margin: '0 auto',
          alignItems: 'stretch'
        }} className="service-cards-layout">
          {/* Slider Container - Left Side (3/4 width) */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px'
          }}>
            <div
              ref={sliderRef}
              style={{
                display: 'flex',
                gap: windowWidth <= 768 ? 'var(--spacing-md)' : 'var(--spacing-xl)',
                transform: getTransform(),
                transition: windowWidth <= 480 ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
                WebkitTransform: getTransform(),
                WebkitTransition: windowWidth <= 480 ? '-webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : '-webkit-transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {allCards.map((card, index) => {
                const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                  const cardEl = e.currentTarget
                  if (!cardEl) return

                  const rect = cardEl.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top

                  cardEl.style.setProperty('--mouse-x', `${x}px`)
                  cardEl.style.setProperty('--mouse-y', `${y}px`)
                }

                const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
                  const cardEl = e.currentTarget
                  if (!cardEl) return
                  
                  cardEl.style.setProperty('--spotlight-opacity', '1')
                  cardEl.style.transform = 'translateY(-5px)'
                  cardEl.style.borderColor = 'rgba(249, 0, 77, 0.5)'
                  
                  const iconDiv = cardEl.querySelector('[data-icon-container]') as HTMLElement
                  if (iconDiv) {
                    iconDiv.style.transform = 'scale(1.1) rotate(5deg)'
                  }
                  const overlay = cardEl.querySelector('[data-hover-overlay]') as HTMLElement
                  if (overlay) {
                    overlay.style.opacity = '1'
                    overlay.style.visibility = 'visible'
                  }
                  const button = cardEl.querySelector('[data-hover-button]') as HTMLElement
                  if (button) {
                    button.style.opacity = '1'
                    button.style.transform = 'translateY(0)'
                  }
                }

                const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                  const cardEl = e.currentTarget
                  if (!cardEl) return
                  
                  cardEl.style.setProperty('--spotlight-opacity', '0')
                  cardEl.style.transform = 'translateY(0)'
                  cardEl.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  
                  const iconDiv = cardEl.querySelector('[data-icon-container]') as HTMLElement
                  if (iconDiv) {
                    iconDiv.style.transform = 'scale(1) rotate(0deg)'
                  }
                  const overlay = cardEl.querySelector('[data-hover-overlay]') as HTMLElement
                  if (overlay) {
                    overlay.style.opacity = '0'
                    overlay.style.visibility = 'hidden'
                  }
                  const button = cardEl.querySelector('[data-hover-button]') as HTMLElement
                  if (button) {
                    button.style.opacity = '0'
                    button.style.transform = 'translateY(20px)'
                  }
                }

                return (
                  <div
                    key={`card-${index}`}
                    className="service-card-hover service-card-spotlight"
                    style={{
                      background: 'rgba(5, 5, 10, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: 'var(--spacing-lg) var(--spacing-lg) var(--spacing-xl) var(--spacing-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      flexShrink: 0,
                      width: windowWidth <= 768 
                        ? '100%' 
                        : windowWidth <= 1024 
                        ? `calc((100% - var(--spacing-xl)) / 2)`
                        : `calc((100% - 2 * var(--spacing-xl)) / 3)`,
                      minWidth: windowWidth <= 768 
                        ? '100%' 
                        : windowWidth <= 1024 
                        ? `calc((100% - var(--spacing-xl)) / 2)`
                        : `calc((100% - 2 * var(--spacing-xl)) / 3)`,
                      maxWidth: windowWidth <= 768 ? '100%' : 'none',
                      boxSizing: 'border-box',
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                      '--spotlight-opacity': '0'
                    } as React.CSSProperties}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Spotlight Overlay */}
                    <div 
                      className="spotlight-overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        borderRadius: '16px',
                        opacity: 'var(--spotlight-opacity)',
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(249, 0, 77, 0.15) 0%, rgba(249, 0, 77, 0.08) 30%, transparent 60%)`,
                        zIndex: 0
                      }}
                    ></div>
                      {/* Content Wrapper - Above Spotlight */}
                      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {/* Blurry Overlay - Shows on Hover */}
                      <div
                        data-hover-overlay
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          borderRadius: '16px',
                          opacity: 0,
                          visibility: 'hidden',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 5,
                          pointerEvents: 'none'
                        }}
                      ></div>
                      {/* Icon with Pink Glow */}
              <div 
                data-icon-container
                className="service-card__icon"
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  zIndex: 2
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(249, 0, 77, 0.3) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}></div>
                <ImageWithFallback
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  loading="lazy"
                  className="service-icon-50"
                />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: '#ffffff',
                marginBottom: 'var(--spacing-md)',
                lineHeight: '1.3',
                position: 'relative',
                zIndex: 2
              }}>
                {card.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: '0',
                marginTop: 'auto',
                paddingTop: 'var(--spacing-md)',
                position: 'relative',
                zIndex: 2
              }}>
                {card.description}
              </p>

              {/* Learn More Button - Shows on Hover */}
              <Link
                data-hover-button
                href="/#services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  padding: 'var(--spacing-sm) var(--spacing-lg)',
                  background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.2) 0%, rgba(255, 107, 157, 0.2) 100%)',
                  border: '1.5px solid rgba(249, 0, 77, 0.6)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '300',
                  position: 'absolute',
                  bottom: 'var(--spacing-lg)',
                  left: 'var(--spacing-lg)',
                  right: 'var(--spacing-lg)',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 10,
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 0, 77, 0.3) 0%, rgba(255, 107, 157, 0.3) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.9)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(249, 0, 77, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 0, 77, 0.2) 0%, rgba(255, 107, 157, 0.2) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.6)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span>Learn More</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H15M15 9L9 3M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
                </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Card - Fixed Position on Right Side (1/4 width) */}
          <div
            style={{
              background: 'rgba(5, 5, 15, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: 'var(--spacing-lg) var(--spacing-lg) var(--spacing-xl) var(--spacing-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'visible',
              height: '100%'
            }}
          >
            {/* Subtitle with Shimmer Effect */}
            <div style={{
              marginBottom: 'var(--spacing-md)'
            }}>
            <span
              className="service-cards-eyebrow shimmer-text fade-in-down"
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textDecoration: 'underline',
                  textDecorationColor: '#f9004d',
                  textUnderlineOffset: '4px',
                  textDecorationThickness: '2px'
                }}
              >
                Our Services
              </span>
            </div>

            {/* Main Title */}
            <h2 className="fade-in-up-delay-1" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 'var(--font-weight-heading-medium)',
              color: '#ffffff',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: '1.2'
            }}>
              Advanced<br />Threat Detection
            </h2>

            {/* CTA Button */}
            <Link
              href="/#services"
              className="fade-in-up-delay-2"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.9) 0%, rgba(255, 107, 157, 0.9) 100%)',
                borderRadius: '8px',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                marginBottom: 'var(--spacing-lg)',
                position: 'relative',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(249, 0, 77, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              VIEW ALL SERVICE
            </Link>

            {/* Tilted Lock Image - Floating Animation */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '-150px',
              width: '250px',
              height: '250px',
              opacity: 0.85,
              transform: 'rotate(15deg) translateX(0)',
              zIndex: 1,
              pointerEvents: 'none',
              overflow: 'visible',
              animation: 'floatLock 4s ease-in-out infinite'
            }}>
              {/* Lock Image */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/assets/images/lock.png"
                  alt="Lock"
                  loading="lazy"
                  className="lock-image-250"
                  style={{
                    objectFit: 'contain',
                    imageRendering: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .service-cards-eyebrow.shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(249, 0, 77, 0.8) 0%,
            rgba(249, 0, 77, 1) 20%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(249, 0, 77, 1) 80%,
            rgba(249, 0, 77, 0.8) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }

        @keyframes floatLock {
          0%, 100% {
            transform: rotate(15deg) translateY(0px) translateX(0px);
          }
          25% {
            transform: rotate(18deg) translateY(-8px) translateX(3px);
          }
          50% {
            transform: rotate(15deg) translateY(-12px) translateX(0px);
          }
          75% {
            transform: rotate(12deg) translateY(-8px) translateX(-3px);
          }
        }

        .service-card-spotlight {
          background: rgba(5, 5, 10, 0.95) !important;
        }

        .spotlight-overlay {
          will-change: opacity;
        }

        @media (hover: none) and (pointer: coarse) {
          .service-card-spotlight:active .spotlight-overlay {
            opacity: 0.3 !important;
          }
        }

        .service-icon-50,
        .service-icon-50 img {
          width: 50px !important;
          height: 50px !important;
          max-width: 50px !important;
          max-height: 50px !important;
          min-width: 50px !important;
          min-height: 50px !important;
          object-fit: contain !important;
          display: block !important;
        }

        /* Force 250px width on lock image */
        .lock-image-250 {
          width: 250px !important;
          height: auto !important;
          max-width: 250px !important;
        }

        @media (max-width: 1200px) {
          .service-card-slide {
            width: calc(50% - var(--spacing-xl) / 2) !important;
            min-width: calc(50% - var(--spacing-xl) / 2) !important;
          }
        }

        @media (max-width: 1200px) {
          .service-cards-layout {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-lg) !important;
          }
          
          .service-card-slide {
            width: calc(50% - var(--spacing-xl) / 2) !important;
            min-width: calc(50% - var(--spacing-xl) / 2) !important;
          }
        }

        @media (max-width: 768px) {
          .service-cards-layout {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-md) !important;
          }
          
          .service-card-hover {
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
          }
          
          /* Smooth scrolling container */
          [ref="sliderRef"] {
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
        
        @media (max-width: 480px) {
          .service-card-hover {
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
            padding: var(--spacing-md) !important;
          }
          
          /* Ensure smooth transitions on mobile */
          [ref="sliderRef"] {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
            -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
        }
      `}</style>
    </section>
}

