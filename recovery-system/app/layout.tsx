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
  title: 'Noctip™ — Premium Sleep & Recovery',
  description:
    'Herramientas premium de sueño y recuperación para el bienestar diario. Bandas Bluetooth, masajeadores y antifaces.',
  keywords: ['sleep', 'recovery', 'massage gun', 'neck massager', 'sleep optimization', 'wellness', 'biohacking', 'noctip'],
  openGraph: {
    title: 'Noctip™ — Premium Sleep & Recovery',
    description: 'Duerme más profundo. Recupérate mejor. Vive mejor.',
    type: 'website',
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
      <body className="bg-[#080c16] text-[#EAF1FF] font-sans antialiased overflow-x-hidden">
        <UtmCapture />
        {children}
      </body>
    </html>
  )
}
