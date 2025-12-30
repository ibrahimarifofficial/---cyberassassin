'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Executive & VIP Cyber Protection',
  slug: 'executive-vip-cyber-protection',
  image: '/assets/images/Executive Cyber Protection.webp',
  description: 'High-value targets need elite defense. We protect executives from targeted attacks and digital espionage.'
}

export default function ExecutiveVIPCyberProtectionPage() {
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

