'use client'

import ImageWithFallback from '../ImageWithFallback'

const teamMembers = [
  {
    name: 'Andy Dufren',
    role: 'CEO & Founder',
    image: 'https://i.pravatar.cc/150?img=12',
    bio: 'Visionary leader with 15+ years in cybersecurity, driving innovation and strategic growth.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Chief Technology Officer',
    image: 'https://i.pravatar.cc/150?img=47',
    bio: 'Expert in AI-driven security solutions and threat intelligence systems.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Security Operations',
    image: 'https://i.pravatar.cc/150?img=33',
    bio: 'Specializes in incident response and proactive threat hunting strategies.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director of Compliance',
    image: 'https://i.pravatar.cc/150?img=20',
    bio: 'Ensures regulatory compliance and data privacy across all client engagements.',
  },
]

export default function TeamSection() {
  return (
    <section className="about" id="team" style={{ padding: 'var(--spacing-5xl) 0', position: 'relative' }}>
      <div className="container">
        <div className="services__header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl)' }}>
          <span className="services__eyebrow shimmer-text">Our Experts</span>
          <h2 className="services__title">
            Meet The <span className="services__gradient">Elite Security Force</span>
          </h2>
          <p style={{ 
            marginTop: 'var(--spacing-lg)', 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-base)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Our legendary team combines decades of experience with cutting-edge expertise to protect your digital assets.
          </p>
        </div>

        <div className="services__grid" style={{ marginTop: 'var(--spacing-4xl)' }}>
          {teamMembers.map((member, index) => (
            <article key={index} className="service-card" style={{ 
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 0, 77, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = ''
            }}>
              <div style={{ 
                width: '140px', 
                height: '140px', 
                margin: '0 auto var(--spacing-lg)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--color-primary)',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(249, 0, 77, 0.3)'
              }}>
                <ImageWithFallback 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 className="service-card__title" style={{ marginBottom: 'var(--spacing-sm)' }}>{member.name}</h3>
              <p style={{ 
                color: 'var(--color-primary)', 
                fontSize: 'var(--font-size-base)',
                fontWeight: '500',
                marginBottom: 'var(--spacing-md)'
              }}>
                {member.role}
              </p>
              <p className="service-card__description" style={{ 
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)'
              }}>
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

