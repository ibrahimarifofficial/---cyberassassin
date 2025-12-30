'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Ransomware Protection & Recovery',
  slug: 'ransomware-protection-recovery',
  image: '/assets/images/Ransomware Protection.webp',
  description: 'No negotiations. No panic. We prevent ransomware and restore systems without bowing to attackers.'
}

export default function RansomwareProtectionRecoveryPage() {
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

