'use client'

import dynamic from 'next/dynamic'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import InfiniteSlider from '@/components/InfiniteSlider'
import AboutContent from '@/components/about/AboutContent'
import ServiceCards from '@/components/ServiceCards'

// Lazy load below-the-fold components
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: true })
const WorkWithUs = dynamic(() => import('@/components/WorkWithUs'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true })
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })
const LegalModal = dynamic(() => import('@/components/LegalModal'), { ssr: true })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: true })

export default function Home() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
            <Hero />
            <InfiniteSlider />
            <AboutContent 
              showMissionVision={true}
              eyebrow="About Our Company"
              title="Who We Are?"
              id="about"
              headingId="about-heading"
            />
            <ServiceCards />
        <WhyChooseUs />
        <WorkWithUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

