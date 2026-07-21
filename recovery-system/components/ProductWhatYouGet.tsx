'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProductWhatYouGetProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const PRODUCT_PHOTOS: Record<string, string[]> = {
  'sleep-headband': [
    '/images/rest/lifestyle/1.png',
    '/images/rest/lifestyle/2.png',
    '/images/rest/lifestyle/3.png',
    '/images/rest/lifestyle/4.png',
    '/images/rest/lifestyle/5.png',
  ],
};

export default function ProductWhatYouGet({ slug }: ProductWhatYouGetProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const photos = PRODUCT_PHOTOS[slug];

  if (!photos || photos.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#10BFD8]/10">
            <Package size={16} className="text-[#10BFD8] sm:w-[18px] sm:h-[18px]" />
          </div>
          <h2 className="text-[17px] sm:text-[22px] font-bold tracking-[-0.03em] text-[#f2eee7]">
            {isEs ? 'Así es como llega a tu casa' : 'This is how it arrives at your home'}
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible">
          {photos.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="shrink-0 w-[150px] sm:w-auto snap-start rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden"
            >
              <div className="aspect-[3/4] flex items-center justify-center bg-[#080c12] p-1.5">
                <img
                  src={src}
                  alt={isEs ? 'Lo que recibes' : 'What you receive'}
                  className="h-full w-full object-cover rounded-lg"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
