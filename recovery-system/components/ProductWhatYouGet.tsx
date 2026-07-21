'use client';

import { motion } from 'framer-motion';
import { Package, Check, Star } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProductWhatYouGetProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const CUSTOMER_PHOTOS: Record<string, { src: string; name: string; rating: number; comment: string }[]> = {
  'sleep-headband': [
    { src: '/images/rest/lifestyle/1.png', name: 'Cliente verificada', rating: 5, comment: 'Excelente producto, duermo mucho mejor' },
    { src: '/images/rest/lifestyle/2.png', name: 'Cliente verificada', rating: 5, comment: 'Muy cómoda, no se mueve al dormir' },
    { src: '/images/rest/lifestyle/3.png', name: 'Cliente verificada', rating: 5, comment: 'Perfecta para dormir de lado' },
    { src: '/images/rest/lifestyle/4.png', name: 'Cliente verificada', rating: 5, comment: 'La batería me dura toda la noche' },
    { src: '/images/rest/lifestyle/5.png', name: 'Cliente verificada', rating: 5, comment: 'Muy buena calidad de sonido' },
  ],
};

export default function ProductWhatYouGet({ slug }: ProductWhatYouGetProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const photos = CUSTOMER_PHOTOS[slug];

  return (
    <section className="mt-12 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
            <Package size={18} className="text-[#10BFD8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? '¿Qué recibirás en casa?' : 'What will you receive?'}
            </h2>
            <p className="text-[13px] text-[#6b7785]">
              {isEs ? 'Fotos reales de nuestros clientes.' : 'Real photos from our customers.'}
            </p>
          </div>
        </div>

        {photos && photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                className="group relative rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden transition-all duration-300 hover:border-[rgba(16,191,216,0.15)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="aspect-[4/5] flex items-center justify-center bg-[#080c12] p-2">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={10} className={star <= photo.rating ? 'fill-amber-400 text-amber-400' : 'text-[#2a3448]'} />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-[12px] leading-[1.4] text-[#8791a1] line-clamp-2">{photo.comment}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10">
                <Check size={20} className="text-[#10BFD8]" />
              </div>
              <div>
                <p className="text-[15px] sm:text-[16px] font-semibold text-[#f2eee7] leading-[1.6]">
                  {isEs
                    ? 'Recibirás tu producto directamente en tu hogar. Empaquetado con cuidado, listo para usar desde el primer momento.'
                    : 'You\'ll receive your product directly at your home. Carefully packaged, ready to use from the first moment.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
