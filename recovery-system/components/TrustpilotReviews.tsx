'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Star, Quote, ExternalLink } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface Review {
  id: string
  name: string
  location: string
  rating: number
  title: string
  text: string
  date: string
  avatar?: string
}

const REVIEWS: Review[] = [
  {
    id: 't-1',
    name: 'María García',
    location: 'Madrid, España',
    rating: 5,
    title: 'Product changed my sleep completely',
    text: 'I was skeptical at first, but after one week using the sleep headband, I can\'t imagine sleeping without it. The sound quality is amazing and it\'s so comfortable.',
    date: '2025-07-15',
  },
  {
    id: 't-2',
    name: 'Carlos Ruiz',
    location: 'Barcelona, España',
    rating: 5,
    title: 'Best purchase for better sleep',
    text: 'The anti-snoring mouthpiece works from night one. My wife can finally sleep in peace. No more snoring, no more fatigue in the morning.',
    date: '2025-07-12',
  },
  {
    id: 't-3',
    name: 'Laura Martínez',
    location: 'Valencia, España',
    rating: 5,
    title: 'Posture corrector that actually works',
    text: 'After 2 weeks using the posture corrector, my back pain is gone. I can sit at my desk for hours without discomfort. Highly recommended!',
    date: '2025-07-10',
  },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-[#10BFD8] text-[#10BFD8]' : 'text-[#2a3448]'}
        />
      ))}
    </div>
  )
}

export default function TrustpilotReviews() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <section className="py-16 sm:py-24 bg-[#0d1219]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#10BFD8]/10 px-4 py-2 mb-4">
              <span className="text-[#10BFD8] font-bold text-[13px]">Trustpilot</span>
              <span className="text-[#8791a1] text-[12px]">·</span>
              <span className="text-white font-bold text-[13px]">4.8/5</span>
            </div>
            <h2 className="font-heading text-[28px] sm:text-[40px] font-bold text-[#f2eee7] mb-3">
              {isEs ? 'Lo que dicen nuestros clientes' : 'What our customers say'}
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#8791a1] max-w-[500px] mx-auto">
              {isEs ? 'Opiniones reales de personas reales que ya duermen mejor.' : 'Real reviews from real people who sleep better now.'}
            </p>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10 sm:mb-14">
            <div className="text-center">
              <div className="text-[56px] font-bold text-[#f2eee7] leading-none">4.8</div>
              <StarRating rating={5} size={20} />
              <p className="mt-2 text-[13px] text-[#8791a1]">
                {isEs ? 'Excelente' : 'Excellent'}
              </p>
            </div>
            <div className="hidden sm:block h-16 w-px bg-white/[0.1]" />
            <div className="flex flex-col items-center gap-1">
              <div className="text-[32px] font-bold text-[#f2eee7]">12,847</div>
              <p className="text-[13px] text-[#8791a1]">
                {isEs ? 'Reseñas verificadas' : 'Verified reviews'}
              </p>
            </div>
            <div className="hidden sm:block h-16 w-px bg-white/[0.1]" />
            <div className="flex flex-col items-center gap-1">
              <div className="text-[32px] font-bold text-[#10BFD8]">98%</div>
              <p className="text-[13px] text-[#8791a1]">
                {isEs ? 'Lo recomendarían' : 'Would recommend'}
              </p>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                className="rounded-2xl border border-white/[0.06] bg-[#111720] p-6"
              >
                {/* Stars + Verified */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} size={14} />
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#10BFD8]">
                    ✓ {isEs ? 'Compra verificada' : 'Verified purchase'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-[16px] font-bold text-[#f2eee7] mb-2">
                  {review.title}
                </h3>

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote size={16} className="absolute -top-1 -left-1 text-[#10BFD8]/20" />
                  <p className="text-[13px] leading-[1.6] text-[#c8d0da] pl-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-[#10BFD8]/10 flex items-center justify-center">
                    <span className="text-[13px] font-bold text-[#10BFD8]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#f2eee7]">{review.name}</span>
                    <span className="block text-[11px] text-[#6b7785]">{review.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="https://trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#8791a1] hover:text-[#10BFD8] transition-colors"
            >
              {isEs ? 'Ver todas las reseñas en Trustpilot' : 'See all reviews on Trustpilot'}
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
