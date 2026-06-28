'use client'
import { Star } from 'lucide-react'
export default function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'} />
      ))}
    </span>
  )
}
