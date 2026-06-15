import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import {getLocale} from 'next-intl/server'
import './globals.css'
import UtmCapture from '../components/UtmCapture'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Noctip™ — Premium Sleep & Recovery Technology',
    template: '%s | Noctip™',
  },
  description:
    'Noctip designs premium sleep and recovery technology. Acoustic headbands, white noise machines, cervical massagers and weighted masks. Free shipping, 30-night guarantee.',
  keywords: [
    'noctip', 'sleep technology', 'recovery products', 'sleep headband', 'white noise machine',
    'neck massager', 'weighted sleep mask', 'cervical massager', 'sleep audio', 'wellness products',
    'premium sleep', 'sleep optimization', 'recovery tools', 'biohacking sleep', 'noctip.com',
  ],
  authors: [{ name: 'Noctip', url: 'https://noctip.com' }],
  creator: 'Noctip',
  publisher: 'Noctip',
  metadataBase: new URL('https://noctip.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'Noctip™ — Premium Sleep & Recovery Technology',
    description: 'Duerme más profundo. Recupérate mejor. Vive mejor. Tecnología premium de sueño y recuperación.',
    url: 'https://noctip.com',
    siteName: 'Noctip',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/images/sleepband-pro-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Noctip — Premium Sleep & Recovery Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noctip™ — Premium Sleep & Recovery Technology',
    description: 'Tecnología premium de sueño y recuperación. Envío gratis y garantía de 30 noches.',
    images: ['/images/sleepband-pro-1.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#080c16" />
        <meta name="msapplication-TileColor" content="#080c16" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://noctip.com" />
      </head>
      <body className="bg-[#080c16] text-[#EAF1FF] font-sans antialiased overflow-x-hidden">
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
