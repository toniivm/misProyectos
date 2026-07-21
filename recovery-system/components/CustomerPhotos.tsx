'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Star, Video } from 'lucide-react';
import { useLocale } from 'next-intl';

interface CustomerPhoto {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
  video?: string;
  verified: boolean;
  date: string;
}

interface CustomerPhotosProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const MOCK_PHOTOS: Record<string, CustomerPhoto[]> = {
  'sleep-headband': [
    {
      id: 'sh-1',
      name: 'María G.',
      rating: 5,
      comment: 'Llevo una semana usándola y duermo como nunca. Me pongo un podcast y me quedo dormida en minutos. Lo mejor: no se mueve aunque duermas de lado.',
      image: '/images/rest/lifestyle/1.png',
      verified: true,
      date: '',
    },
    {
      id: 'sh-2',
      name: 'Carlos R.',
      rating: 5,
      comment: 'Skeptical al principio, pero la diferencia es brutal. Uso ruido blanco todas las noches y ahora no puedo dormir sin ella. Super cómoda.',
      image: '/images/rest/lifestyle/2.png',
      verified: true,
      date: '',
    },
    {
      id: 'sh-3',
      name: 'Laura M.',
      rating: 5,
      comment: 'Muy buena calidad de sonido para ser una banda. La tela es suave y no aprieta. La batería me dura toda la noche. Recomendada.',
      image: '/images/rest/lifestyle/3.png',
      verified: true,
      date: '',
    },
    {
      id: 'sh-4',
      name: 'Pedro L.',
      rating: 5,
      comment: 'Mi mujer ronca y esto me salvó. Me pongo auriculares normales y me duelen las orejas, esta banda la noto como si no llevara nada.',
      image: '/images/rest/lifestyle/4.png',
      verified: true,
      date: '',
    },
    {
      id: 'sh-5',
      name: 'Ana S.',
      rating: 5,
      comment: 'La lavé en la lavadora 3 veces ya y sigue como nueva. El Bluetooth conecta al instaje. Perfecta para viajar.',
      image: '/images/rest/lifestyle/5.png',
      verified: true,
      date: '',
    },
  ],
  halo: [
    {
      id: 'h-1',
      name: 'Javier P.',
      rating: 5,
      comment: 'Primera noche con ella y no ronqué. Mi mujer no lo podía creer. Llevaba años probando cosas diferentes.',
      image: '/images/halo/lifestyle/1.jpg',
      verified: true,
      date: '',
    },
    {
      id: 'h-2',
      name: 'Isabel F.',
      rating: 5,
      comment: 'Cómoda, no se cae, y funciona de verdad. El estuche es un plus para viajar.',
      image: '/images/halo/lifestyle/2.jpg',
      verified: true,
      date: '',
    },
    {
      id: 'h-3',
      name: 'Miguel A.',
      rating: 4,
      comment: 'Al principio me costó acostumbrarme, pero a los 3 días la notaba imprescindible. Duermo mejor y ronco menos.',
      image: '/images/halo/lifestyle/3.jpg',
      verified: true,
      date: '',
    },
  ],
};

export default function CustomerPhotos({ slug }: CustomerPhotosProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const photos = MOCK_PHOTOS[slug];

  if (!photos || photos.length === 0) return null;

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
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
              <Camera size={18} className="text-[#10BFD8]" />
            </div>
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
                {isEs ? 'Así lo usan nuestros clientes' : 'How our customers use it'}
              </h2>
              <p className="text-[13px] text-[#6b7785]">
                {isEs ? 'Fotos y opiniones reales.' : 'Real photos and reviews.'}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[#8791a1] transition hover:border-white/[0.15] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory"
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="shrink-0 w-[280px] sm:w-[300px] snap-start rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden"
            >
              {/* Photo/Video area */}
              <div className="aspect-square bg-[#080c12] flex items-center justify-center relative">
                {photo.video ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video size={32} className="text-[#2a3448]" />
                    <span className="absolute bottom-3 right-3 text-[10px] text-[#4a5568] bg-black/50 px-2 py-1 rounded">▶ Video</span>
                  </div>
                ) : photo.image ? (
                  <img src={photo.image} alt={`${photo.name} - foto de cliente`} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#2a3448]">
                    <Camera size={32} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      {isEs ? 'Foto del cliente' : 'Customer photo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Review content */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={star <= photo.rating ? 'fill-amber-400 text-amber-400' : 'text-[#2a3448]'}
                    />
                  ))}
                  {photo.verified && (
                    <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-[#10BFD8]">
                      ✓ {isEs ? 'Verificada' : 'Verified'}
                    </span>
                  )}
                </div>
                <p className="text-[13px] leading-[1.5] text-[#c8d0da] mb-3">&ldquo;{photo.comment}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#8791a1]">{photo.name}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* "Submit your photo" card */}
          <div className="shrink-0 w-[280px] sm:w-[300px] snap-start rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center min-h-[300px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10BFD8]/10 mb-3">
              <Camera size={20} className="text-[#10BFD8]" />
            </div>
            <p className="text-[14px] font-semibold text-[#f2eee7] mb-1">
              {isEs ? '¿Has comprado este producto?' : 'Have you bought this product?'}
            </p>
            <p className="text-[12px] text-[#6b7785]">
              {isEs ? 'Envía tu foto y ayuda a otros a decidir.' : 'Send your photo and help others decide.'}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
