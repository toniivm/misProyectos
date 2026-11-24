'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const locale = useLocale()
  const isEs = locale === 'es'

  useEffect(() => {
    try {
      const consent = localStorage.getItem('noctip_cookie_consent')
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 2500)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage unavailable
      const timer = setTimeout(() => setShow(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem('noctip_cookie_consent', 'accepted')
      // Consent Mode v2 update
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
      if (w.gtag) {
        w.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        })
      } else {
        w.dataLayer = w.dataLayer || []
        w.dataLayer.push(['consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' }])
      }
    } catch {}
    setShow(false)
  }

  const reject = () => {
    try {
      localStorage.setItem('noctip_cookie_consent', 'rejected')
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
      if (w.gtag) {
        w.gtag('consent', 'update', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        })
      }
    } catch {}
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-2 pb-[80px] sm:p-4 sm:pb-4"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-white/[0.1] bg-[#0d1219]/95 px-3 py-2.5 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,191,216,0.1)]">
                <Cookie size={17} className="text-[#10BFD8]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] leading-[1.45] text-[#8791a1] sm:text-[12px]">
                  <strong className="font-semibold text-[#f2eee7]">{isEs ? 'Usamos cookies.' : 'We use cookies.'}</strong>{' '}
                  {isEs ? 'Para mejorar tu experiencia.' : 'To improve your experience.'}{' '}
                  <Link href={`/${locale}/legal/cookies`} className="text-[#10BFD8] hover:underline">
                    {isEs ? 'Más info' : 'Learn more'}
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={reject}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-[#8791a1] transition hover:border-white/[0.2] hover:text-[#f2eee7] min-h-[44px]"
                >
                  {isEs ? 'Rechazar' : 'Reject'}
                </button>
                <button
                  onClick={accept}
                  className="flex items-center gap-1 rounded-full bg-[#f2eee7] px-4 py-2 text-[11px] font-semibold text-[#11161d] transition hover:bg-white min-h-[44px]"
                >
                  <Shield size={11} />
                  {isEs ? 'Aceptar' : 'Accept'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
