import type { Metadata } from 'next'
import { Urbanist, Poppins } from 'next/font/google'
import '../styles/globals.css'
import '../styles/fonts.css'
import '../css/variables.css'
import '../css/global-background.css'
import '../css/responsive.css'
import '../css/shimmer-text.css'
import '../css/header.css'
import '../css/hero.css'
import '../css/floating-cards.css'
import '../css/infinite-slider.css'
import '../css/about.css'
import '../css/services.css'
import '../css/why-choose-us.css'
import '../css/cta.css'
import '../css/features.css'
import '../css/stats.css'
import '../css/testimonials.css'
import '../css/faq.css'
import '../css/work-with-us.css'
import '../css/final-cta.css'
import '../css/footer.css'
import '../css/contact-modal.css'
import '../css/legal-modal.css'
import '../css/back-to-top.css'
import '../css/contact-hero.css'
import '../css/blog.css'
import '../css/blog-single.css'
import '../css/blog-comments.css'
import '../css/entrance-animations.css'
import '../css/performance.css'
import '../css/service-cards-responsive.css'
import '../css/comprehensive-responsive.css'
import '../css/mobile-fixes.css'
import '../components/PageLoader.css'
import { Providers } from './providers'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
  description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  keywords: ['cybersecurity', 'enterprise security', 'AI solutions', 'network security', 'cyber protection'],
  authors: [{ name: 'CyberAssassin' }],
  creator: 'CyberAssassin',
  publisher: 'CyberAssassin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cyberassassin.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CyberAssassin',
    title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
    description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberAssassin | Enterprise Cybersecurity & AI Solutions',
    description: 'Enterprise-grade Cybersecurity and AI solutions to protect your digital assets and empower your business.',
  },
  icons: {
    icon: '/assets/images/favicon.jpg',
    shortcut: '/assets/images/favicon.jpg',
    apple: '/assets/images/favicon.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${urbanist.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${urbanist.variable} ${poppins.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

