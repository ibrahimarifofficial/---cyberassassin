'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCounterAnimation } from '@/hooks/useCounterAnimation'

const features = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 40C18 35 22 32 28 32C34 32 38 35 38 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Tailored Security Solutions',
    description: 'Every business is unique, and so are our defenses. We design strategies custom-fit to your specific needs.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="15" width="32" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 22H44M20 15V12M36 15V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="28" x2="34" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Advanced Technology',
    description: 'We deploy the latest tools and cutting-edge technologies to protect your digital environment.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="28" r="11" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="28" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="28" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'Real-Time Threat Detection',
    description: 'Stay ahead of cyber attackers with proactive, 24/7 threat monitoring and response systems.',
  },
]

const stats = [
  { count: 4050, label: 'Satisfied Clients', suffix: '+' },
  { count: 150, label: 'Finish Projects', suffix: '+' },
  { count: 90, label: 'Business Growth', suffix: '%' },
  { count: 24, label: 'Security Monitoring', suffix: '/7' },
]

export default function WhyChooseUs() {
  const statsRef = useRef<HTMLDivElement>(null)
  useCounterAnimation(statsRef, stats)

  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="container">
        <div className="why-choose-us__container">
          <div className="why-choose-us__header">
            <div className="why-choose-us__eyebrow">
              <span className="shimmer-text">Why Choose <span className="why-choose-gradient">Us</span></span>
            </div>
          </div>

          <h2 className="why-choose-us__title">
            Trusted experts committed to securing <span className="why-choose-gradient">your digital</span> <span className="why-choose-gradient">future</span>
          </h2>

          <div className="why-choose-us__grid">
            {features.map((feature, index) => (
              <div key={index} className="why-choose-us__feature">
                <div className="why-choose-us__icon">{feature.icon}</div>
                <h3 className="why-choose-us__feature-title">{feature.title}</h3>
                <p className="why-choose-us__feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="why-choose-us__cta">
            <span className="why-choose-us__badge">Get Started</span>
            <span className="why-choose-us__cta-text">Let's build a secure digital future together.</span>
            <Link href="/contact" className="why-choose-us__cta-link">Get Your Free Quote</Link>
          </div>

          <div className="why-choose-us__stats" ref={statsRef}>
            {stats.map((stat, index) => (
              <div key={index} className="why-choose-us__stat">
                <div className="why-choose-us__stat-number" data-count={stat.count}>0{stat.suffix}</div>
                <div className="why-choose-us__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


