'use client'

import dynamic from 'next/dynamic'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesGrid from '@/components/services/ServicesGrid'

// Lazy load below-the-fold components
const WorkWithUs = dynamic(() => import('@/components/WorkWithUs'), { ssr: true })
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: true })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true })
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })
const LegalModal = dynamic(() => import('@/components/LegalModal'), { ssr: true })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: true })

export default function ServicesPage() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <WorkWithUs />
        <WhyChooseUs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#services-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

