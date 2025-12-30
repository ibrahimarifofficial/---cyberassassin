'use client'

import { useState, useEffect } from 'react'
import ImageWithFallback from './ImageWithFallback'

const testimonials = [
  {
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'Lauren Parl',
    position: 'CEO of Tech Innovators Inc',
    text: "Working with Cyber Assassin has been a game-changer for our company's security. Their expert team conducted a thorough pen test, identifying critical vulnerabilities we weren't aware of. Thanks to their swift actions, we could reinforce our defenses and stay ahead of potential threats. Highly recommended!",
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=12',
    name: 'Yoris Alley',
    position: 'IT Manager at Secure Solutions Co',
    text: "I can't praise Cyber Assassin enough for their exceptional cyber security services. Their team showed remarkable expertise in understanding our unique security needs and tailored their solutions accordingly. They provided comprehensive assessments and actionable insights that significantly improved our network's resilience. We feel much more confident in our defense against cyber threats now!",
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=47',
    name: 'Sarah Johnson',
    position: 'CTO of Digital Dynamics Ltd',
    text: "Partnering with Cyber Assassin was the best decision we made for our company's cyber security. Their dedication, professionalism, and in-depth knowledge were evident throughout the entire engagement. The thorough penetration testing they performed was instrumental in strengthening our infrastructure, and their recommendations were spot-on. Cyber Assassin is now our go-to team for all things security!",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    setAutoPlayInterval(interval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  const next = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    setAutoPlayInterval(interval)
  }

  const prev = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    setAutoPlayInterval(interval)
  }

  const goTo = (index: number) => {
    if (autoPlayInterval) clearInterval(autoPlayInterval)
    setCurrentIndex(index)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    setAutoPlayInterval(interval)
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <span className="testimonials__eyebrow shimmer-text">Testimonials</span>
          <h2 className="testimonials__title">Hear From Organizations We've Secured</h2>
        </div>

        <div className="testimonials__slider-wrapper">
          <div className="testimonials__slider" id="testimonialsSlider">
            <div className="testimonials__track" id="testimonialsTrack" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`testimonial ${index === currentIndex ? 'active' : ''}`}>
                  <div className="testimonial__avatar">
                    <ImageWithFallback 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="testimonial__content">
                    <p className="testimonial__text">{testimonial.text}</p>
                    <div className="testimonial__rating">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 15L4 18L6 11L1 7L8 6.5L10 0L12 6.5L19 7L14 11L16 18L10 15Z"/>
                        </svg>
                      ))}
                    </div>
                    <h3 className="testimonial__name">{testimonial.name}</h3>
                    <p className="testimonial__position">{testimonial.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials__dots" id="testimonialDots">
          <button
            className="testimonials__nav testimonials__nav--prev"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 14L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
          <button
            className="testimonials__nav testimonials__nav--next"
            onClick={next}
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 14L12 10L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

