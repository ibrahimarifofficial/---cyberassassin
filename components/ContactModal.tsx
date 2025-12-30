'use client'

import { useState, useEffect } from 'react'
import { useContactModal } from '@/hooks/useContactModal'

export default function ContactModal() {
  const { isOpen, open, close } = useContactModal()

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
        close()
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      // Contact form error handled below
      setSubmitError('An error occurred. Please try again.')
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`contact-modal ${isOpen ? 'active' : ''}`} id="contactModal" role="dialog" aria-labelledby="contactModalTitle" aria-hidden={!isOpen}>
      <div className="contact-modal__overlay" onClick={close}></div>
      <div className="contact-modal__container">
        <button className="contact-modal__close" onClick={close} aria-label="Close contact modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="contact-modal__header">
          <span className="contact-modal__eyebrow">Get In Touch</span>
          <h2 className="contact-modal__title" id="contactModalTitle">Contact Us</h2>
        </div>

        <div className="contact-modal__content">
          <form className="contact-modal__form" onSubmit={handleSubmit}>
            <div className="contact-modal__form-group">
              <label htmlFor="contactName" className="contact-modal__label">Full Name *</label>
              <input type="text" id="contactName" name="name" className="contact-modal__input" placeholder="Enter your full name" required />
            </div>

            <div className="contact-modal__form-group">
              <label htmlFor="contactEmail" className="contact-modal__label">Email Address *</label>
              <input type="email" id="contactEmail" name="email" className="contact-modal__input" placeholder="your.email@example.com" required />
            </div>

            <div className="contact-modal__form-group">
              <label htmlFor="contactPhone" className="contact-modal__label">Phone Number</label>
              <input type="tel" id="contactPhone" name="phone" className="contact-modal__input" placeholder="+1 (555) 123-4567" />
            </div>

            <div className="contact-modal__form-group">
              <label htmlFor="contactSubject" className="contact-modal__label">Subject *</label>
              <input type="text" id="contactSubject" name="subject" className="contact-modal__input" placeholder="What is this regarding?" required />
            </div>

            <div className="contact-modal__form-group">
              <label htmlFor="contactMessage" className="contact-modal__label">Message *</label>
              <textarea id="contactMessage" name="message" className="contact-modal__textarea" placeholder="Tell us about your cybersecurity needs..." required></textarea>
            </div>

            {submitSuccess && (
              <div className="contact-modal__message contact-modal__message--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Your message has been sent successfully! We will get back to you soon.</span>
              </div>
            )}
            {submitError && (
              <div className="contact-modal__message contact-modal__message--error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{submitError}</span>
              </div>
            )}
            <button type="submit" className="contact-modal__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 9H14M14 9L10 5M14 9L10 13"></path>
              </svg>
            </button>
          </form>

          <div className="contact-modal__info">
            <div>
              <h3 className="contact-modal__info-title">Contact Information</h3>
              <p className="contact-modal__info-description">
                Reach out to our cybersecurity experts. We're here to help protect your digital assets.
              </p>
            </div>

            <div className="contact-modal__info-item">
              <div className="contact-modal__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-modal__info-content">
                <div className="contact-modal__info-label">Address</div>
                <div className="contact-modal__info-value">
                  123 Cyber Security Avenue<br />
                  Digital District, DC 20001<br />
                  United States
                </div>
              </div>
            </div>

            <div className="contact-modal__info-item">
              <div className="contact-modal__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-modal__info-content">
                <div className="contact-modal__info-label">Phone</div>
                <div className="contact-modal__info-value">
                  <a href="tel:+15551234567">+1 (555) 123-4567</a><br />
                  <a href="tel:+15551234568">+1 (555) 123-4568</a>
                </div>
              </div>
            </div>

            <div className="contact-modal__info-item">
              <div className="contact-modal__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-modal__info-content">
                <div className="contact-modal__info-label">Email</div>
                <div className="contact-modal__info-value">
                  <a href="mailto:info@cyberassassin.com">info@cyberassassin.com</a><br />
                  <a href="mailto:support@cyberassassin.com">support@cyberassassin.com</a>
                </div>
              </div>
            </div>

            <div className="contact-modal__info-item">
              <div className="contact-modal__info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="contact-modal__info-content">
                <div className="contact-modal__info-label">Business Hours</div>
                <div className="contact-modal__info-value">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </div>
              </div>
            </div>

            <div className="contact-modal__social">
              <a href="https://linkedin.com" className="contact-modal__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="contact-modal__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://github.com" className="contact-modal__social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


