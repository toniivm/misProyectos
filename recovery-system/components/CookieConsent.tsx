'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const locale = useLocale()
  const isEs = locale === 'es'

  useEffect(() => {
    const consent = localStorage.getItem('noctip_cookie_consent')
    if (!consent) {
      // Show after 2 seconds to not be intrusive
      const timer = setTimeout(() => setShow(true), 2000)
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
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.1] bg-[#0d1219]/95 p-5 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(16,191,216,0.1)]">
                <Cookie size={22} className="text-[#10BFD8]" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#f2eee7]">
                  {isEs ? 'Usamos cookies' : 'We use cookies'}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-[#8791a1]">
                  {isEs
                    ? 'Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Al continuar navegando, aceptas su uso.'
                    : 'We use first-party and third-party cookies to improve your experience, analyze traffic and personalize content. By continuing to browse, you accept their use.'}
                  {' '}
                  <Link href={`/${locale}/legal/cookies`} className="text-[#10BFD8] hover:underline">
                    {isEs ? 'Más información' : 'Learn more'}
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={reject}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[12px] font-medium text-[#8791a1] transition hover:border-white/[0.2] hover:text-[#f2eee7]"
                >
                  {isEs ? 'Rechazar' : 'Reject'}
                </button>
                <button
                  onClick={accept}
                  className="flex items-center gap-2 rounded-full bg-[#f2eee7] px-5 py-2.5 text-[12px] font-semibold text-[#11161d] transition hover:bg-white hover:shadow-[0_4px_12px_rgba(242,238,231,0.2)]"
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
