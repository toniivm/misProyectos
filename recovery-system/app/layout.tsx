import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
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

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: '#F7F5F0',
}

export const metadata: Metadata = {
  title: {
    default: 'Nítida Dry™ — Secador de calzado con temporizador | Zapatos secos en 3 h',
    template: '%s | Nítida™',
  },
  description:
    'Nítida Dry: secador de calzado con aire caliente a 360° y temporizador de 3, 6 o 9 horas. Seca botas, zapatillas, guantes y calcetines por dentro. 130 W, plegable. Envío gratis, 30 días de prueba y 2 años de garantía.',
  keywords: [
    'nitida', 'secador de zapatos', 'secador de calzado', 'secador de botas', 'zapatos mojados', 'olor a humedad', 'calzado seco',
    'shoe dryer', 'boot dryer', 'wet shoes', 'damp shoes', 'footwear dryer',
  ],
  authors: [{ name: 'Nítida', url: 'https://noctip.com' }],
  creator: 'Nítida',
  publisher: 'Nítida',
  metadataBase: new URL('https://noctip.com'),
  openGraph: {
    title: 'Nítida Dry™ — Zapatos secos y sin olor cada mañana',
    description: 'Secador de calzado con aire caliente a 360° y temporizador 3/6/9 h. Envío gratis, 30 días de prueba y 2 años de garantía.',
    url: 'https://noctip.com',
    siteName: 'Nítida',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://noctip.com/images/dry/hero-boots.jpg',
        width: 430,
        height: 800,
        alt: 'Nítida Dry secando unas botas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nítida Dry™ — Zapatos secos y sin olor cada mañana',
    description: 'Secador de calzado con aire caliente a 360° y temporizador 3/6/9 h. Envío gratis, 30 días de prueba y 2 años de garantía.',
    images: ['https://noctip.com/images/dry/hero-boots.jpg'],
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
    <html lang={locale} className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#F7F5F0] text-[#14211F] font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
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
