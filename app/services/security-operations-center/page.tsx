'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Security Operations Center (SOC)',
  slug: 'security-operations-center',
  image: '/assets/images/SOC (24_7).webp',
  description: '24/7 cyber vigilance. Our SOC monitors, analyzes, and responds to threats in real time—day and night.'
}

export default function SecurityOperationsCenterPage() {
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

