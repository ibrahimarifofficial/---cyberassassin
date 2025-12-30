'use client'

export default function MissionVision() {
  return (
    <section className="about__mission-vision" id="mission-vision" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="about__mission-title">
          We deliver AI-driven cybersecurity solutions that help your business grow, strengthening your digital presence and building a trusted security 
          <span className="about__gradient-text"> brand with precision</span>
        </h2>

        <div className="about__mission-content">
          <div className="about__experience">
            <div className="about__experience-number">11+</div>
            <p className="about__experience-text">Years Of Work Experience</p>
          </div>

          <div className="about__mission-item about__mission-item--with-description">
            <div className="about__mission-icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2"/>
                <circle cx="28" cy="28" r="14" stroke="currentColor" strokeWidth="2"/>
                <circle cx="28" cy="28" r="5" fill="currentColor"/>
                <path d="M28 4V10M28 54V48M4 28H10M54 28H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="about__mission-heading">Our Mission</h3>
            <p className="about__mission-text">
              At the core of our mission is the belief that every organization deserves tailored, intelligent cybersecurity powered by advanced AI.
            </p>
            <p className="about__mission-description">
              We focus on empowering businesses with innovative, AI-enhanced security solutions designed to support growth and establish long-term trust. 
              By combining precision, expertise, and next-gen AI strategies, we help organizations stay protected in an evolving digital threat landscape.
            </p>
          </div>

          <div className="about__mission-item">
            <div className="about__mission-icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="14" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="28" cy="28" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 24L10 20M54 24L48 20M4 32L10 36M54 32L48 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="about__mission-heading">Our Vision</h3>
            <p className="about__mission-text">
              Our vision is to redefine cybersecurity with adaptive, AI-driven solutions that evolve to anticipate and neutralize emerging threats.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

