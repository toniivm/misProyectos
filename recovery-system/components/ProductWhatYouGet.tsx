'use client';

import { motion } from 'framer-motion';
import { Package, Check } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ProductWhatYouGetProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

export default function ProductWhatYouGet({ slug }: ProductWhatYouGetProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

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
              {isEs ? 'Todo lo que necesitas, incluido.' : 'Everything you need, included.'}
            </p>
          </div>
        </div>

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
              <p className="mt-2 text-[13px] sm:text-[14px] text-[#6b7785] leading-[1.6]">
                {isEs
                  ? 'Próximamente podrás ver fotos reales de clientes con el producto.'
                  : 'Soon you\'ll be able to see real customer photos with the product.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
