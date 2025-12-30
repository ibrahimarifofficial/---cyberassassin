'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const endpointSecurityService = {
  name: 'Endpoint Security',
  slug: 'endpoint-security',
  image: '/assets/images/Endpoint Security.webp',
  description: 'Every device is a potential entry point. CyberAssassin locks down endpoints with ruthless precision, stopping attacks at the source.'
}

export default function EndpointSecurityPage() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
        <ServiceDetailHero serviceName={endpointSecurityService.name} />
        <ServiceDetail service={endpointSecurityService} />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#service-detail-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

