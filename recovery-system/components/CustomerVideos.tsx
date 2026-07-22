'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Play, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface VideoTestimonial {
  id: string
  name: string
  product: string
  thumbnail: string
  videoUrl?: string
  quote: string
  rating: number
}

const TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'v-1',
    name: 'María G.',
    product: 'Noctip Rest',
    thumbnail: '/images/rest/lifestyle/1.png',
    quote: 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos.',
    rating: 5,
  },
  {
    id: 'v-2',
    name: 'Carlos R.',
    product: 'Noctip Halo',
    thumbnail: '/images/halo/lifestyle/1.jpg',
    quote: 'Escéptico al principio, pero la diferencia es brutal. La uso todas las noches.',
    rating: 5,
  },
  {
    id: 'v-3',
    name: 'Laura M.',
    product: 'Noctip Back',
    thumbnail: '/images/rest/lifestyle/2.png',
    quote: 'Muy buena calidad. La uso 15 minutos al día y en dos semanas se me quitó el dolor de espalda.',
    rating: 5,
  },
  {
    id: 'v-4',
    name: 'Pedro L.',
    product: 'Noctip Rest',
    thumbnail: '/images/rest/lifestyle/3.png',
    quote: 'Mi mujer ronca y esto me salvó. La banda la noto como si no llevara nada.',
    rating: 5,
  },
]

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= rating ? '#f59e0b' : 'none'} stroke={star <= rating ? '#f59e0b' : '#374151'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function CustomerVideos() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 350)
  }

  return (
    <section className="py-16 sm:py-24 bg-[#080c12]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
                {isEs ? 'Historias reales' : 'Real stories'}
              </span>
              <h2 className="font-heading text-[24px] sm:text-[32px] font-bold text-[#f2eee7]">
                {isEs ? 'Lo que dicen nuestros clientes' : 'What our customers say'}
              </h2>
            </div>
            
            {/* Navigation arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Video carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                className="shrink-0 w-[300px] sm:w-[340px] snap-start rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden group"
              >
                {/* Thumbnail with play button */}
                <div className="relative aspect-[4/3] bg-[#111720]">
                  <img
                    src={testimonial.thumbnail}
                    alt={`${testimonial.name} - ${testimonial.product}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10BFD8] text-[#080c12] shadow-[0_4px_20px_rgba(16,191,216,0.4)]">
                      <Play size={22} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-[#080c12]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white">
                      {testimonial.product}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={testimonial.rating} size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#10BFD8]">
                      ✓ {isEs ? 'Verificada' : 'Verified'}
                    </span>
                  </div>
                  
                  <div className="relative mb-3">
                    <Quote size={14} className="absolute -top-1 -left-1 text-[#10BFD8]/20" />
                    <p className="text-[13px] leading-[1.6] text-[#c8d0da] pl-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                    <div className="w-8 h-8 rounded-full bg-[#10BFD8]/10 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-[#10BFD8]">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#f2eee7]">{testimonial.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
