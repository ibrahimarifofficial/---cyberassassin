'use client'

import Link from 'next/link'

export default function BlogHelpBox() {
  return (
    <div className="blog-help-box">
      <div className="blog-help-box-content">
        <div className="blog-help-box-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(249, 0, 77, 0.1)"/>
            <path d="M24 16C20.6863 16 18 18.6863 18 22C18 25.3137 20.6863 28 24 28C27.3137 28 30 25.3137 30 22C30 18.6863 27.3137 16 24 16Z" fill="#f9004d"/>
            <path d="M24 32C20.6863 32 18 34.6863 18 38V40H30V38C30 34.6863 27.3137 32 24 32Z" fill="#f9004d"/>
          </svg>
        </div>
        <h3 className="blog-help-box-title">Need Help?</h3>
        <p className="blog-help-box-text">
          Didn't find something you're looking for? Reach out to us and we can help you find the information you need or create a custom article on your topic.
        </p>
        <div className="blog-help-box-actions">
          <Link href="/contact" className="blog-help-box-btn blog-help-box-btn-primary">
            Contact Us
          </Link>
          <Link href="/contact?request=article" className="blog-help-box-btn blog-help-box-btn-secondary">
            Request an Article
          </Link>
        </div>
      </div>
    </div>
  )
}

