'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Moon, Zap, Heart, Shield, Clock, Headphones } from 'lucide-react'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface ProductBenefitsProps {
  slug: string
}

interface Benefit {
  icon: any
  title: string
  titleEn: string
  description: string
  descriptionEn: string
}

const BENEFITS: Record<string, Benefit[]> = {
  'sleep-headband': [
    { icon: Moon, title: 'Audio sin presión', titleEn: 'Audio without pressure', description: 'Los altavoces planos van dentro del tejido: duermes de lado sin nada clavado en la oreja.', descriptionEn: 'Flat speakers sit inside the fabric: sleep on your side with nothing pressing your ear.' },
    { icon: Headphones, title: 'Bluetooth 5.0', titleEn: 'Bluetooth 5.0', description: 'Conecta tu móvil en segundos y pon tu podcast o ruido blanco. Sin apps.', descriptionEn: 'Connect your phone in seconds and play your podcast or white noise. No apps.' },
    { icon: Clock, title: 'Toda la noche', titleEn: 'All night long', description: 'Hasta 10 horas de batería: aguanta tu noche entera sin cargarla.', descriptionEn: 'Up to 10 hours of battery: lasts your whole night without a charge.' },
    { icon: Shield, title: 'Lavable a máquina', titleEn: 'Machine washable', description: 'Saca los altavoces y a la lavadora. Como nueva cada semana.', descriptionEn: 'Remove the speakers and machine wash it. Fresh every week.' },
    { icon: Zap, title: 'Talla única elástica', titleEn: 'One stretch size', description: 'Se adapta a cualquier cabeza. Nada que elegir ni medir.', descriptionEn: 'Stretches to fit any head. Nothing to choose or measure.' },
    { icon: Heart, title: 'Solo 45 g', titleEn: 'Just 45 g', description: 'Tan ligera que a los pocos minutos te olvidas de que la llevas puesta.', descriptionEn: 'So light you forget you are wearing it within minutes.' },
  ],
  halo: [
    { icon: Moon, title: 'Vía aérea abierta', titleEn: 'Open airway', description: 'Avanza suavemente la mandíbula para mantener la vía aérea abierta mientras duermes.', descriptionEn: 'Gently moves your jaw forward to keep your airway open while you sleep.' },
    { icon: Zap, title: 'Ajuste de 10 mm', titleEn: '10 mm adjustment', description: 'Micro-ajustes para que encaje en tu boca, no al revés.', descriptionEn: 'Micro-adjustments so it fits your mouth, not the other way around.' },
    { icon: Heart, title: 'Silicona de grado médico', titleEn: 'Medical-grade silicone', description: 'Suave, hipoalergénica y libre de BPA.', descriptionEn: 'Soft, hypoallergenic and BPA-free.' },
    { icon: Clock, title: 'Lista en minutos', titleEn: 'Ready in minutes', description: 'Se moldea en agua caliente: hervir y morder, y ya es tuya.', descriptionEn: 'Molds in hot water: boil and bite, and it is yours.' },
    { icon: Shield, title: 'Limpieza en segundos', titleEn: 'Cleans in seconds', description: 'Se enjuaga después de cada uso y lista para la noche siguiente.', descriptionEn: 'Rinse after each use and ready for the next night.' },
    { icon: Headphones, title: 'Estuche incluido', titleEn: 'Case included', description: 'Compacto: cabe en el neceser o en la maleta.', descriptionEn: 'Compact: fits in your washbag or suitcase.' },
  ],
  wave: [
    { icon: Zap, title: 'Hombros a su sitio', titleEn: 'Shoulders back', description: 'El diseño en Y devuelve los hombros atrás de forma natural.', descriptionEn: 'The Y-shape gently guides your shoulders back.' },
    { icon: Heart, title: 'Invisible debajo de la ropa', titleEn: 'Invisible under clothes', description: 'Ni se nota: camisa o camiseta por encima y listo.', descriptionEn: 'Nobody notices: shirt on top and done.' },
    { icon: Clock, title: '15 minutos al día', titleEn: '15 minutes a day', description: 'Un rato en casa basta para que el hábito se quede.', descriptionEn: 'A short session at home is all it takes for the habit to stick.' },
    { icon: Shield, title: 'Malla transpirable', titleEn: 'Breathable mesh', description: 'No da calor ni pica, ni en jornadas largas.', descriptionEn: 'No heat, no itch — even on long days.' },
    { icon: Moon, title: 'Tallas XS–XL', titleEn: 'XS–XL sizes', description: 'Correas de velcro que se ajustan a tu cuerpo.', descriptionEn: 'Hook-and-loop straps that adapt to your body.' },
    { icon: Headphones, title: '≈120 g', titleEn: '≈120 g', description: 'Ligero y portátil: llévalo al trabajo o de viaje.', descriptionEn: 'Light and portable: take it to work or on a trip.' },
  ],
  'neck-massager': [
    { icon: Moon, title: '15 minutos y listo', titleEn: '15 minutes and done', description: 'Calor suave y masaje con temporizador automático.', descriptionEn: 'Gentle heat and massage with an automatic timer.' },
    { icon: Zap, title: 'Sin cables', titleEn: 'Cordless', description: 'Úsalo en el sofá, en la oficina o de viaje.', descriptionEn: 'Use it on the sofa, at the office or while travelling.' },
    { icon: Heart, title: 'Se adapta a tu cuello', titleEn: 'Adapts to your neck', description: 'No aprieta y es suave al tacto.', descriptionEn: 'No pressure and soft to the touch.' },
    { icon: Clock, title: 'Solo 200 g', titleEn: 'Just 200 g', description: 'Ligero y compacto: 17 × 5 × 17 cm.', descriptionEn: 'Light and compact: 17 × 5 × 17 cm.' },
    { icon: Shield, title: 'Controles sencillos', titleEn: 'Simple controls', description: 'Se maneja solo, sin apps ni complicaciones.', descriptionEn: 'On-device controls. No apps, no fuss.' },
    { icon: Headphones, title: 'Donde estés', titleEn: 'Wherever you are', description: 'La sesión de 15 min que tu nuca pide al llegar a casa.', descriptionEn: 'The 15-min session your neck asks for after a long day.' },
  ],
}

export default function ProductBenefits({ slug }: ProductBenefitsProps) {
  const locale = useLocale()
  const isEs = locale === 'es'
  const benefits = BENEFITS[slug]

  if (!benefits) return null

  return (
    <section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
            {isEs ? 'Beneficios' : 'Benefits'}
          </span>
          <h2 className="font-heading text-[22px] sm:text-[28px] font-bold text-[#f2eee7]">
            {isEs ? 'Por qué te va a encantar' : 'Why you\'ll love it'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
              className="rounded-2xl border border-white/[0.06] bg-[#0d1219] p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10BFD8]/10">
                  <benefit.icon size={18} className="text-[#10BFD8]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#f2eee7]">
                    {isEs ? benefit.title : benefit.titleEn}
                  </h3>
                  <p className="text-[12px] leading-[1.5] text-[#8791a1] mt-1">
                    {isEs ? benefit.description : benefit.descriptionEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
