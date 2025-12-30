'use client'

import Link from 'next/link'

export default function WorkWithUs() {
  return (
    <section className="work-with-us">
      <div className="container">
        <div className="work-with-us__content">
          <div className="work-with-us__eyebrow shimmer-text">• Work With Us</div>
          <h2 className="work-with-us__title">
            Delivering Elite Cybersecurity Solutions That Go Beyond Expectations
          </h2>
          <p className="work-with-us__description">
            We protect your digital world with precision and expertise, ensuring every system stays secure against evolving threats.
            Backed by our legendary team of cybersecurity experts, we deliver powerful, next-generation security services you can trust.
          </p>
          <div className="work-with-us__buttons">
            <Link href="/contact" className="work-with-us__btn work-with-us__btn--primary">
              Secure Your Systems Now!
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


