import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import {getLocale} from 'next-intl/server'
import './globals.css'

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
  title: 'RECOVERY SYSTEM™',
  description:
    'Premium recovery system for muscle relief, neck tension and sleep optimization.',
  keywords: ['recovery', 'massage gun', 'neck massager', 'sleep optimization', 'wellness', 'biohacking'],
  openGraph: {
    title: 'RECOVERY SYSTEM™',
    description: 'Your body never fully recovers. Until now.',
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
      <body className="bg-[#080808] text-[#E8E4DF] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
