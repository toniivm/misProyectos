import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
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
  title: 'RECOVERY SYSTEM™ — The Complete Body Recovery Kit',
  description:
    'Deep muscle relief. Better sleep. Faster recovery. The premium wellness tech kit trusted by athletes and high performers.',
  keywords: ['recovery', 'massage gun', 'neck massager', 'sleep optimization', 'wellness', 'biohacking'],
  openGraph: {
    title: 'RECOVERY SYSTEM™',
    description: 'Your body never fully recovers. Until now.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#050508] text-slate-100 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
