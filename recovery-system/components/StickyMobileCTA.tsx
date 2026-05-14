'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight, Zap } from 'lucide-react'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~60% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-3 left-3 right-3 z-50 lg:hidden"
        >
          <div
            className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
            style={{
              background: 'rgba(10,18,32,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(16,191,216,0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* Left: info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(16,191,216,0.12)', border: '1px solid rgba(16,191,216,0.2)' }}>
                <ShoppingBag size={16} className="text-electric-400" />
              </div>
              <div className="min-w-0">
                <div className="text-white text-[11px] font-bold leading-tight truncate">Complete System</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-electric-400 text-xs font-black">€177</span>
                  <span className="text-slate-500 text-[10px] line-through">€297</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">Save 40%</span>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <a
              href="#offer"
              className="shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-black tracking-wide"
              style={{
                color: '#03111a',
                background: 'linear-gradient(135deg, #9DE8D7 0%, #10BFD8 55%, #7FD9FF 100%)',
                boxShadow: '0 6px 20px rgba(16,191,216,0.4)',
              }}
            >
              <Zap size={12} />
              Get System
              <ChevronRight size={12} />
            </a>
          </div>

          {/* Trust micro-copy */}
          <p className="text-center text-[10px] text-slate-600 mt-2 tracking-wide">
            Free shipping · 30-day guarantee · Secure checkout
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
