'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParticleAnimation } from '@/hooks/useParticleAnimation'
import ImageWithFallback from './ImageWithFallback'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleAnimation(canvasRef)

  return (
    <section className="hero" id="hero" role="region" aria-label="Hero section">
      <div className="hero__background">
        <ImageWithFallback 
          src="/assets/images/hero-globe.svg" 
          alt="" 
          className="hero__globe"
          loading="eager"
        />
        <div className="hero__overlay"></div>
        <canvas 
          ref={canvasRef}
          className="hero__particles" 
          id="particlesCanvas" 
          aria-hidden="true"
        ></canvas>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <div className="hero__left fade-in-left">
            <span className="hero__eyebrow shimmer-text fade-in-down">Unbeatable Protection</span>
            <h1 className="hero__title fade-in-up-delay-1">
              Cyber Assassin, Your <span className="hero__gradient">Cybersecurity Guardian</span>
            </h1>
            <p className="hero__subtitle fade-in-up-delay-2">
              Fortify Your Defenses: Cyber Assassin, your shield against digital threats with advanced cybersecurity prowess.
            </p>
            <div className="hero__actions fade-in-up-delay-3">
              <Link href="/contact" className="btn btn--primary">
                Get Consultation
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services" className="btn btn--secondary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2L15 5V11C15 13.76 12.76 16 9 17C5.24 16 3 13.76 3 11V5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M7 9L8.5 10.5L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get Secured
              </Link>
            </div>
          </div>

          <div className="hero__right">
            <div className="floating-cards">
              <div className="floating-cards__card floating-cards__card--1" role="img" aria-label="Active Cyber Defense Card">
                <div className="floating-cards__icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L28 10V18C28 23.52 23.52 28 16 30C8.48 28 4 23.52 4 18V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="floating-cards__title">Active Cyber Defense</h3>
                <p className="floating-cards__text">
                  Always-on protection powered by advanced threat intelligence, ethical hacking techniques, and rapid response protocols.
                </p>
                <div className="floating-cards__status">
                  <span className="floating-cards__status-dot"></span>
                  <span>Active Protection</span>
                </div>
              </div>

              <div className="floating-cards__card floating-cards__card--2" role="img" aria-label="Advanced Security Intelligence Card">
                <div className="floating-cards__icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="18" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="13" y="12" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="20" y="6" width="6" height="22" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="floating-cards__title">Advanced Security Intelligence</h3>
                <p className="floating-cards__text">
                  Deep, actionable insights into your infrastructure, vulnerabilities, and risk exposure — enabling smarter, stronger security decisions.
                </p>
              </div>

              <div className="floating-cards__card floating-cards__card--3" role="img" aria-label="Real-Time Threat Elimination Card">
                <div className="floating-cards__icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M11 12H21M11 16H21M11 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="floating-cards__title">Real-Time Threat Elimination</h3>
                <p className="floating-cards__text">
                  AI-driven surveillance that detects, analyzes, and neutralizes cyber threats before they can breach your systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

