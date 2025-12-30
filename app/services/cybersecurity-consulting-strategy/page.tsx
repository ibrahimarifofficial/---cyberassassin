'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ServiceDetailHero from '@/components/services/ServiceDetailHero'
import ServiceDetail from '@/components/services/ServiceDetail'

const service = {
  name: 'Cybersecurity Consulting & Strategy',
  slug: 'cybersecurity-consulting-strategy',
  image: '/assets/images/Cybersecurity Consulting & Strategy.webp',
  description: 'Strategic guidance from seasoned cyber warriors—designed to outthink, outmaneuver, and outlast attackers. We provide a clear, lethal plan to evolve your security posture from reactive to unstoppable.'
}

export default function CybersecurityConsultingStrategyPage() {
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

