'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Check, Sparkles } from 'lucide-react'
import { useLocale } from 'next-intl'

const STORAGE_KEY = 'noctip_newsletter_dismissed'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const locale = useLocale()
  const isEs = locale === 'es'

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev || '' }
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => {
      dismiss()
    }, 3000)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="newsletter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            key="newsletter-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0d1219] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#6b7785] transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#131a28] via-[#0d1219] to-[#0c1016] p-8 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,191,216,0.1),transparent)]" />

              <div className="relative">
                {!submitted ? (
                  <>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#10BFD8]/20 bg-[#10BFD8]/10">
                      <Sparkles size={24} className="text-[#10BFD8]" />
                    </div>

                    <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#f2eee7]">
                      {isEs ? 'Consigue un 10% de descuento' : 'Get 10% off your first order'}
                    </h3>
                    <p className="mt-2 text-[14px] leading-6 text-[#8791a1]">
                      {isEs ? 'Únete a 6.000+ personas que duermen mejor. Sin spam. Cancela cuando quieras.' : 'Join 6,000+ people sleeping better. No spam. Unsubscribe anytime.'}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5568]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={isEs ? 'Tu dirección de email' : 'Your email address'}
                          required
                          className="w-full rounded-full border border-white/[0.1] bg-white/[0.04] py-3.5 pl-11 pr-4 text-[14px] text-[#f2eee7] placeholder-[#4a5568] outline-none transition focus:border-[#10BFD8]/40 focus:bg-white/[0.06]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3.5 text-[14px] font-semibold text-[#11161d] transition-all hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.2)] disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />
                        ) : (
                          <>{isEs ? 'Obtener mi 10% de descuento' : 'Get my 10% off'}</>
                        )}
                      </button>
                    </form>

                    <p className="mt-3 text-[11px] text-[#4a5568]">
                      {isEs ? 'Usa el código' : 'Use code'} <span className="font-semibold text-[#8791a1]">NOCTIP10</span> {isEs ? 'en el checkout' : 'at checkout'}
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check size={28} className="text-emerald-400" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#f2eee7]">
                      {isEs ? '¡Ya eres parte!' : 'You\'re in!'}
                    </h3>
                    <p className="mt-2 text-[14px] text-[#8791a1]">
                      {isEs ? 'Revisa tu email para el código de descuento.' : 'Check your email for the discount code.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
