import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import {getLocale} from 'next-intl/server'
import './globals.css'
import UtmCapture from '../components/UtmCapture'
import GoogleAnalytics from '../components/GoogleAnalytics'
import MetaPixel from '../components/MetaPixel'
import TikTokPixel from '../components/TikTokPixel'
import TawkToChat from '../components/TawkToChat'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: '#080c12',
}

export const metadata: Metadata = {
  title: {
    default: 'Noctip™ — Premium Sleep & Recovery Technology',
    template: '%s | Noctip™',
  },
  description:
    'Noctip designs sleep and recovery technology. Anti-snoring mouthpieces, posture correctors, sleep audio headbands, and cervical massagers. Free shipping, 30-night guarantee.',
  keywords: [
    'noctip', 'sleep technology', 'recovery products', 'anti-snoring mouthpiece', 'posture corrector',
    'sleep headband', 'neck massager', 'cervical massager', 'jaw advancement', 'wellness products',
    'premium sleep', 'sleep optimization', 'recovery tools', 'biohacking sleep', 'noctip.com',
  ],
  authors: [{ name: 'Noctip', url: 'https://noctip.com' }],
  creator: 'Noctip',
  publisher: 'Noctip',
  metadataBase: new URL('https://noctip.com'),
  openGraph: {
    title: 'Noctip™ — Sleep & Recovery that Works',
    description: 'Sleep and recovery products that actually work. Free shipping, 30-night guarantee.',
    url: 'https://noctip.com',
    siteName: 'Noctip',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://noctip.com/images/products/sleep-headband.jpg',
        width: 1200,
        height: 630,
        alt: 'Noctip — Sleep & Recovery that Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noctip™ — Sleep & Recovery that Works',
    description: 'Sleep and recovery products that actually work. Free shipping, 30-night guarantee.',
    images: ['https://noctip.com/images/products/sleep-headband.jpg'],
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
  other: {
    'msapplication-TileColor': '#080c12',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#080c12] text-[#f2eee7] font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <GoogleAnalytics />
        <MetaPixel />
        <TikTokPixel />
        <TawkToChat />
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
