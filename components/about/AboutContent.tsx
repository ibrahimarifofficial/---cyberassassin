'use client'

import ImageWithFallback from '../ImageWithFallback'
import Link from 'next/link'

interface AboutContentProps {
  showMissionVision?: boolean
  eyebrow?: string
  title?: string
  id?: string
  headingId?: string
}

export default function AboutContent(props: AboutContentProps = {}) {
  const {
    showMissionVision = false, 
    eyebrow = "About us",
    title = "Elite Cybersecurity Firm",
    id = "about-content",
    headingId = "about-content-heading"
  } = props
  const features = [
    'Expert Cybersecurity Consulting',
    'Advanced Threat Detection',
    'Data Privacy and Compliance',
    'Vulnerability Assessment',
    'Incident Response and Recovery',
    'Customized Security Solutions',
  ]

  return (
    <section className="about" id={id} role="region" aria-labelledby={headingId} style={{ position: 'relative', paddingTop: 'var(--spacing-5xl)' }}>
      <div className="about__gradient"></div>
      <div className="about__corner-glow"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about__content">
          <div className="about__image-wrapper fade-in-right">
            <div className="about__image-container">
              <ImageWithFallback 
                src="/assets/images/about.webp" 
                alt="Cybersecurity Innovation" 
                className="about__image"
                loading="lazy"
              />
              <div className="about__badge scale-in-delay-1">
                <ImageWithFallback 
                  src="/assets/images/achievement-award-badge-svgrepo-com.svg" 
                  alt="Badge" 
                  className="about__badge-icon"
                />
                <div className="about__badge-content">
                  <strong>Trusted By 5k</strong>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about__text fade-in-left">
            <span className="about__eyebrow shimmer-text fade-in-down">{eyebrow}</span>
            <h2 className="about__title fade-in-up-delay-1" id={headingId}>{title}</h2>
            <p className="about__description">
              Cyber Assassin is an elite cybersecurity firm built to defend, detect, and dominate digital threats.
              Backed by a highly skilled security task force and next-generation technology, we deliver precision-driven 
              cybersecurity solutions designed to protect critical systems, secure sensitive data, and stay ahead of 
              evolving cyber attacks.
            </p>
            <p className="about__description">
              <b><i>We don't just meet expectations</i></b>, we eliminate risk before it becomes a threat.
            </p>
            
            <div className="about__features">
              <div className="about__features-col">
                {features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="about__feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="currentColor"/>
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="about__features-col">
                {features.slice(3).map((feature, i) => (
                  <div key={i} className="about__feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" fill="currentColor"/>
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__bottom">
              <Link href="/services" className="btn btn--primary about__btn">
                What We Provide
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <div className="about__author">
                <ImageWithFallback 
                  src="https://i.pravatar.cc/80?img=12" 
                  alt="Andy Dufren" 
                  className="about__author-img"
                />
                <div className="about__author-info">
                  <strong>Andy Dufren</strong>
                  <span>CEO, Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showMissionVision && (
          <div className="about__mission-vision">
            <h2 className="about__mission-title">
              We deliver AI-driven cybersecurity solutions that help your business grow, strengthening your digital presence and building a trusted security 
              <span className="about__gradient-text"> brand with precision</span>
            </h2>

            <div className="about__mission-content">
              <div className="about__experience">
                <div className="about__experience-number">11+</div>
                <p className="about__experience-text">Years Of Work Experience</p>
              </div>

              <div className="about__mission-item about__mission-item--with-description">
                <div className="about__mission-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="4" fill="currentColor"/>
                    <path d="M24 4V8M24 40V44M4 24H8M40 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="about__mission-heading">Our Mission</h3>
                <p className="about__mission-text">
                  At the core of our mission is the belief that every organization deserves tailored, intelligent cybersecurity powered by advanced AI.
                </p>
                <p className="about__mission-description">
                  We focus on empowering businesses with innovative, AI-enhanced security solutions designed to support growth and establish long-term trust. By combining precision, expertise, and next-gen AI strategies, we help organizations stay protected in an evolving digital threat landscape.
                </p>
              </div>

              <div className="about__mission-item">
                <div className="about__mission-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 20L8 18M44 20L40 18M4 28L8 30M44 28L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="about__mission-heading">Our Vision</h3>
                <p className="about__mission-text">
                  Our vision is to redefine cybersecurity with AI-driven solutions that evolve to neutralize emerging threats.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

