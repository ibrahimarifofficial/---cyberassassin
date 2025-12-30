'use client'

const values = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="28" cy="24" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 40C18 35 22 32 28 32C34 32 38 35 38 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Integrity First',
    description: 'We operate with unwavering honesty, transparency, and ethical standards in everything we do.',
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
    title: 'Innovation Driven',
    description: 'We continuously evolve our methods and technologies to stay ahead of emerging cyber threats.',
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
    title: 'Client-Centric',
    description: 'Your success is our priority. We tailor solutions to meet your unique security needs.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 8L44 16V28C44 36.84 37.16 44 28 44C18.84 44 12 36.84 12 28V16L28 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 24L25 29L36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Excellence Always',
    description: 'We strive for perfection in every project, delivering results that exceed expectations.',
  },
]

export default function ValuesSection() {
  return (
    <section className="why-choose-us" id="values" style={{ padding: 'var(--spacing-5xl) 0' }}>
      <div className="container">
        <div className="why-choose-us__container">
          <div className="why-choose-us__header">
            <div className="why-choose-us__eyebrow">
              <span className="shimmer-text">Our <span className="why-choose-gradient">Values</span></span>
            </div>
          </div>

          <h2 className="why-choose-us__title">
            The Principles That <span className="why-choose-gradient">Guide Us</span>
          </h2>

          <div className="why-choose-us__grid">
            {values.map((value, index) => (
              <div key={index} className="why-choose-us__feature">
                <div className="why-choose-us__icon">{value.icon}</div>
                <h3 className="why-choose-us__feature-title">{value.title}</h3>
                <p className="why-choose-us__feature-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


