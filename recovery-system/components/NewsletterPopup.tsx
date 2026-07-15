'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Check, Sparkles } from 'lucide-react'
import { useLocale } from 'next-intl'

const STORAGE_KEY = 'noctip_newsletter_dismissed'
const SUBMITTED_KEY = 'noctip_newsletter_submitted'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const locale = useLocale()
  const isEs = locale === 'es'

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      const alreadySubmitted = localStorage.getItem(SUBMITTED_KEY)
      if (dismissed || alreadySubmitted) return
    } catch {
      // localStorage unavailable
    }

    const timer = setTimeout(() => {
      setVisible(true)
    }, 45000)

    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    setVisible(false)
    try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
    setEmail('')
    setSubmitted(false)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!visible) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [visible, dismiss])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
    try { localStorage.setItem(SUBMITTED_KEY, 'true') } catch {}
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
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px]"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
          <motion.div
            key="newsletter-popup"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label={isEs ? 'Oferta de newsletter' : 'Newsletter offer'}
            className="fixed inset-0 z-[90] m-auto flex h-fit w-[calc(100vw-2rem)] max-w-md items-center justify-center overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1219] shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
            style={{
              maxHeight: 'calc(100dvh - 2rem)',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#6b7785] transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#131a28] via-[#0d1219] to-[#0c1016] p-6 text-center sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,191,216,0.1),transparent)]" />

              <div className="relative">
                {!submitted ? (
                  <>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#10BFD8]/20 bg-[#10BFD8]/10 sm:h-14 sm:w-14">
                      <Sparkles size={22} className="text-[#10BFD8]" />
                    </div>

                    <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7] sm:text-[22px]">
                      {isEs ? 'Mantente al día' : 'Stay in the loop'}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#8791a1] sm:text-[14px]">
                      {isEs ? 'Novedades, consejos de sueño y ofertas exclusivas. Sin spam.' : 'New releases, sleep tips, and exclusive offers. No spam.'}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-3 sm:mt-6">
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5568]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={isEs ? 'Tu dirección de email' : 'Your email address'}
                          required
                          autoComplete="email"
                          inputMode="email"
                          className="w-full rounded-full border border-white/[0.1] bg-white/[0.04] py-3 pl-11 pr-4 text-[16px] text-[#f2eee7] placeholder-[#4a5568] outline-none transition focus:border-[#10BFD8]/40 focus:bg-white/[0.06] sm:py-3.5 sm:text-[14px]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[13px] font-semibold text-[#11161d] transition-all hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.2)] disabled:opacity-60 sm:py-3.5 sm:text-[14px]"
                      >
                        {loading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11161d] border-t-transparent" />
                        ) : (
                          <>{isEs ? 'Suscribirme' : 'Subscribe'}</>
                        )}
                      </button>
                    </form>

                    <p className="mt-3 text-[11px] text-[#4a5568]">
                      {isEs ? 'Sin spam. Cancela cuando quieras.' : 'No spam. Unsubscribe anytime.'}
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
                      {isEs ? '¡Gracias!' : 'Thank you!'}
                    </h3>
                    <p className="mt-2 text-[14px] text-[#8791a1]">
                      {isEs ? 'Te mantendremos informado.' : 'We\'ll keep you posted.'}
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
