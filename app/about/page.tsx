'use client'

import dynamic from 'next/dynamic'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import AboutHero from '@/components/about/AboutHero'
import AboutContent from '@/components/about/AboutContent'
import MissionVision from '@/components/about/MissionVision'
import ExpertiseSection from '@/components/about/ExpertiseSection'
import ImageContentSection from '@/components/about/ImageContentSection'

// Lazy load below-the-fold components
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: true })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true })
const WorkWithUs = dynamic(() => import('@/components/WorkWithUs'), { ssr: true })
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })
const LegalModal = dynamic(() => import('@/components/LegalModal'), { ssr: true })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: true })

export default function AboutPage() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutContent />
        <MissionVision />
        <ExpertiseSection />
        <ImageContentSection />
        <WhyChooseUs />
        <FAQ />
        <WorkWithUs />
        <FinalCTA />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#about-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

