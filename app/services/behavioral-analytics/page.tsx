'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Behavioral Analytics',
  slug: 'behavioral-analytics',
  image: '/assets/images/Behavioral Analytics.webp',
  description: 'When behavior shifts, danger follows. We analyze user and system behavior to expose insider threats and silent attackers.'
}

export default function BehavioralAnalyticsPage() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
        <ServiceDetailHero serviceName={service.name} />
        <ServiceDetail service={service} />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#service-detail-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

