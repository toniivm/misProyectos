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
    { icon: Moon, title: 'Audio para la cama', titleEn: 'Audio for bedtime', description: 'Escucha música, podcasts o ruido blanco desde un dispositivo compatible.', descriptionEn: 'Listen to music, podcasts or white noise from a compatible device.' },
    { icon: Zap, title: 'Altavoces planos', titleEn: 'Flat speakers', description: 'Los altavoces van dentro de la banda, junto a las orejas.', descriptionEn: 'The speakers sit inside the headband, next to your ears.' },
    { icon: Heart, title: 'Formato de banda', titleEn: 'Headband format', description: 'Una alternativa a los auriculares intrauditivos para escuchar audio en la cama.', descriptionEn: 'An alternative to in-ear headphones for listening to audio in bed.' },
    { icon: Clock, title: 'Batería recargable', titleEn: 'Rechargeable battery', description: 'La ficha actual indica hasta 10 horas de reproducción.', descriptionEn: 'The current listing states up to 10 hours of playback.' },
    { icon: Shield, title: 'Altavoces extraíbles', titleEn: 'Removable speakers', description: 'Retira los altavoces antes de lavar la banda, siguiendo el manual.', descriptionEn: 'Remove the speakers before washing the headband, following the manual.' },
    { icon: Headphones, title: 'Bluetooth 5.0', titleEn: 'Bluetooth 5.0', description: 'Se conecta a móviles y otros dispositivos compatibles con Bluetooth.', descriptionEn: 'Connects to phones and other Bluetooth-compatible devices.' },
  ],
  halo: [
    { icon: Moon, title: 'Férula bucal ajustable', titleEn: 'Adjustable mouthpiece', description: 'Consulta las instrucciones de moldeado antes del primer uso.', descriptionEn: 'Read the fitting instructions before first use.' },
    { icon: Zap, title: 'Ajuste regulable', titleEn: 'Adjustable fit', description: 'El catálogo indica un rango de ajuste de hasta 10 mm.', descriptionEn: 'The catalogue lists an adjustment range of up to 10 mm.' },
    { icon: Heart, title: 'Composición visible', titleEn: 'Material composition', description: 'Revisa los materiales y las instrucciones del fabricante antes de usarla.', descriptionEn: 'Review the materials and manufacturer instructions before use.' },
    { icon: Clock, title: '30 noches de prueba', titleEn: '30-night trial', description: 'Se aplican las condiciones completas de devolución de Noctip.', descriptionEn: 'Noctip’s full return conditions apply.' },
    { icon: Shield, title: 'Limpieza diaria', titleEn: 'Daily cleaning', description: 'Límpiala después de cada uso según las instrucciones del fabricante.', descriptionEn: 'Clean it after each use following the manufacturer instructions.' },
    { icon: Headphones, title: 'Estuche incluido', titleEn: 'Case included', description: 'El catálogo indica que se incluye un estuche de viaje.', descriptionEn: 'The catalogue lists a travel case as included.' },
  ],
  wave: [
    { icon: Moon, title: 'Diseño en Y', titleEn: 'Y-shaped design', description: 'Las correas rodean los hombros y se ajustan con velcro.', descriptionEn: 'The straps wrap around the shoulders and adjust with hook-and-loop fasteners.' },
    { icon: Zap, title: 'Tallas XS–XL', titleEn: 'XS–XL sizes', description: 'Consulta la guía de tallas antes de elegir.', descriptionEn: 'Check the size guide before choosing.' },
    { icon: Heart, title: 'Correas regulables', titleEn: 'Adjustable straps', description: 'Ajusta las correas siguiendo las instrucciones del paquete.', descriptionEn: 'Adjust the straps following the instructions in the package.' },
    { icon: Clock, title: 'Uso según instrucciones', titleEn: 'Use as directed', description: 'Sigue las instrucciones de uso incluidas en el paquete.', descriptionEn: 'Follow the instructions included in the package.' },
    { icon: Shield, title: 'Ajuste bajo la ropa', titleEn: 'Under-clothing fit', description: 'Comprueba el ajuste con la ropa que sueles llevar.', descriptionEn: 'Check the fit with the clothing you usually wear.' },
    { icon: Headphones, title: 'Malla y correas', titleEn: 'Mesh and straps', description: 'Consulta los materiales y las instrucciones de lavado.', descriptionEn: 'Check the materials and washing instructions.' },
  ],
  'neck-massager': [
    { icon: Moon, title: 'Sesión programada', titleEn: 'Timed session', description: 'Sesiones de 15 minutos con temporizador automático, según la ficha del producto.', descriptionEn: '15-minute sessions with an automatic timer, according to the product specifications.' },
    { icon: Zap, title: 'Controles integrados', titleEn: 'Built-in controls', description: 'Consulta el manual para conocer los modos y controles del dispositivo.', descriptionEn: 'Check the manual for the device modes and controls.' },
    { icon: Heart, title: 'Uso en casa', titleEn: 'At-home use', description: 'Sigue las instrucciones de colocación y las precauciones del fabricante.', descriptionEn: 'Follow the placement instructions and precautions from the manufacturer.' },
    { icon: Clock, title: 'Temporizador', titleEn: 'Timer', description: 'El temporizador apaga la sesión automáticamente.', descriptionEn: 'The timer ends the session automatically.' },
    { icon: Shield, title: 'Materiales', titleEn: 'Materials', description: 'Consulta la composición y las advertencias antes del uso.', descriptionEn: 'Check the materials and warnings before use.' },
    { icon: Headphones, title: 'Controles sencillos', titleEn: 'Simple controls', description: 'El paquete incluye un manual de uso.', descriptionEn: 'A user manual is included in the package.' },
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
