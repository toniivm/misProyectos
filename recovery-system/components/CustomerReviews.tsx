'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from 'lucide-react';
import { useLocale } from 'next-intl';

interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image?: string;
  avatar?: string;
  verified: boolean;
  date: string;
}

interface CustomerReviewsProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const REVIEWS: Record<string, CustomerReview[]> = {
  'sleep-headband': [
    {
      id: 'sr-1',
      name: 'María García',
      location: 'Madrid, España',
      rating: 5,
      comment: 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos. Lo mejor: no se mueve aunque duermas de lado.',
      image: '/images/rest/lifestyle/1.png',
      avatar: '/images/rest/lifestyle/1.png',
      verified: true,
      date: '2025-07-15',
    },
    {
      id: 'sr-2',
      name: 'Carlos Ruiz',
      location: 'Barcelona, España',
      rating: 5,
      comment: 'Escéptico al principio, pero la diferencia es brutal. Uso ruido blanco todas las noches y ahora no puedo dormir sin ella. Súper cómoda.',
      image: '/images/rest/lifestyle/2.png',
      avatar: '/images/rest/lifestyle/2.png',
      verified: true,
      date: '2025-07-12',
    },
    {
      id: 'sr-3',
      name: 'Laura Martínez',
      location: 'Valencia, España',
      rating: 5,
      comment: 'Muy buena calidad de sonido para ser una banda. La tela es suave y no aprieta. La batería me dura toda la noche. Recomendada 100%.',
      image: '/images/rest/lifestyle/3.png',
      avatar: '/images/rest/lifestyle/3.png',
      verified: true,
      date: '2025-07-10',
    },
    {
      id: 'sr-4',
      name: 'Pedro López',
      location: 'Sevilla, España',
      rating: 5,
      comment: 'Mi mujer ronca y esto me salvó. Me pongo auriculares normales y me duelen las orejas, esta banda la noto como si no llevara nada.',
      image: '/images/rest/lifestyle/4.png',
      avatar: '/images/rest/lifestyle/4.png',
      verified: true,
      date: '2025-07-08',
    },
    {
      id: 'sr-5',
      name: 'Ana Sánchez',
      location: 'Bilbao, España',
      rating: 5,
      comment: 'La lavé en la lavadora 3 veces ya y sigue como nueva. El Bluetooth conecta al instante. Perfecta para viajar. La recomiendo.',
      image: '/images/rest/lifestyle/5.png',
      avatar: '/images/rest/lifestyle/5.png',
      verified: true,
      date: '2025-07-05',
    },
  ],
  halo: [
    {
      id: 'hr-1',
      name: 'Javier Pérez',
      location: 'Zaragoza, España',
      rating: 5,
      comment: 'Primera noche con ella y no ronqué. Mi mujer no lo podía creer. Llevaba años probando cosas diferentes y esto fue lo que funcionó.',
      verified: true,
      date: '2025-07-14',
    },
    {
      id: 'hr-2',
      name: 'Isabel Fernández',
      location: 'Málaga, España',
      rating: 5,
      comment: 'Cómoda, no se cae, y funciona de verdad. El estuche es un plus para viajar. Muy contenta con la compra.',
      verified: true,
      date: '2025-07-11',
    },
    {
      id: 'hr-3',
      name: 'Miguel Ángel Torres',
      location: 'Alicante, España',
      rating: 4,
      comment: 'Al principio me costó acostumbrarme, pero a los 3 días la notaba imprescindible. Duermo mejor y ronco menos.',
      verified: true,
      date: '2025-07-09',
    },
  ],
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-[#2a3448]'}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews({ slug }: CustomerReviewsProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reviews = REVIEWS[slug];

  if (!reviews || reviews.length === 0) return null;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  return (
    <section className="mt-12 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
              <Camera size={18} className="text-[#10BFD8]" />
            </div>
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
                {isEs ? 'Lo que dicen nuestros clientes' : 'What our customers say'}
              </h2>
              <p className="text-[13px] text-[#6b7785]">
                {isEs ? 'Fotos reales de personas reales.' : 'Real photos from real people.'}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Rating summary */}
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#0d1219] border border-white/[0.06]">
          <div className="text-center px-4">
            <div className="text-[32px] font-bold text-[#f2eee7]">4.9</div>
            <StarRating rating={5} size={16} />
            <div className="text-[12px] text-[#6b7785] mt-1">
              {reviews.length} {isEs ? 'reseñas verificadas' : 'verified reviews'}
            </div>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = star >= 4 ? Math.floor(Math.random() * 3) + 1 : 0;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-3 text-[11px] text-[#8791a1]">{star}</span>
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="shrink-0 w-[280px] sm:w-[320px] snap-start rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden"
            >
              {/* Photo */}
              {review.image && (
                <div className="aspect-[4/3] bg-[#080c12] flex items-center justify-center overflow-hidden">
                  <img
                    src={review.image}
                    alt={`${review.name} - foto de cliente`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {/* Stars + verified */}
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={review.rating} size={12} />
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#10BFD8]">
                      <BadgeCheck size={12} />
                      {isEs ? 'Compra verificada' : 'Verified purchase'}
                    </span>
                  )}
                </div>

                {/* Quote */}
                <div className="relative mb-3">
                  <Quote size={16} className="absolute -top-1 -left-1 text-[#10BFD8]/20" />
                  <p className="text-[13px] leading-[1.6] text-[#c8d0da] pl-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#10BFD8]/10 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-[#10BFD8]">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-[12px] font-semibold text-[#f2eee7]">{review.name}</span>
                    <span className="block text-[10px] text-[#6b7785]">{review.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
