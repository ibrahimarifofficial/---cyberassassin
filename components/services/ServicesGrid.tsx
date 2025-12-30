'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import ImageWithFallback from '../ImageWithFallback'

const serviceCategories = [
  {
    title: 'Core Cybersecurity Services',
    icon: '/assets/images/cyber-security.png',
    services: [
      {
        name: 'Network Security',
        description: 'We guard your digital perimeter like an elite kill zone—monitoring, filtering, and neutralizing threats before they cross your network boundary.',
        image: '/assets/images/Network Security.webp',
        slug: 'network-security'
      },
      {
        name: 'Endpoint Security',
        description: 'Every device is a potential entry point. CyberAssassin locks down endpoints with ruthless precision, stopping attacks at the source.',
        image: '/assets/images/Endpoint Security.webp',
        slug: 'endpoint-security'
      },
      {
        name: 'Cybersecurity Consulting & Strategy',
        description: 'Strategic guidance from seasoned cyber warriors—designed to outthink, outmaneuver, and outlast attackers. We provide a clear, lethal plan to evolve your security posture from reactive to unstoppable.',
        image: '/assets/images/Cybersecurity Consulting & Strategy.webp',
        slug: 'cybersecurity-consulting-strategy'
      },
      {
        name: 'Firewall Management',
        description: 'Not just walls—intelligent barriers. We configure and manage firewalls that think, adapt, and strike back against malicious traffic.',
        image: '/assets/images/Firewall Management.webp',
        slug: 'firewall-management'
      },
      {
        name: 'Intrusion Detection & Prevention (IDS/IPS)',
        description: 'We don\'t wait for breaches—we hunt them. Real-time detection and automatic response to intruders attempting to slip through the cracks.',
        image: '/assets/images/Intrusion detection.webp',
        slug: 'intrusion-detection-prevention'
      },
      {
        name: 'Ransomware Protection & Recovery',
        description: 'No negotiations. No panic. We prevent ransomware and restore systems without bowing to attackers.',
        image: '/assets/images/Ransomware Protection.webp',
        slug: 'ransomware-protection-recovery'
      }
    ]
  },
  {
    title: 'AI-Driven & Advanced Security',
    icon: encodeURI('/assets/images/security (1).png'),
    services: [
      {
        name: 'AI Threat Detection',
        description: 'Powered by adaptive intelligence, CyberAssassin predicts, detects, and eliminates threats before they even fully form.',
        image: '/assets/images/AI Threat Detection.webp',
        slug: 'ai-threat-detection'
      },
      {
        name: 'Behavioral Analytics',
        description: 'When behavior shifts, danger follows. We analyze user and system behavior to expose insider threats and silent attackers.',
        image: '/assets/images/Behavioral Analytics.webp',
        slug: 'behavioral-analytics'
      },
      {
        name: 'Automated Incident Response',
        description: 'Milliseconds matter. Our automated response engine isolates, contains, and eradicates threats without human delay.',
        image: '/assets/images/Automated Incident Response.webp',
        slug: 'automated-incident-response'
      }
    ]
  },
  {
    title: 'Offensive Security (Hacking the Hackers)',
    icon: encodeURI('/assets/images/cyber-security (1).png'),
    services: [
      {
        name: 'Penetration Testing',
        description: 'We attack your systems like real hackers—so criminals don\'t get the chance. Controlled chaos, real-world results.',
        image: '/assets/images/Penetration Testing.webp',
        slug: 'penetration-testing'
      },
      {
        name: 'Red Team Operations',
        description: 'Elite simulated cyber warfare designed to test your defenses under full-scale attack conditions.',
        image: '/assets/images/Red Team Operations.webp',
        slug: 'red-team-operations'
      },
      {
        name: 'Vulnerability Assessment',
        description: 'We expose weaknesses before attackers exploit them—turning blind spots into fortified strongholds.',
        image: '/assets/images/Vulnerability Assessment.webp',
        slug: 'vulnerability-assessment'
      }
    ]
  },
  {
    title: 'Cloud & Infrastructure Security',
    icon: '/assets/images/secure-data.png',
    services: [
      {
        name: 'Cloud Security (AWS, Azure, GCP)',
        description: 'Your cloud, fully armored. CyberAssassin secures configurations, identities, and workloads against cloud-native threats.',
        image: '/assets/images/Cloud Security.webp',
        slug: 'cloud-security'
      },
      {
        name: 'DevSecOps Integration',
        description: 'Security built into your code—not slapped on later. We embed protection directly into your development pipeline.',
        image: '/assets/images/DevSecOps.webp',
        slug: 'devsecops-integration'
      },
      {
        name: 'Container & Kubernetes Security',
        description: 'We secure containerized environments from build to runtime—no hidden backdoors, no exposed clusters.',
        image: '/assets/images/Container & Kubernetes Security.webp',
        slug: 'container-kubernetes-security'
      }
    ]
  },
  {
    title: 'Monitoring, Response & Recovery',
    icon: '/assets/images/time-keeping.png',
    services: [
      {
        name: 'Security Operations Center (SOC)',
        description: '24/7 cyber vigilance. Our SOC monitors, analyzes, and responds to threats in real time—day and night.',
        image: '/assets/images/SOC (24_7).webp',
        slug: 'security-operations-center'
      },
      {
        name: 'Incident Response & Forensics',
        description: 'When attacks happen, we strike back. Rapid containment, deep forensic analysis, and clean recovery.',
        image: '/assets/images/Incident Response & Forensics.webp',
        slug: 'incident-response-forensics'
      },
      {
        name: 'Malware Analysis & Removal',
        description: 'We dissect malicious code, understand its intent, and eliminate it down to the last byte.',
        image: '/assets/images/Malware Analysis.webp',
        slug: 'malware-analysis-removal'
      }
    ]
  },
  {
    title: 'Compliance, Risk & Governance',
    icon: encodeURI('/assets/images/cyber-security (2).png'),
    services: [
      {
        name: 'Compliance & Regulatory Security',
        description: 'We align your security posture with global standards—ISO 27001, GDPR, HIPAA, PCI-DSS—without slowing you down.',
        image: '/assets/images/Compliance Security.webp',
        slug: 'compliance-regulatory-security'
      },
      {
        name: 'Risk Assessment & Management',
        description: 'We quantify risk, prioritize threats, and design strategies that protect what matters most.',
        image: '/assets/images/Risk Assessment.webp',
        slug: 'risk-assessment-management'
      },
      {
        name: 'Security Audits',
        description: 'Deep, unforgiving audits that expose gaps and strengthen your compliance armor.',
        image: '/assets/images/Security Audits.webp',
        slug: 'security-audits'
      }
    ]
  },
  {
    title: 'Human & Business Security',
    icon: encodeURI('/assets/images/security (1).png'),
    services: [
      {
        name: 'Security Awareness Training',
        description: 'We turn employees from liabilities into cyber defenders through elite-level training.',
        image: '/assets/images/Security Awareness Training.webp',
        slug: 'security-awareness-training'
      },
      {
        name: 'Phishing Simulation',
        description: 'Realistic attack simulations that train teams to spot deception before damage is done.',
        image: '/assets/images/Phishing Simulation.webp',
        slug: 'phishing-simulation'
      },
      {
        name: 'Executive & VIP Cyber Protection',
        description: 'High-value targets need elite defense. We protect executives from targeted attacks and digital espionage.',
        image: '/assets/images/Executive Cyber Protection.webp',
        slug: 'executive-vip-cyber-protection'
      }
    ]
  },
  {
    title: 'Specialized & Emerging Services',
    icon: '/assets/images/cyber-security.png',
    services: [
      {
        name: 'IoT Security',
        description: 'Every smart device secured. No silent listeners, no hijacked sensors.',
        image: '/assets/images/IoT Security.webp',
        slug: 'iot-security'
      },
      {
        name: 'OT & Industrial Security',
        description: 'Protecting critical infrastructure where downtime is not an option.',
        image: '/assets/images/Industrial Security.webp',
        slug: 'ot-industrial-security'
      },
      {
        name: 'Digital Forensics',
        description: 'We uncover the truth hidden in logs, systems, and shadows—evidence-grade analysis.',
        image: '/assets/images/Digital Forensics.webp',
        slug: 'digital-forensics'
      }
    ]
  },
  {
    title: 'Advanced Security Frameworks',
    icon: encodeURI('/assets/images/security (1).png'),
    services: [
      {
        name: 'Social Engineering Testing',
        description: 'Humans are the weakest link. We test, expose, and strengthen your team against manipulation and deception.',
        image: '/assets/images/Social Engineering Testing.webp',
        slug: 'social-engineering-testing'
      },
      {
        name: 'Zero Trust Architecture',
        description: 'Trust no one. Verify everything. We implement Zero Trust frameworks that assume breach and block lateral movement instantly.',
        image: '/assets/images/Zero Trust Architecture.webp',
        slug: 'zero-trust-architecture'
      }
    ]
  },
  {
    title: 'Additional Security Services',
    icon: '/assets/images/cyber-security.png',
    services: []
  }
]

export default function ServicesGrid() {
  return (
    <section style={{
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
        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto var(--spacing-lg)'
        }}>
          <span className="services__eyebrow shimmer-text" style={{
            display: 'inline-block',
            marginBottom: 'var(--spacing-md)'
          }}>
            Our Services
          </span>
          <h2 
            className="services-main-heading silver-shimmer"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 'var(--font-weight-heading-light)',
              lineHeight: '1.2',
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--spacing-lg) 0'
            }}
          >
            Comprehensive Security Solutions
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.6',
            marginTop: 'var(--spacing-lg)',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Elite cybersecurity services designed to protect, detect, and dominate digital threats with precision and intelligence.
          </p>
        </div>

        {/* Services by Category */}
        <div className="services-by-category" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-5xl)',
          maxWidth: '1400px',
          margin: '0 auto',
          paddingTop: 'var(--spacing-xl)'
        }}>
          {serviceCategories.map((category, categoryIndex) => {
            // Add engaging section after Core Cybersecurity Services
            const shouldShowEngagingSection = categoryIndex === 0
            
            return (
              <React.Fragment key={categoryIndex}>
                <div className={`category-section category-${categoryIndex}`} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-2xl)'
                }}>
              {/* Category Header - Hide for first category (Core Cybersecurity Services) */}
              {categoryIndex > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-lg)',
                  marginBottom: 'var(--spacing-md)',
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative'
                }}>
                  {/* Decorative line for categories after first */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '-1px',
                    width: '60px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #f9004d 0%, transparent 100%)',
                    borderRadius: '2px'
                  }}></div>
                  <ImageWithFallback
                    src={category.icon}
                    alt={category.title}
                    loading="lazy"
                    className="service-icon-50"
                    width={50}
                    height={50}
                  />
                  <h3 
                    className="category-heading shimmer-text"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 'var(--font-weight-heading-medium)',
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: '1.2'
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
              )}

              {/* Services Grid */}
              <div className="services-grid-responsive" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--spacing-xl)'
              }}>
                {category.services.map((service, serviceIndex) => {
                  const cardRef = useRef<HTMLAnchorElement>(null)

                  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    const card = cardRef.current
                    if (!card) return

                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top

                    card.style.setProperty('--mouse-x', `${x}px`)
                    card.style.setProperty('--mouse-y', `${y}px`)
                  }

                  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    const card = cardRef.current
                    if (!card) return
                    
                    card.style.setProperty('--spotlight-opacity', '1')
                    card.style.transform = 'translateY(-8px)'
                    card.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }

                  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    const card = cardRef.current
                    if (!card) return
                    
                    card.style.setProperty('--spotlight-opacity', '0')
                    card.style.transform = 'translateY(0)'
                    card.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }

                  return (
                    <Link
                      key={serviceIndex}
                      href={service.slug ? `/services/${service.slug}` : "/contact"}
                      ref={cardRef}
                      className="service-card-spotlight"
                      style={{
                        background: 'rgba(5, 5, 10, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        padding: 'var(--spacing-xl)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit',
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
                          borderRadius: '20px',
                          opacity: 'var(--spotlight-opacity)',
                          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(249, 0, 77, 0.15) 0%, rgba(249, 0, 77, 0.08) 30%, transparent 60%)`,
                          zIndex: 0
                        }}
                      ></div>

                      {/* Content Wrapper - Above Spotlight */}
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Service Image */}
                    <div style={{
                      width: '350px',
                      height: '180px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      marginBottom: 'var(--spacing-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <ImageWithFallback
                        src={service.image || "/assets/images/about.webp"}
                        alt={service.name}
                        loading="lazy"
                        className="service-image-cover"
                        width={350}
                        height={180}
                      />
                    </div>

                    {/* Service Name */}
                    <h4 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                      fontWeight: 'var(--font-weight-heading-medium)',
                      color: '#ffffff',
                      marginBottom: 'var(--spacing-md)',
                      lineHeight: '1.3'
                    }}>
                      {service.name}
                    </h4>

                    {/* Service Description */}
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: '1.6',
                      margin: 0,
                      flexGrow: 1
                    }}>
                      {service.description}
                    </p>

                    {/* Learn More Link - Now just visual indicator */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        marginTop: 'var(--spacing-lg)',
                        color: '#f9004d',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        alignSelf: 'flex-start',
                        pointerEvents: 'none'
                      }}
                    >
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            
            {/* Engaging "More We Offer" Section - After Core Services */}
            {shouldShowEngagingSection && (
              <div className="more-we-offer-section" style={{
                position: 'relative',
                margin: 'var(--spacing-md) 0',
                padding: 'var(--spacing-3xl) var(--spacing-3xl)',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, rgba(249, 0, 77, 0.08) 0%, rgba(249, 0, 77, 0.03) 50%, rgba(100, 100, 150, 0.05) 100%)',
                border: '1px solid rgba(249, 0, 77, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                overflow: 'hidden'
              }}>
                {/* Animated Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-10%',
                  width: '600px',
                  height: '600px',
                  background: 'radial-gradient(circle, rgba(249, 0, 77, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulseGlow 8s ease-in-out infinite',
                  pointerEvents: 'none'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-30%',
                  left: '-5%',
                  width: '500px',
                  height: '500px',
                  background: 'radial-gradient(circle, rgba(100, 150, 255, 0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulseGlow 10s ease-in-out infinite 2s',
                  pointerEvents: 'none'
                }}></div>

                {/* Content */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-4xl)',
                  alignItems: 'center'
                }}>
                  {/* Left Side - Text Content */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      background: 'rgba(249, 0, 77, 0.15)',
                      border: '1px solid rgba(249, 0, 77, 0.3)',
                      borderRadius: '50px',
                      width: 'fit-content',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M10 2L12 7L17 8L13 12L14 17L10 14L6 17L7 12L3 8L8 7L10 2Z" fill="#f9004d" opacity="0.9"/>
                      </svg>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#f9004d',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        Extended Capabilities
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                      fontWeight: 'var(--font-weight-heading-light)',
                      color: '#ffffff',
                      lineHeight: '1.2',
                      margin: 0,
                      background: 'linear-gradient(135deg, #ffffff 0%, rgba(249, 0, 77, 0.9) 50%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      There's More We Offer
                    </h3>

                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.8',
                      margin: 0,
                      maxWidth: '500px'
                    }}>
                      Beyond our core services, we deliver specialized solutions tailored to your unique security challenges. Explore our comprehensive suite of advanced cybersecurity services designed to protect every aspect of your digital infrastructure.
                    </p>

                    {/* Feature Points */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-md)',
                      marginTop: 'var(--spacing-md)'
                    }}>
                      {[
                        'AI-Powered Threat Detection',
                        'Advanced Security Frameworks',
                        'Specialized Industry Solutions'
                      ].map((feature, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-md)',
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                        }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f9004d 0%, #ff6b9d 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 4px 12px rgba(249, 0, 77, 0.3)'
                          }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: '500'
                          }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Visual Elements */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Icon Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--spacing-lg)',
                      width: '100%'
                    }}>
                      {[
                        { 
                          label: 'Protection',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(249, 0, 77, 0.1)"/>
                            <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        },
                        { 
                          label: 'Detection',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M8 2L10 6L6 8L4 4L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                            <path d="M16 2L14 6L18 8L20 4L16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                          </svg>
                        },
                        { 
                          label: 'Response',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        },
                        { 
                          label: 'Compliance',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        },
                        { 
                          label: 'Strategy',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        },
                        { 
                          label: 'Innovation',
                          svg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(249, 0, 77, 0.1)"/>
                          </svg>
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="feature-icon-box" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 'var(--spacing-sm)',
                          padding: 'var(--spacing-lg)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          transition: 'all 0.3s ease',
                          animation: `fadeInScale 0.6s ease-out ${idx * 0.1}s both`
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f9004d',
                            filter: 'drop-shadow(0 0 8px rgba(249, 0, 77, 0.3))'
                          }}>
                            {item.svg}
                          </div>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            textAlign: 'center',
                            fontWeight: '500'
                          }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Scroll Indicator - Clickable */}
                    <button
                      onClick={() => {
                        // Find the next category section (category-1 which is AI-Driven & Advanced Security)
                        const nextCategory = document.querySelector('.category-1')
                        if (nextCategory) {
                          nextCategory.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
                        } else {
                          // Fallback: scroll to next category section
                          const allCategories = document.querySelectorAll('.category-section')
                          if (allCategories.length > 1) {
                            allCategories[1].scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                        }
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        marginTop: 'var(--spacing-md)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 'var(--spacing-sm)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: '500'
                      }}>
                        Scroll to explore
                      </span>
                      <div style={{
                        width: '2px',
                        height: '24px',
                        background: 'linear-gradient(180deg, #f9004d 0%, transparent 100%)',
                        animation: 'scrollIndicator 2s ease-in-out infinite',
                        borderRadius: '2px'
                      }}></div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '4px', color: '#f9004d' }}>
                        <path d="M8 4V12M4 8L8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            </React.Fragment>
          )
          })}
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

        .category-heading.shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(200, 200, 200, 0.8) 0%,
            rgba(255, 255, 255, 1) 20%,
            rgba(200, 200, 200, 0.9) 50%,
            rgba(255, 255, 255, 1) 80%,
            rgba(200, 200, 200, 0.8) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .services-main-heading.silver-shimmer {
          background: linear-gradient(
            90deg,
            rgba(200, 200, 200, 0.8) 0%,
            rgba(255, 255, 255, 1) 20%,
            rgba(200, 200, 200, 0.9) 50%,
            rgba(255, 255, 255, 1) 80%,
            rgba(200, 200, 200, 0.8) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .service-card-spotlight {
          background: rgba(5, 5, 10, 0.95) !important;
        }

        .spotlight-overlay {
          will-change: opacity;
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

        .service-image-cover,
        .service-image-cover img,
        img.service-image-cover {
          width: 350px !important;
          height: 180px !important;
          max-width: 350px !important;
          max-height: 180px !important;
          min-width: 350px !important;
          min-height: 180px !important;
          object-fit: cover !important;
          object-position: center center !important;
          border-radius: 12px !important;
          display: block !important;
          flex-shrink: 0 !important;
        }

        @media (hover: none) and (pointer: coarse) {
          .service-card-spotlight:active .spotlight-overlay {
            opacity: 0.3 !important;
          }
        }

        /* More We Offer Section Animations */
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scrollIndicator {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
        }

        .more-we-offer-section .feature-icon-box:hover {
          background: rgba(249, 0, 77, 0.1) !important;
          border-color: rgba(249, 0, 77, 0.3) !important;
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 24px rgba(249, 0, 77, 0.2) !important;
        }

        @media (max-width: 1024px) {
          .more-we-offer-section > div:first-child {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-2xl) !important;
          }
        }

        @media (max-width: 1024px) {
          .services-grid-responsive {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: var(--spacing-lg) !important;
          }
        }

        @media (max-width: 768px) {
          .services-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-md) !important;
          }
          
          .service-image-cover,
          .service-image-cover img,
          img.service-image-cover {
            width: 100% !important;
            height: 200px !important;
            max-width: 100% !important;
            min-width: 100% !important;
          }
          
          .more-we-offer-section {
            padding: var(--spacing-2xl) var(--spacing-xl) !important;
            margin: var(--spacing-sm) 0 !important;
          }

          .more-we-offer-section > div:first-child > div:last-child > div:first-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--spacing-md) !important;
          }
        }
        
        @media (max-width: 480px) {
          .services-grid-responsive {
            gap: var(--spacing-sm) !important;
          }
          
          .service-image-cover,
          .service-image-cover img,
          img.service-image-cover {
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  )
}

