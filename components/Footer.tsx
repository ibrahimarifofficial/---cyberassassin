'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import ImageWithFallback from './ImageWithFallback'

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const year = new Date().getFullYear()
    const yearElement = document.getElementById('currentYear')
    if (yearElement) {
      yearElement.textContent = year.toString()
    }
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string

      if (!email || !email.trim()) {
        setSubmitError('Please enter a valid email address')
        setIsSubmitting(false)
        return
      }

      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      // Read response once as text
      const responseText = await response.text()
      let result = null
      
      // Try to parse JSON
      if (responseText) {
        try {
          result = JSON.parse(responseText)
        } catch {
          // If parsing fails, result stays null - that's okay
        }
      }

      // Check response status
      if (!response.ok) {
        // Error response
        const errorMessage = result?.error || `Failed to subscribe (${response.status}). Please try again.`
        setSubmitError(errorMessage)
        setSubmitSuccess(false)
        setIsSubmitting(false)
        return
      }

      // Success response - response.ok is true
      // Subscription was successful regardless of JSON parsing
      setSubmitSuccess(true)
      setSubmitError('')
      // Reset form if it exists
      try {
        if (e.currentTarget) {
          e.currentTarget.reset()
        } else if (formRef.current) {
          formRef.current.reset()
        }
      } catch (resetError) {
        // Form reset error (non-critical, can be ignored)
        // Form reset failed but subscription succeeded, so continue
      }
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
      setIsSubmitting(false)
      return // Return early to prevent catch block from running
      
    } catch (error: any) {
      // Check if this is a network error
      if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        setSubmitError('Network error. Please check your connection and try again.')
      } else if (error.message) {
        // Only show error if it's not related to JSON parsing after successful response
        setSubmitError(`Error: ${error.message}`)
      } else {
        // Generic error
        setSubmitError('An error occurred. Please try again.')
      }
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__column footer__column--brand">
            <Link href="/" className="footer__logo" aria-label="CyberAssassin Home">
              <ImageWithFallback 
                src="/assets/images/logo.png" 
                alt="CyberAssassin Logo"
                className="footer__logo-img"
              />
            </Link>
            <p className="footer__tagline">
              We are committed to provide best cyber security services with the help of our legendary team.
            </p>
            <div className="footer__social">
              <a href="https://linkedin.com" className="footer__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.667 0H3.333C1.492 0 0 1.492 0 3.333v13.334C0 18.508 1.492 20 3.333 20h13.334C18.508 20 20 18.508 20 16.667V3.333C20 1.492 18.508 0 16.667 0zM6.667 16.667H3.333V6.667h3.334v10zM5 5.5c-1.013 0-1.833-.82-1.833-1.833S3.987 1.833 5 1.833 6.833 2.653 6.833 3.667 6.013 5.5 5 5.5zm11.667 11.167h-3.334v-5c0-1.192-.025-2.725-1.658-2.725-1.658 0-1.917 1.3-1.917 2.642v5.083H6.667V6.667h3.208v1.367h.042c.45-.842 1.55-1.725 3.183-1.725 3.392 0 4.025 2.233 4.025 5.133v5.225z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 3.925a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 011.392 2.498a4.106 4.106 0 001.27 5.478 4.072 4.072 0 01-1.86-.513v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.293a11.616 11.616 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.341 8.341 0 0020 3.925z"/>
                </svg>
              </a>
              <a href="https://github.com" className="footer__social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><a href="/#why-choose-us">Why Choose Us</a></li>
              <li><a href="/#testimonials">Testimonials</a></li>
              <li><a href="/#faq">FAQ</a></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Legal</h3>
            <ul className="footer__links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Stay Updated</h3>
            <p className="footer__newsletter-text">Subscribe to our newsletter for the latest security insights and updates.</p>
            <form ref={formRef} className="footer__newsletter" aria-label="Newsletter subscription" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
              <input 
                type="email" 
                id="newsletter-email" 
                name="email"
                placeholder="Enter your email" 
                required
                aria-required="true"
                disabled={isSubmitting}
              />
              <button type="submit" aria-label="Subscribe to newsletter" disabled={isSubmitting}>
                {isSubmitting ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinning">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                      <animate attributeName="stroke-dasharray" dur="1.5s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="1.5s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </form>
            {submitSuccess && (
              <p className="footer__newsletter-message footer__newsletter-message--success">
                ✓ Successfully subscribed to our newsletter!
              </p>
            )}
            {submitError && (
              <p className="footer__newsletter-message footer__newsletter-message--error">
                {submitError}
              </p>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">Copyright <span id="currentYear">{new Date().getFullYear()}</span> CyberAssassin All right reserved</p>
          <div className="footer__certifications">
            <span>ISO 27001 Certified</span>
            <span>SOC 2 Type II</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

