'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="grid gap-3" role="list">
      {items.map((faq, idx) => {
        const isOpen = openIdx === idx
        const panelId = `faq-panel-${idx}`
        const buttonId = `faq-button-${idx}`

        return (
          <div key={idx} className={`rounded-2xl border transition-all duration-300 ${
            isOpen ? 'border-white/15 bg-white/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'
          }`} role="listitem">
            <button
              id={buttonId}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-[#f2eee7]">{faq.q}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-[#6b7785] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="px-5 pb-4 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
