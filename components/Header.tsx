'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHeaderNavigation } from '@/hooks/useHeaderNavigation'
import ImageWithFallback from './ImageWithFallback'

// Services data for mega menu
const serviceCategories = [
  {
    title: 'Core Cybersecurity',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
    ),
    services: [
      { name: 'Network Security', slug: 'network-security' },
      { name: 'Endpoint Security', slug: 'endpoint-security' },
      { name: 'Cybersecurity Consulting', slug: 'cybersecurity-consulting-strategy' },
      { name: 'Firewall Management', slug: 'firewall-management' },
      { name: 'Intrusion Detection (IDS/IPS)', slug: 'intrusion-detection-prevention' },
      { name: 'Ransomware Protection', slug: 'ransomware-protection-recovery' }
    ]
  },
  {
    title: 'AI & Advanced Security',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="9"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
        <line x1="12" y1="3" x2="12" y2="9"></line>
        <line x1="12" y1="15" x2="12" y2="21"></line>
      </svg>
    ),
    services: [
      { name: 'AI Threat Detection', slug: 'ai-threat-detection' },
      { name: 'Behavioral Analytics', slug: 'behavioral-analytics' },
      { name: 'Automated Incident Response', slug: 'automated-incident-response' }
    ]
  },
  {
    title: 'Offensive Security',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    services: [
      { name: 'Penetration Testing', slug: 'penetration-testing' },
      { name: 'Red Team Operations', slug: 'red-team-operations' },
      { name: 'Vulnerability Assessment', slug: 'vulnerability-assessment' }
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
    services: [
      { name: 'Cloud Security (AWS, Azure, GCP)', slug: 'cloud-security' },
      { name: 'DevSecOps Integration', slug: 'devsecops-integration' },
      { name: 'Container & Kubernetes Security', slug: 'container-kubernetes-security' }
    ]
  },
  {
    title: 'Monitoring & Response',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    services: [
      { name: 'Security Operations Center (SOC)', slug: 'security-operations-center' },
      { name: 'Incident Response & Forensics', slug: 'incident-response-forensics' },
      { name: 'Malware Analysis & Removal', slug: 'malware-analysis-removal' }
    ]
  },
  {
    title: 'Compliance & Risk',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    services: [
      { name: 'Compliance & Regulatory Security', slug: 'compliance-regulatory-security' },
      { name: 'Risk Assessment & Management', slug: 'risk-assessment-management' },
      { name: 'Security Audits', slug: 'security-audits' }
    ]
  },
  {
    title: 'Human & Business Security',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    services: [
      { name: 'Security Awareness Training', slug: 'security-awareness-training' },
      { name: 'Phishing Simulation', slug: 'phishing-simulation' },
      { name: 'Executive & VIP Protection', slug: 'executive-vip-cyber-protection' }
    ]
  },
  {
    title: 'Specialized Services',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
    ),
    services: [
      { name: 'IoT Security', slug: 'iot-security' },
      { name: 'OT & Industrial Security', slug: 'ot-industrial-security' },
      { name: 'Digital Forensics', slug: 'digital-forensics' }
    ]
  },
  {
    title: 'Advanced Frameworks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    services: [
      { name: 'Social Engineering Testing', slug: 'social-engineering-testing' },
      { name: 'Zero Trust Architecture', slug: 'zero-trust-architecture' }
    ]
  }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const pathname = usePathname()
  const { scrolled } = useHeaderNavigation()
  const servicesMenuRef = useRef<HTMLLIElement>(null)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Reset active category when menu opens
  useEffect(() => {
    if (isServicesOpen) {
      setActiveCategory(0)
    }
  }, [isServicesOpen])

  // Close services menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServicesOpen])

  // Handle mouse leave with delay
  const handleServicesMouseLeave = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 200)
  }

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleNavClick = () => {
    closeMenu()
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header" role="banner">
      <div className="header__container">
        <div className="header__wrapper">
          <Link href="/" className="header__logo" aria-label="CyberAssassin Home">
            <ImageWithFallback 
              src="/assets/images/logo.png" 
              alt="CyberAssassin Logo" 
              className="header__logo-img"
              loading="eager"
            />
            <span className="header__brand"></span>
          </Link>

          <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`} id="mainNav" role="navigation" aria-label="Main navigation">
            <div className="header__menu-container">
              <ul className="header__menu">
                <li>
                  <Link 
                    href="/" 
                    className={`header__link ${isActive('/') && pathname === '/' ? 'header__link--active' : ''}`} 
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className={`header__link ${isActive('/about') ? 'header__link--active' : ''}`} 
                    onClick={handleNavClick}
                  >
                    About
                  </Link>
                </li>
                <li 
                  className="header__dropdown" 
                  ref={servicesMenuRef}
                  onMouseEnter={(e) => {
                    // Only enable hover on desktop (width > 1024px)
                    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
                      handleServicesMouseEnter()
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Only enable hover on desktop (width > 1024px)
                    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
                      handleServicesMouseLeave()
                    }
                  }}
                >
                  <Link
                    href="/services"
                    className={`header__link header__dropdown-toggle ${isActive('/services') ? 'header__link--active' : ''}`}
                    onClick={(e) => {
                      // On mobile/tablet, toggle dropdown menu instead of navigating
                      if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
                        e.preventDefault()
                        setIsServicesOpen(!isServicesOpen)
                      }
                      // On desktop, navigate to services page (hover already opens mega menu)
                    }}
                    aria-expanded={isServicesOpen}
                  >
                    Services
                    <svg 
                      className="header__dropdown-icon" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Link>
                  {/* Mobile Dropdown Menu */}
                  <div className={`header__dropdown-menu ${isServicesOpen ? 'active' : ''}`}>
                    <Link
                      href="/services"
                      className="header__dropdown-link"
                      onClick={() => {
                        setIsServicesOpen(false)
                        handleNavClick()
                      }}
                    >
                      View All Services
                    </Link>
                    {serviceCategories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/services#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="header__dropdown-link"
                        onClick={() => {
                          setIsServicesOpen(false)
                          handleNavClick()
                        }}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                  {/* Desktop Mega Menu */}
                  <div className={`header__mega-menu ${isServicesOpen && typeof window !== 'undefined' && window.innerWidth > 1024 ? 'active' : ''}`}>
                    <div className="header__mega-menu-content">
                      <div className="header__mega-menu-layout">
                        {/* Side Tabs */}
                        <div className="header__mega-menu-tabs">
                          {serviceCategories.map((category, index) => (
                            <button
                              key={index}
                              className={`header__mega-menu-tab ${activeCategory === index ? 'active' : ''}`}
                              onClick={() => setActiveCategory(index)}
                              onMouseEnter={() => setActiveCategory(index)}
                            >
                              <span className="header__mega-menu-tab-icon">{category.icon}</span>
                              <span className="header__mega-menu-tab-title">{category.title}</span>
                            </button>
                          ))}
                        </div>
                        
                        {/* Content Area */}
                        <div className="header__mega-menu-panel">
                          {serviceCategories[activeCategory] && (
                            <>
                              <div className="header__mega-menu-panel-header">
                                <span className="header__mega-menu-panel-icon">{serviceCategories[activeCategory].icon}</span>
                                <h3 className="header__mega-menu-panel-title">{serviceCategories[activeCategory].title}</h3>
                              </div>
                              <ul className="header__mega-menu-panel-list">
                                {serviceCategories[activeCategory].services.map((service, serviceIndex) => (
                                  <li key={serviceIndex} style={{ 
                                    gridColumn: serviceIndex % 2 === 0 ? '1' : '2',
                                    order: serviceIndex + 1
                                  }}>
                                    <Link 
                                      href={`/services/${service.slug}`}
                                      className="header__mega-menu-panel-link"
                                      onClick={() => {
                                        setIsServicesOpen(false)
                                        handleNavClick()
                                      }}
                                    >
                                      {service.name}
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                      </svg>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="header__mega-menu-footer">
                        <Link 
                          href="/services" 
                          className="header__mega-menu-view-all"
                          onClick={() => {
                            setIsServicesOpen(false)
                            handleNavClick()
                          }}
                        >
                          View All Services
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className={`header__link ${isActive('/blog') ? 'header__link--active' : ''}`} 
                    onClick={handleNavClick}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
              <div className="header__mobile-cta">
                <Link href="/contact" className="header__cta" onClick={closeMenu}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__cta-icon">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <line x1="8" y1="10" x2="16" y2="10"></line>
                    <line x1="8" y1="14" x2="12" y2="14"></line>
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>

          <div className="header__actions">
            <Link href="/contact" className="header__cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__cta-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="8" y1="10" x2="16" y2="10"></line>
                <line x1="8" y1="14" x2="12" y2="14"></line>
              </svg>
              Contact Us
            </Link>
          </div>

          <button 
            className={`header__hamburger ${isMenuOpen ? 'active' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mainNav"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div 
        className={`header__mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        id="mobileOverlay"
        onClick={closeMenu}
      ></div>
    </header>
  )
}

