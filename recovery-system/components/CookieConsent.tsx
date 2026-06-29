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
    const consent = localStorage.getItem('noctip_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('noctip_cookie_consent', 'accepted')
    setShow(false)
  }

  const reject = () => {
    localStorage.setItem('noctip_cookie_consent', 'rejected')
    setShow(false)
  }

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 pb-[92px] sm:p-4 sm:pb-4"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.1] bg-[#0d1219]/95 p-4 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.1)]">
                <Cookie size={20} className="text-[#10BFD8]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[#f2eee7] sm:text-[15px]">
                  {isEs ? 'Usamos cookies' : 'We use cookies'}
                </h3>
                <p className="mt-1 text-[12px] leading-5 text-[#8791a1] sm:text-[13px]">
                  {isEs
                    ? 'Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptas su uso.'
                    : 'We use cookies to improve your experience. By continuing, you accept their use.'}
                  {' '}
                  <Link href={`/${locale}/legal/cookies`} className="text-[#10BFD8] hover:underline">
                    {isEs ? 'Más info' : 'Learn more'}
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={reject}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] font-medium text-[#8791a1] transition hover:border-white/[0.2] hover:text-[#f2eee7] sm:px-4 sm:py-2.5 sm:text-[12px]"
                >
                  {isEs ? 'Rechazar' : 'Reject'}
                </button>
                <button
                  onClick={accept}
                  className="flex items-center gap-1.5 rounded-full bg-[#f2eee7] px-4 py-2 text-[11px] font-semibold text-[#11161d] transition hover:bg-white hover:shadow-[0_4px_12px_rgba(242,238,231,0.2)] sm:px-5 sm:py-2.5 sm:text-[12px]"
                >
                  <Shield size={12} />
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
