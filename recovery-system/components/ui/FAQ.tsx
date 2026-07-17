'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="space-y-2.5" role="list">
      {items.map((faq, idx) => {
        const isOpen = openIdx === idx
        const panelId = `faq-panel-${idx}`
        const buttonId = `faq-button-${idx}`

        return (
          <div key={idx}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-[#10BFD8]/20 bg-[#10BFD8]/[0.03] shadow-[0_0_20px_rgba(16,191,216,0.05)]'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
            }`} role="listitem">
            <button
              id={buttonId}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
            >
              <span className={`flex-1 text-[14px] sm:text-[15px] font-semibold transition-colors duration-200 ${
                isOpen ? 'text-white' : 'text-[#c8d4e2]'
              }`}>{faq.q}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-colors duration-200 ${
                    isOpen ? 'text-[#10BFD8]' : 'text-[#5a6678]'
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="h-px bg-white/[0.06] mb-4" />
                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#8791a1]">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
