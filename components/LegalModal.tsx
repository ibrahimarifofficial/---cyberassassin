'use client'

import { useState, useEffect } from 'react'

export default function LegalModal() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  useEffect(() => {
    const handlePrivacyClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === 'privacyTrigger') {
        e.preventDefault()
        setPrivacyOpen(true)
      }
    }

    const handleTermsClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === 'termsTrigger') {
        e.preventDefault()
        setTermsOpen(true)
      }
    }

    document.addEventListener('click', handlePrivacyClick)
    document.addEventListener('click', handleTermsClick)

    return () => {
      document.removeEventListener('click', handlePrivacyClick)
      document.removeEventListener('click', handleTermsClick)
    }
  }, [])

  useEffect(() => {
    if (privacyOpen || termsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [privacyOpen, termsOpen])

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      {/* Privacy Policy Modal */}
      <div className={`legal-modal ${privacyOpen ? 'active' : ''}`} id="privacyModal" role="dialog" aria-labelledby="privacyModalTitle" aria-hidden={!privacyOpen}>
        <div className="legal-modal__overlay" onClick={() => setPrivacyOpen(false)}></div>
        <div className="legal-modal__container">
          <button className="legal-modal__close" onClick={() => setPrivacyOpen(false)} aria-label="Close privacy policy modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="legal-modal__header">
            <h2 className="legal-modal__title" id="privacyModalTitle">Privacy Policy</h2>
            <p className="legal-modal__updated">Last updated: <span id="privacyDate">{currentDate}</span></p>
          </div>
          <div className="legal-modal__content">
            <h3>1. Information We Collect</h3>
            <p>We collect information that you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when contacting us or using our services.</p>
            
            <h3>2. How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our cybersecurity services, respond to your inquiries, send you technical updates and security alerts, and comply with legal obligations.</p>
            
            <h3>3. Information Sharing</h3>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist us in operating our business, conducting our services, or serving our users, provided they agree to keep this information confidential.</p>
            
            <h3>4. Data Security</h3>
            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            
            <h3>5. Your Rights</h3>
            <p>You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving marketing communications from us by following the unsubscribe instructions in our emails.</p>
            
            <h3>6. Cookies and Tracking</h3>
            <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h3>7. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
            
            <h3>8. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@cyberassassin.com">privacy@cyberassassin.com</a>.</p>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <div className={`legal-modal ${termsOpen ? 'active' : ''}`} id="termsModal" role="dialog" aria-labelledby="termsModalTitle" aria-hidden={!termsOpen}>
        <div className="legal-modal__overlay" onClick={() => setTermsOpen(false)}></div>
        <div className="legal-modal__container">
          <button className="legal-modal__close" onClick={() => setTermsOpen(false)} aria-label="Close terms of service modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="legal-modal__header">
            <h2 className="legal-modal__title" id="termsModalTitle">Terms of Service</h2>
            <p className="legal-modal__updated">Last updated: <span id="termsDate">{currentDate}</span></p>
          </div>
          <div className="legal-modal__content">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using CyberAssassin's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.</p>
            
            <h3>2. Services Description</h3>
            <p>CyberAssassin provides AI-driven cybersecurity solutions, including threat detection, vulnerability assessment, incident response, and tailored security strategies. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
            
            <h3>3. User Responsibilities</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use our services only for lawful purposes and in accordance with these Terms of Service.</p>
            
            <h3>4. Intellectual Property</h3>
            <p>All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of CyberAssassin and are protected by international copyright, trademark, and other intellectual property laws.</p>
            
            <h3>5. Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, CyberAssassin shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
            
            <h3>6. Indemnification</h3>
            <p>You agree to defend, indemnify, and hold harmless CyberAssassin and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our services.</p>
            
            <h3>7. Termination</h3>
            <p>We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.</p>
            
            <h3>8. Governing Law</h3>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which CyberAssassin operates, without regard to its conflict of law provisions.</p>
            
            <h3>9. Changes to Terms</h3>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
            
            <h3>10. Contact Information</h3>
            <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@cyberassassin.com">legal@cyberassassin.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}


