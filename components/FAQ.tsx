'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What services does Cyber Assassin offer?',
    answer: 'We provide AI-driven cybersecurity solutions, including threat detection, vulnerability assessment, incident response, and tailored security strategies.',
  },
  {
    question: 'How quickly can you respond to a cyber threat?',
    answer: 'Our 24/7 monitoring and response system ensures threats are detected and neutralized in real time.',
  },
  {
    question: 'Is your cybersecurity solution suitable for small businesses?',
    answer: 'Yes. We customize solutions to fit businesses of all sizes, ensuring effective protection regardless of scale.',
  },
  {
    question: 'How do you ensure data privacy and compliance?',
    answer: 'We follow industry-leading standards and automated compliance frameworks to secure sensitive data and meet regulatory requirements.',
  },
  {
    question: 'Can you help prevent future cyber attacks?',
    answer: 'Absolutely. Our proactive security strategies and AI-powered monitoring help anticipate and stop attacks before they occur.',
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(1)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__header">
          <span className="faq__eyebrow shimmer-text">Faq's</span>
          <h2 className="faq__title">
            Answers to Your Most<br />Frequently Asked <span className="faq__gradient">Questions</span>
          </h2>
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''}`}>
              <button
                className="faq__question"
                aria-expanded={activeIndex === index}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg className="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


