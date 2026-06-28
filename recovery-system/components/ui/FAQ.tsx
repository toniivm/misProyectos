'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="grid gap-3">
      {items.map((faq, idx) => (
        <div key={idx} className={`rounded-2xl border transition-all duration-300 ${
          openIdx === idx ? 'border-white/15 bg-white/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'
        }`}>
          <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
            <span className="text-sm font-semibold text-[#f2eee7]">{faq.q}</span>
            <ChevronDown size={16} className={`shrink-0 text-[#6b7785] transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-48' : 'max-h-0'}`}>
            <p className="px-5 pb-4 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
