'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ImageWithFallback from '../ImageWithFallback'

// Lazy load below-the-fold components
const WorkWithUs = dynamic(() => import('../WorkWithUs'), { ssr: true })
const Testimonials = dynamic(() => import('../Testimonials'), { ssr: true })
const FinalCTA = dynamic(() => import('../FinalCTA'), { ssr: true })

// Service Content Configuration
const serviceContent: Record<string, any> = {
  'network-security': {
    mainContent: [
      'Our Network Security Solutions protect your entire digital infrastructure by securing data flow, network traffic, and critical systems against cyber threats. Through advanced firewalls, intrusion detection systems, real-time traffic monitoring, and proactive threat prevention, we ensure your network remains resilient against attacks, breaches, and unauthorized access. Our scalable and easily integrated solutions help your business operate securely, efficiently, and without disruption.',
      'We secure internal networks, cloud environments, servers, routers, and connected systems from cyberattacks, data breaches, and unauthorized access. Designed for scalability and seamless integration, our network security solutions ensure continuous protection in today\'s complex digital environment.'
    ],
    whyChooseHeading: 'Why Choose Network Security',
    whyChooseDescription: 'Network Security Solutions are essential for protecting your business from sophisticated and evolving cyber threats. By securing data transmission and monitoring network activity, we help prevent breaches, downtime, and unauthorized access while ensuring business continuity.',
    additionalContentHeading: 'Comprehensive Network Protection Solutions',
    additionalContent: [
      'Our network security solutions are designed to provide comprehensive protection for your entire digital infrastructure. We implement multi-layered defense strategies that combine advanced firewall technologies, intrusion detection systems, and real-time monitoring to safeguard your network from evolving cyber threats.',
      'With our expert team and cutting-edge tools, we ensure your network remains secure, compliant, and resilient against both known and emerging threats. Our solutions are scalable, easily integrated with existing systems, and provide continuous protection without disrupting your business operations.'
    ],
    faqs: [
      {
        question: 'What is network security and why is it important?',
        answer: 'Network security involves protecting your network infrastructure from unauthorized access, data breaches, and cyber attacks. It\'s essential for safeguarding sensitive business data, maintaining business continuity, and protecting your reputation from security incidents.'
      },
      {
        question: 'How does network security protect against cyber threats?',
        answer: 'Our network security solutions use multiple layers of protection including firewalls, intrusion detection systems, real-time monitoring, and threat intelligence to detect, prevent, and respond to cyber threats before they can cause damage to your systems.'
      },
      {
        question: 'Can network security solutions be integrated with existing IT infrastructure?',
        answer: 'Yes, our network security solutions are designed for seamless integration with your existing IT infrastructure. We work with your current systems to ensure minimal disruption while providing comprehensive protection across all network components.'
      },
      {
        question: 'What types of businesses need network security services?',
        answer: 'All businesses that rely on network infrastructure need network security, regardless of size. From small businesses to large enterprises, any organization that handles sensitive data, connects to the internet, or uses cloud services requires robust network security protection.'
      },
      {
        question: 'How often should network security be updated and monitored?',
        answer: 'Network security requires continuous monitoring and regular updates. We provide 24/7 monitoring services and ensure your security systems are always updated with the latest threat intelligence and security patches to protect against emerging threats.'
      }
    ]
  },
  'endpoint-security': {
    mainContent: [
      'Our Endpoint Security Solutions protect every device connected to your network, from laptops and desktops to mobile devices and servers. Through advanced threat detection, behavioral analysis, and real-time protection, we ensure all endpoints remain secure against malware, ransomware, and advanced persistent threats. Our comprehensive endpoint protection platform provides centralized management and visibility across your entire device ecosystem.',
      'We deploy next-generation endpoint protection that goes beyond traditional antivirus, using AI-powered detection, application control, and device encryption to secure endpoints at every layer. Designed for modern work environments including remote and hybrid setups, our endpoint security solutions ensure continuous protection regardless of device location or network connection.'
    ],
    whyChooseHeading: 'Why Choose Endpoint Security',
    whyChooseDescription: 'Endpoint Security is critical for protecting your organization\'s devices from cyber threats. With the rise of remote work and BYOD policies, endpoints have become prime targets for attackers. Our solutions provide comprehensive protection that adapts to your business needs and protects against evolving threats.',
    additionalContentHeading: 'Comprehensive Endpoint Protection Solutions',
    additionalContent: [
      'Our endpoint security solutions are designed to provide comprehensive protection for all devices in your organization. We implement multi-layered defense strategies that combine advanced threat detection, behavioral analytics, and automated response to safeguard endpoints from malware, ransomware, and zero-day attacks.',
      'With our expert team and cutting-edge endpoint protection technologies, we ensure your devices remain secure, compliant, and resilient against both known and emerging threats. Our solutions are scalable, easily deployed across all endpoints, and provide continuous protection without impacting device performance or user productivity.'
    ],
    faqs: [
      {
        question: 'What is endpoint security and why is it important?',
        answer: 'Endpoint security involves protecting individual devices (laptops, desktops, mobile devices, servers) from cyber threats. It\'s essential because endpoints are often the entry point for attacks, especially in remote work environments. Comprehensive endpoint protection prevents malware, data breaches, and unauthorized access.'
      },
      {
        question: 'How does endpoint security protect against threats?',
        answer: 'Our endpoint security solutions use multiple layers of protection including next-generation antivirus, behavioral analysis, application control, and device encryption. We detect and block threats in real-time, isolate compromised devices, and provide automated response to prevent threat spread across your network.'
      },
      {
        question: 'Can endpoint security be deployed across remote and hybrid workforces?',
        answer: 'Yes, our endpoint security solutions are designed for modern work environments. They work seamlessly across remote, hybrid, and on-premises setups, providing consistent protection regardless of device location or network connection. Centralized management ensures visibility and control over all endpoints.'
      },
      {
        question: 'What types of devices can be protected with endpoint security?',
        answer: 'Our endpoint security solutions protect all types of devices including Windows, macOS, and Linux desktops and laptops, mobile devices (iOS and Android), servers, and IoT devices. We provide comprehensive protection across your entire device ecosystem.'
      },
      {
        question: 'How does endpoint security impact device performance?',
        answer: 'Our endpoint security solutions are optimized for minimal performance impact. Using lightweight agents and cloud-based analysis, we ensure protection without slowing down devices or disrupting user productivity. Advanced technologies like behavioral analysis reduce the need for resource-intensive scanning.'
      }
    ]
  }
}

// FAQ Component
function ServiceFAQ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)'
    }}>
      {faqs.map((faq, index) => (
        <div key={index} style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          background: activeIndex === index ? 'rgba(249, 0, 77, 0.1)' : 'rgba(255, 255, 255, 0.02)',
          transition: 'all 0.3s ease'
        }}>
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: '100%',
              padding: 'var(--spacing-lg)',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-base)',
              fontWeight: 'var(--font-weight-heading-medium)',
              color: '#ffffff',
              flex: 1,
              paddingRight: 'var(--spacing-md)'
            }}>
              {faq.question}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f9004d"
              strokeWidth="2"
              style={{
                transform: activeIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                flexShrink: 0
              }}
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          {activeIndex === index && (
            <div style={{
              padding: '0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg)',
              animation: 'fadeIn 0.3s ease'
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-base)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: '1.8',
                margin: 0
              }}>
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Get all services from all categories
const getAllServices = () => {
  const serviceCategories = [
    {
      title: 'Core Cybersecurity Services',
      services: [
        { name: 'Network Security', slug: 'network-security', image: '/assets/images/Network Security.webp' },
        { name: 'Endpoint Security', slug: 'endpoint-security', image: '/assets/images/Endpoint Security.webp' },
        { name: 'Cybersecurity Consulting & Strategy', slug: 'cybersecurity-consulting-strategy', image: '/assets/images/Cybersecurity Consulting & Strategy.webp' },
        { name: 'Firewall Management', slug: 'firewall-management', image: '/assets/images/Firewall Management.webp' },
        { name: 'Intrusion Detection & Prevention (IDS/IPS)', slug: 'intrusion-detection-prevention', image: '/assets/images/Intrusion detection.webp' },
        { name: 'Ransomware Protection & Recovery', slug: 'ransomware-protection-recovery', image: '/assets/images/Ransomware Protection.webp' }
      ]
    },
    {
      title: 'AI-Driven & Advanced Security',
      services: [
        { name: 'AI Threat Detection', slug: 'ai-threat-detection', image: '/assets/images/AI Threat Detection.webp' },
        { name: 'Behavioral Analytics', slug: 'behavioral-analytics', image: '/assets/images/Behavioral Analytics.webp' },
        { name: 'Automated Incident Response', slug: 'automated-incident-response', image: '/assets/images/Automated Incident Response.webp' }
      ]
    },
    {
      title: 'Offensive Security',
      services: [
        { name: 'Penetration Testing', slug: 'penetration-testing', image: '/assets/images/Penetration Testing.webp' },
        { name: 'Red Team Operations', slug: 'red-team-operations', image: '/assets/images/Red Team Operations.webp' },
        { name: 'Vulnerability Assessment', slug: 'vulnerability-assessment', image: '/assets/images/Vulnerability Assessment.webp' }
      ]
    },
    {
      title: 'Cloud & Infrastructure Security',
      services: [
        { name: 'Cloud Security (AWS, Azure, GCP)', slug: 'cloud-security', image: '/assets/images/Cloud Security.webp' },
        { name: 'DevSecOps Integration', slug: 'devsecops-integration', image: '/assets/images/DevSecOps.webp' },
        { name: 'Container & Kubernetes Security', slug: 'container-kubernetes-security', image: '/assets/images/Container & Kubernetes Security.webp' }
      ]
    },
    {
      title: 'Monitoring, Response & Recovery',
      services: [
        { name: 'Security Operations Center (SOC)', slug: 'security-operations-center', image: '/assets/images/SOC (24_7).webp' },
        { name: 'Incident Response & Forensics', slug: 'incident-response-forensics', image: '/assets/images/Incident Response & Forensics.webp' },
        { name: 'Malware Analysis & Removal', slug: 'malware-analysis-removal', image: '/assets/images/Malware Analysis.webp' }
      ]
    },
    {
      title: 'Compliance, Risk & Governance',
      services: [
        { name: 'Compliance & Regulatory Security', slug: 'compliance-regulatory-security', image: '/assets/images/Compliance Security.webp' },
        { name: 'Risk Assessment & Management', slug: 'risk-assessment-management', image: '/assets/images/Risk Assessment.webp' },
        { name: 'Security Audits', slug: 'security-audits', image: '/assets/images/Security Audits.webp' }
      ]
    },
    {
      title: 'Human & Business Security',
      services: [
        { name: 'Security Awareness Training', slug: 'security-awareness-training', image: '/assets/images/Security Awareness Training.webp' },
        { name: 'Phishing Simulation', slug: 'phishing-simulation', image: '/assets/images/Phishing Simulation.webp' },
        { name: 'Executive & VIP Cyber Protection', slug: 'executive-vip-cyber-protection', image: '/assets/images/Executive Cyber Protection.webp' }
      ]
    },
    {
      title: 'Specialized & Emerging Services',
      services: [
        { name: 'IoT Security', slug: 'iot-security', image: '/assets/images/IoT Security.webp' },
        { name: 'OT & Industrial Security', slug: 'ot-industrial-security', image: '/assets/images/Industrial Security.webp' },
        { name: 'Digital Forensics', slug: 'digital-forensics', image: '/assets/images/Digital Forensics.webp' }
      ]
    },
    {
      title: 'Advanced Security Frameworks',
      services: [
        { name: 'Social Engineering Testing', slug: 'social-engineering-testing', image: '/assets/images/Social Engineering Testing.webp' },
        { name: 'Zero Trust Architecture', slug: 'zero-trust-architecture', image: '/assets/images/Zero Trust Architecture.webp' }
      ]
    },
    {
      title: 'Additional Security Services',
      services: []
    }
  ]

  return serviceCategories.flatMap(category => category.services)
}

interface ServiceDetailProps {
  service: {
    name: string
    slug: string
    image: string
    description: string
  }
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [relatedServices, setRelatedServices] = useState<any[]>([])
  const content = serviceContent[service.slug] || serviceContent['network-security'] // Fallback to network security

  useEffect(() => {
    // Get current service and 3 other services
    const services = getAllServices()
    const currentService = services.find(s => s.slug === service.slug)
    const filtered = services.filter(s => s.slug !== service.slug)
    const shuffled = filtered.sort(() => 0.5 - Math.random())
    // Put current service first, then add 3 other services
    const servicesList = currentService 
      ? [currentService, ...shuffled.slice(0, 3)]
      : shuffled.slice(0, 4)
    setRelatedServices(servicesList)
  }, [service.slug])

  return (
    <section style={{
      padding: 'var(--spacing-5xl) 0',
      background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.02) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(180, 180, 180, 0.02) 100%)',
      minHeight: '100vh'
    }}>
      <div className="container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: 'var(--spacing-xl)',
          alignItems: 'start',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Left Sidebar - Fixed */}
          <aside style={{
            position: 'sticky',
            top: '100px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-xl)'
          }}>
            {/* Related Services Box */}
            <div style={{
              background: 'rgba(5, 5, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: 'var(--spacing-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: '#ffffff',
                marginBottom: 'var(--spacing-md)',
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(249, 0, 77, 0.1)"/>
                  <path d="M12 8V12M12 16H12.01" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Our Services
              </h3>
              {relatedServices.map((relatedService, index) => {
                const isCurrentService = relatedService.slug === service.slug
                return (
                  <Link
                    key={index}
                    href={`/services/${relatedService.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--spacing-sm)',
                      padding: 'var(--spacing-md)',
                      background: isCurrentService ? 'rgba(249, 0, 77, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isCurrentService ? '1px solid rgba(249, 0, 77, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      color: isCurrentService ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      fontWeight: isCurrentService ? '600' : '400'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentService) {
                        e.currentTarget.style.background = 'rgba(249, 0, 77, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                        e.currentTarget.style.color = '#ffffff'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrentService) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                      }
                    }}
                  >
                    <span>{relatedService.name}</span>
                    {!isCurrentService && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 
                        flexShrink: 0,
                        transform: 'rotate(-45deg)',
                        opacity: 0.7
                      }}>
                        <path d="M4 4L12 12M12 12V4M12 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>
                )
              })}
              <Link
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: 'linear-gradient(135deg, #f9004d 0%, #d6003f 100%)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  marginTop: 'var(--spacing-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff1a5e 0%, #f9004d 100%)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 0, 77, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f9004d 0%, #d6003f 100%)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Explore More Services
              </Link>
            </div>

            {/* CTA Box */}
            <div style={{
              background: 'rgba(5, 5, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: 'var(--spacing-xl)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-heading-medium)',
                color: '#ffffff',
                margin: 0
              }}>
                Ready to Get Started?
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: 0
              }}>
                Contact our elite security team to discuss how we can protect your organization.
              </p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: 'linear-gradient(135deg, #f9004d 0%, #d6003f 100%)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  marginTop: 'var(--spacing-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff1a5e 0%, #f9004d 100%)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 0, 77, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f9004d 0%, #d6003f 100%)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Get Started
              </Link>
            </div>
          </aside>

          {/* Right Main Content */}
          <main style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2xl)',
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            {/* Service Image - Full width with smaller height */}
            <div style={{
              width: '100%',
              height: '480px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  width={1200}
                  height={480}
                  className="service-detail-image"
                />
              </div>
            </div>

            {/* Service Content - Not in box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)'
            }}>
              {/* Main Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)'
              }}>
                {content.mainContent.map((paragraph: string, index: number) => (
                  <p key={index} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-base)',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Why Choose Section */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-lg)'
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 'var(--font-weight-heading-medium)',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: '1.2',
                  marginBottom: 'var(--spacing-sm)',
                  position: 'relative',
                  paddingBottom: 'var(--spacing-sm)'
                }}>
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '25%',
                    height: '3px',
                    background: '#f9004d',
                    borderRadius: '2px'
                  }}></span>
                  {content.whyChooseHeading}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-base)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  {content.whyChooseDescription}
                </p>

                {/* Feature Cards Grid */}
                <div className="feature-cards-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-lg)'
                }}>
                  {/* Card 1 */}
                  <div style={{
                    background: 'rgba(20, 20, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: 'var(--spacing-xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-lg)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f9004d 0%, #ff6b9d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="2"/>
                        <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="white" strokeWidth="2"/>
                        <path d="M12 10V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M10 18H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 8L14 10L12 12L10 10L12 8Z" fill="white" opacity="0.8"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: '0 0 var(--spacing-xs) 0',
                        lineHeight: '1.3'
                      }}>
                        Comprehensive Protection For All Connected Devices
                      </h3>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div style={{
                    background: 'rgba(20, 20, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: 'var(--spacing-xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-lg)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f9004d 0%, #ff6b9d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="6" width="12" height="12" rx="2" stroke="white" strokeWidth="2"/>
                        <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2"/>
                        <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 8L10 10L8 12L6 10L8 8Z" fill="white" opacity="0.8"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: '0 0 var(--spacing-xs) 0',
                        lineHeight: '1.3'
                      }}>
                        24/7 Support & Continuous Security Updates
                      </h3>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div style={{
                    background: 'rgba(20, 20, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: 'var(--spacing-xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-lg)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f9004d 0%, #ff6b9d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="2"/>
                        <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="2"/>
                        <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="2"/>
                        <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="2"/>
                        <circle cx="7" cy="7" r="1.5" fill="white"/>
                        <circle cx="17" cy="7" r="1.5" fill="white"/>
                        <circle cx="7" cy="17" r="1.5" fill="white"/>
                        <circle cx="17" cy="17" r="1.5" fill="white"/>
                        <path d="M10 7H14M10 17H14M7 10V14M17 10V14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="2"/>
                        <path d="M12 10L13 11L12 12L11 11L12 10Z" fill="white" opacity="0.8"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: '0 0 var(--spacing-xs) 0',
                        lineHeight: '1.3'
                      }}>
                        Seamless Integration With Existing IT Systems
                      </h3>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div style={{
                    background: 'rgba(20, 20, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: 'var(--spacing-xl)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-lg)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 0, 77, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f9004d 0%, #ff6b9d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="8" width="16" height="10" rx="2" stroke="white" strokeWidth="2"/>
                        <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="white" strokeWidth="2"/>
                        <path d="M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 18H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 10L14 12L12 14L10 12L12 10Z" fill="white" opacity="0.8"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: '0 0 var(--spacing-xs) 0',
                        lineHeight: '1.3'
                      }}>
                        Scalable Solutions Tailored To Your Business Needs
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Closing Paragraph */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-base)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.8',
                  margin: 'var(--spacing-xl) 0 0 0'
                }}>
                  Our network security services deliver real-time threat detection and proactive defense, safeguarding critical systems and ensuring uninterrupted business operations.
                </p>
              </div>

              {/* Features Section */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-2xl)'
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 'var(--font-weight-heading-medium)',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: '1.2',
                  position: 'relative',
                  paddingBottom: 'var(--spacing-sm)'
                }}>
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '25%',
                    height: '3px',
                    background: '#f9004d',
                    borderRadius: '2px'
                  }}></span>
                  Features of Network Security
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-base)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  Provides advanced threat detection, real-time monitoring, proactive defense, and seamless integration for comprehensive protection of all connected devices, ensuring quick response to threats.
                </p>

                {/* Features Grid */}
                <div className="features-three-icons" style={{
                  display: 'flex',
                  gap: 0,
                  marginTop: 'var(--spacing-xl)'
                }}>
                  {/* Feature 1 */}
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    flex: 1,
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      flexShrink: 0
                    }}>
                      <ImageWithFallback
                        src="/assets/images/cyber-security.png"
                        alt="Advanced Threat Detection"
                        width={56}
                        height={56}
                        className="feature-icon-card"
                      />
                    </div>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      minHeight: '56px'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.3',
                        marginBottom: 0
                      }}>
                        Advanced Threat Detection
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        margin: 0,
                        marginTop: 'var(--spacing-xs)'
                      }}>
                        Protects all connected devices across your network.
                      </p>
                    </div>
                  </div>

                  {/* Vertical Divider 1 */}
                  <div style={{
                    width: '1px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                    marginLeft: 'var(--spacing-xl)',
                    marginRight: 'var(--spacing-xl)',
                    alignSelf: 'stretch',
                    minHeight: '100%'
                  }}></div>

                  {/* Feature 2 */}
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    flex: 1,
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      flexShrink: 0
                    }}>
                      <ImageWithFallback
                        src="/assets/images/time-keeping.png"
                        alt="Real-Time Monitoring"
                        width={56}
                        height={56}
                        className="feature-icon-card"
                      />
                    </div>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      minHeight: '56px'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.3',
                        marginBottom: 0
                      }}>
                        Real-Time Monitoring
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        margin: 0,
                        marginTop: 'var(--spacing-xs)'
                      }}>
                        Protects all connected devices across your network.
                      </p>
                    </div>
                  </div>

                  {/* Vertical Divider 2 */}
                  <div style={{
                    width: '1px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                    marginLeft: 'var(--spacing-xl)',
                    marginRight: 'var(--spacing-xl)',
                    alignSelf: 'stretch',
                    minHeight: '100%'
                  }}></div>

                  {/* Feature 3 */}
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    flex: 1,
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      flexShrink: 0
                    }}>
                      <ImageWithFallback
                        src="/assets/images/secure-data.png"
                        alt="User-Friendly Interface"
                        width={56}
                        height={56}
                        className="feature-icon-card"
                      />
                    </div>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      minHeight: '56px'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 'var(--font-weight-heading-medium)',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.3',
                        marginBottom: 0
                      }}>
                        User-Friendly Interface
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6',
                        margin: 0,
                        marginTop: 'var(--spacing-xs)'
                      }}>
                        Protects all connected devices across your network.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image and Content Section */}
                <div className="image-content-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--spacing-xl)',
                  marginTop: 'var(--spacing-2xl)',
                  alignItems: 'center'
                }}>
                  {/* Left Side - Image */}
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    position: 'relative'
                  }}>
                    <ImageWithFallback
                      src="https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp"
                      alt="Network Security Team"
                      width={600}
                      height={600}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center'
                      }}
                    />
                  </div>

                  {/* Right Side - Content */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 'var(--spacing-lg)'
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-base)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      Provides advanced threat detection, monitoring & proactive defense to secure all devices & prevent malware and ransomware attacks.
                    </p>

                    {/* Features List */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-md)',
                      marginTop: 'var(--spacing-sm)'
                    }}>
                      {/* Feature 1 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                          <rect x="2" y="2" width="16" height="16" rx="2" stroke="#f9004d" strokeWidth="1.5" fill="none"/>
                          <path d="M6 10L9 13L14 7" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 2L6 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                          <path d="M18 2L14 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                        </svg>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.6'
                        }}>
                          Comprehensive Device Coverage
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                          <rect x="2" y="2" width="16" height="16" rx="2" stroke="#f9004d" strokeWidth="1.5" fill="none"/>
                          <path d="M6 10L9 13L14 7" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 2L6 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                          <path d="M18 2L14 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                        </svg>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.6'
                        }}>
                          Automated Threat Response
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                          <rect x="2" y="2" width="16" height="16" rx="2" stroke="#f9004d" strokeWidth="1.5" fill="none"/>
                          <path d="M6 10L9 13L14 7" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 2L6 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                          <path d="M18 2L14 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                        </svg>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.6'
                        }}>
                          Regular Security Updates
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                          <rect x="2" y="2" width="16" height="16" rx="2" stroke="#f9004d" strokeWidth="1.5" fill="none"/>
                          <path d="M6 10L9 13L14 7" stroke="#f9004d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 2L6 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                          <path d="M18 2L14 6" stroke="#f9004d" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                        </svg>
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.6'
                        }}>
                          Scalable And Flexible
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Content Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-lg)'
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.2',
                    marginBottom: 'var(--spacing-sm)',
                    position: 'relative',
                    paddingBottom: 'var(--spacing-sm)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '25%',
                      height: '3px',
                      background: '#f9004d',
                      borderRadius: '2px'
                    }}></span>
                    {content.additionalContentHeading}
                  </h2>
                  {content.additionalContent.map((paragraph: string, index: number) => (
                    <p key={index} style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-base)',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* FAQ Section */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-lg)'
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 'var(--font-weight-heading-medium)',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.2',
                    marginBottom: 'var(--spacing-sm)',
                    position: 'relative',
                    paddingBottom: 'var(--spacing-sm)'
                  }}>
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '25%',
                      height: '3px',
                      background: '#f9004d',
                      borderRadius: '2px'
                    }}></span>
                    Frequently Asked Questions
                  </h2>

                  <ServiceFAQ faqs={content.faqs} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Full Width CTA Section */}
      <div style={{ marginTop: 'var(--spacing-5xl)' }}>
        <WorkWithUs />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Final CTA with Robot */}
      <FinalCTA />

      <style jsx>{`
        .service-detail-image,
        .service-detail-image img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center center !important;
          display: block !important;
        }
        
        .service-detail-image img {
          max-width: 100% !important;
          max-height: 100% !important;
        }

        .feature-icon-card,
        .feature-icon-card img {
          width: 56px !important;
          height: 56px !important;
          object-fit: contain !important;
        }

        @media (max-width: 1024px) {
          section > div > div {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-xl) !important;
          }

          aside {
            position: relative !important;
            top: 0 !important;
            width: 100% !important;
            order: 2 !important;
          }

          main {
            order: 1 !important;
          }

          .feature-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: var(--spacing-3xl) 0 !important;
          }

          section > div.container {
            padding: 0 16px !important;
          }

          section > div > div {
            gap: var(--spacing-lg) !important;
          }

          aside {
            gap: var(--spacing-lg) !important;
          }

          aside > div {
            padding: var(--spacing-lg) !important;
            border-radius: 16px !important;
          }

          aside h3 {
            font-size: 1.1rem !important;
          }

          main {
            gap: var(--spacing-xl) !important;
          }

          main > div:first-child {
            height: 350px !important;
            margin: 0 !important;
            border-radius: 16px !important;
            padding: 0 !important;
          }

          main > div:first-child > div {
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .service-detail-image,
          .service-detail-image img {
            margin: 0 !important;
            padding: 0 !important;
          }

          .feature-cards-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-md) !important;
          }

          .feature-cards-grid > div {
            padding: var(--spacing-lg) !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--spacing-md) !important;
          }

          .feature-cards-grid > div > div:first-child {
            width: 56px !important;
            height: 56px !important;
          }

          .feature-cards-grid > div h3 {
            font-size: 1.1rem !important;
          }

          /* Features section with 3 icons - stack on mobile */
          .features-three-icons {
            flex-direction: column !important;
            gap: var(--spacing-lg) !important;
          }

          .features-three-icons > div[style*="display: flex"] {
            flex-direction: row !important;
            gap: var(--spacing-md) !important;
          }

          .features-three-icons > div[style*="width: 1px"] {
            display: none !important;
          }

          /* Image and content grid - stack on mobile */
          .image-content-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-lg) !important;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: var(--spacing-2xl) 0 !important;
          }

          section > div.container {
            padding: 0 12px !important;
          }

          aside > div {
            padding: var(--spacing-md) !important;
            border-radius: 12px !important;
          }

          aside h3 {
            font-size: 1rem !important;
            margin-bottom: var(--spacing-sm) !important;
          }

          aside a {
            padding: var(--spacing-sm) var(--spacing-md) !important;
            font-size: 0.9rem !important;
          }

          main {
            gap: var(--spacing-lg) !important;
          }

          main > div:first-child {
            height: 250px !important;
            border-radius: 12px !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          main > div:first-child > div {
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .service-detail-image,
          .service-detail-image img {
            margin: 0 !important;
            padding: 0 !important;
          }

          .feature-cards-grid {
            gap: var(--spacing-sm) !important;
          }

          .feature-cards-grid > div {
            padding: var(--spacing-md) !important;
            border-radius: 16px !important;
          }

          .feature-cards-grid > div > div:first-child {
            width: 48px !important;
            height: 48px !important;
          }

          .feature-cards-grid > div h3 {
            font-size: 1rem !important;
          }

          main h2 {
            font-size: 1.5rem !important;
            padding-bottom: var(--spacing-xs) !important;
          }

          main p {
            font-size: 0.9rem !important;
            line-height: 1.7 !important;
          }

          /* Features three icons - mobile */
          .features-three-icons {
            gap: var(--spacing-md) !important;
          }

          .features-three-icons > div[style*="display: flex"] {
            gap: var(--spacing-sm) !important;
          }

          .features-three-icons > div[style*="display: flex"] > div:first-child {
            width: 48px !important;
            height: 48px !important;
          }

          .features-three-icons h3 {
            font-size: 1.1rem !important;
          }

          .features-three-icons p {
            font-size: 0.85rem !important;
          }

          /* Image content grid - mobile */
          .image-content-grid {
            gap: var(--spacing-md) !important;
          }

          .image-content-grid > div:first-child {
            aspect-ratio: 1 / 1 !important;
          }

          .image-content-grid p {
            font-size: 0.9rem !important;
          }

          .image-content-grid svg {
            width: 18px !important;
            height: 18px !important;
          }

          .image-content-grid span {
            font-size: 0.9rem !important;
          }

          /* FAQ Section - mobile */
          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] h2 {
            font-size: 1.5rem !important;
          }

          /* Service FAQ component - mobile */
          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] > div > div {
            border-radius: 12px !important;
          }

          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] > div > div > button {
            padding: var(--spacing-md) !important;
          }

          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] > div > div > button > span {
            font-size: 0.9rem !important;
            padding-right: var(--spacing-sm) !important;
          }

          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] > div > div > div[style*="padding"] {
            padding: 0 var(--spacing-md) var(--spacing-md) var(--spacing-md) !important;
          }

          main > div > div[style*="marginTop: 'var(--spacing-lg)'"] > div > div > div[style*="padding"] > p {
            font-size: 0.85rem !important;
            line-height: 1.7 !important;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
