'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const networkSecurityService = {
  name: 'Network Security',
  slug: 'network-security',
  image: '/assets/images/Network Security.webp',
  description: 'We guard your digital perimeter like an elite kill zone—monitoring, filtering, and neutralizing threats before they cross your network boundary.'
}

export default function NetworkSecurityPage() {
  useSmoothScroll()

  return (
    <>
      <Header />
      <main>
        <ServiceDetailHero serviceName={networkSecurityService.name} />
        <ServiceDetail service={networkSecurityService} />
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#service-detail-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}

