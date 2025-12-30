'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Zero Trust Architecture',
  slug: 'zero-trust-architecture',
  image: '/assets/images/Zero Trust Architecture.webp',
  description: 'Trust no one. Verify everything. We implement Zero Trust frameworks that assume breach and block lateral movement instantly.'
}

export default function ZeroTrustArchitecturePage() {
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

