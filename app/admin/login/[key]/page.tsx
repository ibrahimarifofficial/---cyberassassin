'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import ImageWithFallback from '@/components/ImageWithFallback'
import '@/css/admin-login.css'

// Secret key for admin login - CHANGE THIS TO YOUR OWN SECURE KEY
// For better security, use a long random string like: crypto.randomBytes(32).toString('hex')
const ADMIN_LOGIN_KEY = 'cyber-assassin-secure-key-2024'

export default function AdminLogin() {
  const params = useParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isValidKey, setIsValidKey] = useState(false)

  useEffect(() => {
    // Validate the key from URL
    const key = params?.key as string
    if (key === ADMIN_LOGIN_KEY) {
      setIsValidKey(true)
    } else {
      // Invalid key - redirect or show error
      setIsValidKey(false)
      setError('Invalid access key. Unauthorized access denied.')
      // Optionally redirect after a delay
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin/thecyberassassindashboard2026-xyxyxz-01111')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Don't render login form if key is invalid
  if (!isValidKey) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-background">
          <div className="admin-login-overlay"></div>
        </div>
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-login-error" style={{ marginTop: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error || 'Invalid access key. Unauthorized access denied.'}</span>
            </div>
            <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '1rem' }}>
              Redirecting to homepage...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-background">
        <div className="admin-login-overlay"></div>
      </div>

      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          {/* Logo */}
          <div className="admin-login-logo">
            <ImageWithFallback
              src="/assets/images/logo.png"
              alt="CyberAssassin Logo"
              width={120}
              height={120}
              className="admin-login-logo-img"
            />
          </div>

          {/* Header */}
          <div className="admin-login-header">
            <h1 className="admin-login-title">Admin Login</h1>
            <p className="admin-login-subtitle">Enter your credentials to access the dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="admin-login-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-login-form-group">
              <label htmlFor="email" className="admin-login-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="admin-login-input"
                required
                disabled={loading}
              />
            </div>

            <div className="admin-login-form-group">
              <label htmlFor="password" className="admin-login-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Password</span>
              </label>
              <div className="admin-login-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="admin-login-input"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-login-password-toggle"
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-login-submit"
            >
              {loading ? (
                <>
                  <svg className="admin-login-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="admin-login-footer">
            <p className="admin-login-footer-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Secure Admin Access</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

