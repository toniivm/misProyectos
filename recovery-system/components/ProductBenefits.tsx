'use client';

import { motion } from 'framer-motion';
import { Heart, Moon, Zap, Shield, Feather, Battery } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getSlugFolder } from '../lib/product-images';

interface ProductBenefitsProps {
  slug: string;
}

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;

const BENEFITS: Record<string, { icon: any; es: { title: string; desc: string }; en: { title: string; desc: string } }[]> = {
  halo: [
    { icon: Moon, es: { title: 'Descansa mejor', desc: 'Abre tu vía aérea y eliminá los ronquidos desde la primera noche.' }, en: { title: 'Sleep better', desc: 'Opens your airway and stops snoring from night one.' } },
    { icon: Heart, es: { title: 'Tu pareja también duerme', desc: 'Sin ronquidos, ambos descansan. Relación y sueño mejoran.' }, en: { title: 'Your partner sleeps too', desc: 'No snoring means both of you rest. Relationship and sleep improve.' } },
    { icon: Zap, es: { title: 'Energía al despertar', desc: 'Sin fatiga matutina. Despiertas con energía real, no con café.' }, en: { title: 'Morning energy', desc: 'No morning fatigue. You wake up with real energy, not coffee.' } },
    { icon: Shield, es: { title: 'Grado médico', desc: 'Silicona hipoalergénica, segura para uso nocturno continuo.' }, en: { title: 'Medical grade', desc: 'Hypoallergenic silicone, safe for continuous nightly use.' } },
  ],
  rest: [
    { icon: Moon, es: { title: 'Te duermes escuchando', desc: 'Podcasts, música o ruido blanco. Sin auriculares que molesten.' }, en: { title: 'Fall asleep listening', desc: 'Podcasts, music, or white noise. No uncomfortable earbuds.' } },
    { icon: Battery, es: { title: 'Toda la noche', desc: '10 horas de batería. Desde que te acuestas hasta que suena el despertador.' }, en: { title: 'All night long', desc: '10 hours of battery. From bedtime to alarm.' } },
    { icon: Feather, es: { title: '45 gramos', desc: 'Tan ligera que la olvidas. Se lava a máquina.' }, en: { title: '45 grams', desc: 'So light you forget it. Machine washable.' } },
    { icon: Shield, es: { title: 'Sin cables', desc: 'Bluetooth 5.0. Se conecta solo. Sin apps, sin configuración.' }, en: { title: 'No wires', desc: 'Bluetooth 5.0. Connects automatically. No apps, no setup.' } },
  ],
  cervical: [
    { icon: Zap, es: { title: 'Alivio en 15 minutos', desc: 'Sesión automática. Tres capas de relajación profunda.' }, en: { title: 'Relief in 15 minutes', desc: 'Automatic session. Three layers of deep relaxation.' } },
    { icon: Heart, es: { title: 'Mejora la circulación', desc: 'Electrodos curvos que se adaptan a tu cuello.' }, en: { title: 'Improves circulation', desc: 'Curved electrodes that adapt to your neck.' } },
    { icon: Feather, es: { title: 'Úsalo en cualquier sitio', desc: 'Casa, oficina, sofá, viaje. Compacto y portátil.' }, en: { title: 'Use it anywhere', desc: 'Home, office, couch, travel. Compact and portable.' } },
    { icon: Shield, es: { title: 'Material premium', desc: 'ABS y TPR de alta calidad. No alergénico.' }, en: { title: 'Premium material', desc: 'High-quality ABS and TPR. Non-allergenic.' } },
  ],
  back: [
    { icon: Zap, es: { title: 'Postura en 2 semanas', desc: 'Reentrena tu cuerpo. Los resultados son visibles y duraderos.' }, en: { title: 'Posture in 2 weeks', desc: 'Retrains your body. Results are visible and lasting.' } },
    { icon: Heart, es: { title: 'Invisible bajo la ropa', desc: 'Nadie lo notará. Úsalo en el trabajo, en casa, donde quieras.' }, en: { title: 'Invisible under clothes', desc: 'Nobody will notice. Wear it at work, home, anywhere.' } },
    { icon: Feather, es: { title: 'Ultraligero', desc: 'Solo 120 gramos. No sabes que lo llevas puesto.' }, en: { title: 'Ultra-light', desc: 'Only 120 grams. You won\'t know you\'re wearing it.' } },
    { icon: Shield, es: { title: 'Se adapta a ti', desc: 'Correas de XS a XL. Para cualquier cuerpo.' }, en: { title: 'Fits you', desc: 'Straps from XS to XL. For any body.' } },
  ],
};

export default function ProductBenefits({ slug }: ProductBenefitsProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const folder = getSlugFolder(slug);
  const benefits = BENEFITS[slug] ?? BENEFITS.halo;

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
            <Heart size={18} className="text-[#10BFD8]" />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#f2eee7]">
              {isEs ? 'Beneficios reales' : 'Real benefits'}
            </h2>
            <p className="text-[13px] text-[#6b7785]">
              {isEs ? 'Lo que notarás desde el primer día.' : 'What you\'ll feel from day one.'}
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const content = isEs ? benefit.es : benefit.en;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: EASE_OUT }}
                className="group flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl border border-white/[0.06] bg-[#0d1219] overflow-hidden transition-all duration-300 hover:border-[rgba(16,191,216,0.15)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Image */}
                <div className="sm:w-[40%] aspect-[16/10] sm:aspect-auto flex items-center justify-center bg-[#080c12] overflow-hidden">
                  <img
                    src={`/images/${folder}/lifestyle/${idx + 1}.jpg`}
                    alt={content.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.benefit-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'benefit-placeholder flex flex-col items-center justify-center gap-3 text-[#2a3448] w-full h-full absolute inset-0';
                        placeholder.innerHTML = `
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                          </svg>
                          <span class="text-[11px] font-medium uppercase tracking-wider">${content.title}</span>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col justify-center p-5 sm:p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10BFD8]/10 shrink-0">
                      <Icon size={16} className="text-[#10BFD8]" />
                    </div>
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#f2eee7]">{content.title}</h3>
                  </div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#8791a1]">{content.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
