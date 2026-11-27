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
  themeColor: '#080c12',
}

export const metadata: Metadata = {
  title: {
    default: 'Nítida Vapor™ — Limpiador de vapor a presión | 12 accesorios',
    template: '%s | Nítida™',
  },
  description:
    'Nítida Vapor: limpiador de vapor a presión con 12 accesorios. Despega grasa y cal de cocina, baño y tapicería solo con agua. Envío 24-72 h, 30 días de prueba y 2 años de garantía.',
  keywords: [
    'nitida', 'limpiador de vapor', 'limpiadora a vapor', 'vapor a presión', 'limpieza sin frotar', 'quitar grasa', 'quitar cal',
    'steam cleaner', 'pressurised steam', 'clean without scrubbing', 'limescale', 'grease',
  ],
  authors: [{ name: 'Nítida', url: 'https://noctip.com' }],
  creator: 'Nítida',
  publisher: 'Nítida',
  metadataBase: new URL('https://noctip.com'),
  openGraph: {
    title: 'Nítida Vapor™ — La grasa y la cal se derriten. Tú no.',
    description: 'Pressurised steam cleaner with 12 accessories. Water only. 24-72 h shipping and 30-day trial.',
    url: 'https://noctip.com',
    siteName: 'Nítida',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://noctip.com/images/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'Noctip — Sleep & Recovery that Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nítida Vapor™ — La grasa y la cal se derriten. Tú no.',
    description: 'Pressurised steam cleaner with 12 accessories. Water only. 24-72 h shipping and 30-day trial.',
    images: ['https://noctip.com/images/logo/logo.png'],
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
