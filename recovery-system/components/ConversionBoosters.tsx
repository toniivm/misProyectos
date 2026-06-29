'use client'

import { Star } from 'lucide-react'
import { useLocale } from 'next-intl'

// Trust badge strip
export function TrustStrip() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <div className="flex items-center justify-center gap-4 text-[11px] text-[#6b7785] py-2">
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? 'Envío gratis' : 'Free shipping'}
      </span>
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? '30 noches de garantía' : '30-night guarantee'}
      </span>
      <span className="flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        {isEs ? 'Pago seguro SSL' : 'SSL secure checkout'}
      </span>
    </div>
  )
}

// Product rating stars with count
export function RatingStars({ rating, count, size = 'sm' }: { rating: number; count: number; size?: 'sm' | 'lg' }) {
  const starSize = size === 'sm' ? 12 : 16
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-[13px]'

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={starSize}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
        ))}
      </div>
      <span className={`${textSize} text-[#8791a1]`}>
        {rating} ({count.toLocaleString()})
      </span>
    </div>
  )
}
