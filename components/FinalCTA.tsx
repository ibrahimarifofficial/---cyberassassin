'use client'

import Link from 'next/link'
import ImageWithFallback from './ImageWithFallback'

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-cta__wrapper">
          <div className="final-cta__content">
            <h2 className="final-cta__title shimmer-text">Start Defending Your Business Now</h2>
            <Link href="/contact" className="final-cta__btn">
              Get Consultation
            </Link>
          </div>
          <div className="final-cta__image">
            <ImageWithFallback 
              src="/assets/images/robot.png" 
              alt="AI Robot"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

