'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import InfiniteSlider from '../InfiniteSlider'

export default function AboutHero() {
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
    <section 
      className="about-hero" 
      id="about-hero" 
      role="region" 
      aria-label="About Hero section"
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
      {/* Global Background Gradient Transition - Same as page */}
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
        {/* Left Curved Line - from top-left to center-bottom */}
        <path
          id="leftCurve"
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

        {/* Moving Dot on Left Line */}
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

        {/* Right Curved Line - from top-right to center-bottom */}
        <path
          id="rightCurve"
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

        {/* Moving Dot on Right Line */}
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
                About us
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
              We are an elite cybersecurity firm built to defend, detect, and dominate digital threats. 
              Backed by a highly skilled security task force, we deliver precision-driven solutions to protect critical systems.
            </p>

            {/* Breadcrumb Navigation - Below heading */}
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
              <span style={{ color: '#ffffff', fontWeight: '400' }}>About us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Text Bar */}
      <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', zIndex: 2 }}>
        <InfiniteSlider />
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.4;
            filter: drop-shadow(0 0 4px rgba(249, 0, 77, 0.4));
          }
          50% {
            opacity: 0.7;
            filter: drop-shadow(0 0 8px rgba(249, 0, 77, 0.7));
          }
        }

        @media (max-width: 1024px) {
          .about-hero {
            min-height: 45vh;
            padding: var(--spacing-3xl) 0;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            min-height: 40vh;
            padding: var(--spacing-2xl) 0;
          }
          
          .about-hero > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-2xl) !important;
            text-align: center !important;
          }
          
          .about-hero > div > div:last-child > div:first-child {
            writing-mode: horizontal-tb !important;
            transform: none !important;
            text-align: center !important;
            padding-right: 0 !important;
            padding-bottom: var(--spacing-md) !important;
            font-size: var(--font-size-sm) !important;
            justify-self: center;
          }
          
          .about-hero > div > div:last-child > div:first-child > div {
            display: none !important;
          }
          
          .about-hero > div > div:last-child > div:last-child {
            text-align: center !important;
          }
          
          .about-hero h1 {
            font-size: clamp(2.5rem, 12vw, 4.5rem) !important;
          }
        }
      `}</style>
    </section>
  )
}

