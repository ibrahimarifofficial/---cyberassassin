'use client'

import Link from 'next/link'

export default function AdminDashboard404() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '500px',
        background: '#ffffff',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#f9004d',
          lineHeight: '1',
          marginBottom: '1rem'
        }}>
          404
        </div>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#f9004d',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c70039'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f9004d'
          }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
