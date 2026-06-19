export type Category = {
  id: string
  slug: string
  name: string
  name_en?: string
  name_es?: string
  icon: string
  description: string
  description_en?: string
  description_es?: string
}

export type CatalogProduct = {
  slug: string
  name: string
  name_en?: string
  name_es?: string
  category: string
  price: number
  comparePrice: number
  rating: number
  reviewCount: number
  badge?: 'bestseller' | 'new' | 'deal' | 'trending'
  shortDescription: string
  shortDescription_en?: string
  shortDescription_es?: string
  description: string
  description_en?: string
  description_es?: string
  features: string[]
  specs: Record<string, string>
  images?: string[]
  icon: string
  cartIcon: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'sleep-audio',
    slug: 'sleep-audio',
    name: 'Sleep & Audio',
    name_en: 'Sleep & Audio',
    name_es: 'Sueño y audio',
    icon: '🎧',
    description: 'Precision-engineered audio devices designed to improve sleep quality through controlled sound environments.',
    description_en: 'Precision-engineered audio devices designed to improve sleep quality through controlled sound environments.',
    description_es: 'Dispositivos de audio de precisión diseñados para mejorar la calidad del sueño mediante entornos sonoros controlados.',
  },
  {
    id: 'neck-recovery',
    slug: 'neck-recovery',
    name: 'Neck & Recovery',
    name_en: 'Neck & Recovery',
    name_es: 'Cuello y recuperación',
    icon: '🧘',
    description: 'Professional-grade recovery tools for cervical relief, muscle tension and postural correction.',
    description_en: 'Professional-grade recovery tools for cervical relief, muscle tension and postural correction.',
    description_es: 'Herramientas de recuperación profesional para alivio cervical, tensión muscular y corrección postural.',
  },
  {
    id: 'sensory',
    slug: 'sensory',
    name: 'Sensory & Relaxation',
    name_en: 'Sensory & Relaxation',
    name_es: 'Sensorial y relajación',
    icon: '🌙',
    description: 'Tactile pressure tools and sensory aids engineered to accelerate the transition into deep rest.',
    description_en: 'Tactile pressure tools and sensory aids engineered to accelerate the transition into deep rest.',
    description_es: 'Herramientas de presión táctil y ayudas sensoriales diseñadas para acelerar la transición al descanso profundo.',
  },
]

export const CATALOG: CatalogProduct[] = [
  // ─── Sleep & Audio ───────────────────────────────────────────────
  {
    slug: 'sleepband-pro',
    name: 'Noctip Halo',
    name_en: 'Noctip Halo',
    name_es: 'Noctip Halo',
    category: 'sleep-audio',
    price: 17,
    comparePrice: 30,
    rating: 4.9,
    reviewCount: 1578,
    badge: 'bestseller',
    shortDescription: 'Ultra-thin acoustic headband — studio sound without ear pressure.',
    shortDescription_en: 'Ultra-thin acoustic headband — studio sound without ear pressure.',
    shortDescription_es: 'Banda acústica ultrafina — sonido de estudio sin presión en los oídos.',
    description:
      'You put on Halo. You stop hearing the world. Weighing just 55g, it feels like a normal headband — but the audio clarity rivals studio headphones. Designed for side sleepers, machine washable, USB-C fast charging. No cables, no pressure, no excuses. Fall asleep faster tonight.',
    description_en:
      'You put on Halo. You stop hearing the world. Weighing just 55g, it feels like a normal headband — but the audio clarity rivals studio headphones. Designed for side sleepers, machine washable, USB-C fast charging. No cables, no pressure, no excuses. Fall asleep faster tonight.',
    description_es:
      'Te pones la Halo. Dejas de oír el mundo. Pesa 55g, se siente como una cinta normal — pero la claridad del sonido rivaliza con auriculares de estudio. Diseñada para dormir de lado, lavable a máquina, carga rápida USB-C. Sin cables, sin presión, sin excusas. Duérmete más rápido esta noche.',
    features: [
      'Precision acoustic film drivers — studio-tuned for sleep',
      'Ergonomic wrap designed for side sleepers',
      'Breathable, moisture-wicking knit — machine washable',
      'Bluetooth Low Energy 5.x — stable + low power',
      'USB‑C fast charge — ~2 hours',
      'Featherlight: ~55g — unobtrusive all-night wear',
    ],
    specs: {
      'Battery life': '10 hours',
      'Charge time': '≈2 hours (USB‑C)',
      'Connectivity': 'Bluetooth LE 5.x',
      'Speaker type': 'Flat acoustic film drivers',
      'Material': 'Breathable microfiber knit',
      'Sizes': 'One size — stretch fit',
      'Weight': '≈55g',
    },
    images: [
      '/images/sleepband-pro-1.jpg',
      '/images/sleepband-pro-2.jpg',
      '/images/sleepband-pro-3.jpg',
    ],
    icon: '🎧',
    cartIcon: '🎧',
    color: '#0b0f14',
  },
  {
    slug: 'white-noise-pro',
    name: 'Noctip Wave',
    name_en: 'Noctip Wave',
    name_es: 'Noctip Wave',
    category: 'sleep-audio',
    price: 20,
    comparePrice: 32,
    rating: 4.8,
    reviewCount: 812,
    badge: 'new',
    shortDescription: 'Compact sound machine — 20 sleep profiles that shut off your brain.',
    shortDescription_en: 'Compact sound machine — 20 sleep profiles that shut off your brain.',
    shortDescription_es: 'Máquina de sonido compacta — 20 perfiles que apagan tu cerebro.',
    description:
      'Turn it on. Street noise disappears. 20 sound profiles tuned by audio engineers — not algorithms. Adaptive volume sensing adjusts to your room in real time. Soft amber night light fades automatically as you drift off. This is not a speaker. It is a switch for your brain.',
    description_en:
      'Turn it on. Street noise disappears. 20 sound profiles tuned by audio engineers — not algorithms. Adaptive volume sensing adjusts to your room in real time. Soft amber night light fades automatically as you drift off. This is not a speaker. It is a switch for your brain.',
    description_es:
      'Lo enciendes. El ruido de la calle desaparece. 20 perfiles de sonido sintonizados por ingenieros de audio — no por algoritmos. Detección adaptativa de volumen que se ajusta a tu habitación en tiempo real. Luz ámbar suave que se apaga sola cuando te quedas dormido. No es un altavoz. Es un interruptor para tu cerebro.',
    features: [
      'Studio‑tuned sleep profiles — curated for restorative rest',
      'Adaptive noise-level sensing — adjusts volume subtly',
      'Soft amber night light — 3 brightness modes',
      'USB‑C powered',
      'Compact 360° driver — balanced room fill',
      'Memory recall — last used profile + volume',
    ],
    specs: {
      'Sound options': '20 curated profiles',
      'Timer': '30 / 60 / 90 min or continuous',
      'Power': 'USB‑C',
      'Speaker': '5W full-range driver',
      'Night light': 'Amber LED — 3 levels',
      'Dimensions': '9 × 9 × 8 cm',
      'Weight': '210g',
    },
    images: [
      '/images/white-noise-pro-1.jpg',
      '/images/white-noise-pro-2.jpg',
      '/images/white-noise-pro-3.jpg',
    ],
    icon: '🔊',
    cartIcon: '🔊',
    color: '#131020',
  },
  {
    slug: 'sleep-headband',
    name: 'Noctip Rest',
    name_en: 'Noctip Rest',
    name_es: 'Noctip Rest',
    category: 'sleep-audio',
    price: 12,
    comparePrice: 22,
    rating: 4.4,
    reviewCount: 120,
    shortDescription: 'The perfect entry to sleep audio — 45g, 10 hours, zero complications.',
    shortDescription_en: 'The perfect entry to sleep audio — 45g, 10 hours, zero complications.',
    shortDescription_es: 'La entrada perfecta al audio de sueño — 45g, 10 horas, cero complicaciones.',
    description:
      'If you have never tried a sleep headband, start here. 45 grams. Machine washable. 10 hours of battery. No apps, no cables, no learning curve. You put it on and it works. Simple as that. The soft fabric disappears once you wear it — and you wake up wondering why you did not try this sooner.',
    description_en:
      'If you have never tried a sleep headband, start here. 45 grams. Machine washable. 10 hours of battery. No apps, no cables, no learning curve. You put it on and it works. Simple as that. The soft fabric disappears once you wear it — and you wake up wondering why you did not try this sooner.',
    description_es:
      'Si nunca has probado una banda de sueño, empieza aquí. 45 gramos. Lavable a máquina. 10 horas de batería. Sin apps, sin cables, sin curva de aprendizaje. Te la pones y funciona. Así de simple. La tela suave desaparece al ponértela — y despiertas preguntándote por qué no lo intentaste antes.',
    features: [
      'Bluetooth 5.0 — universal device compatibility',
      'Ultra-thin speakers — no ear pressure',
      'Machine washable — remove speakers in seconds',
      '8–10 hour battery — covers full night',
      'Moisture-wicking fabric — cool and breathable',
      'One-size stretch fit — adapts to any head shape',
    ],
    specs: {
      'Battery life': '8–10 hours',
      'Charge time': '≈1.5 hours (Micro-USB)',
      'Connectivity': 'Bluetooth 5.0',
      'Material': 'Polyester blend — moisture-wicking',
      'Sizes': 'One size — stretch fit',
      'Weight': '≈45g',
    },
    images: ['/images/products/sleep-headband.jpg'],
    icon: '🎧',
    cartIcon: '🎧',
    color: '#101828',
  },

  // ─── Neck & Recovery ─────────────────────────────────────────────
  {
    slug: 'neck-massager',
    name: 'Noctip Relief',
    name_en: 'Noctip Relief',
    name_es: 'Noctip Relief',
    category: 'neck-recovery',
    price: 15,
    comparePrice: 25,
    rating: 4.5,
    reviewCount: 210,
    shortDescription: '15 minutes. 3 modes. Heat up to 45°C. Your neck remembers tomorrow.',
    shortDescription_en: '15 minutes. 3 modes. Heat up to 45°C. Your neck remembers tomorrow.',
    shortDescription_es: '15 minutos. 3 modos. Calor hasta 45°C. Tu cuello lo recordará mañana.',
    description:
      'Your neck goes from "I cannot turn my head" to "all good" in 15 minutes. Three massage modes — knead, pulse, combination — plus heat therapy up to 45°C. Designed to use at your desk while you work. USB-C rechargeable. No cables. Automatic shut-off for safety. Your cervical tension does not stand a chance.',
    description_en:
      'Your neck goes from "I cannot turn my head" to "all good" in 15 minutes. Three massage modes — knead, pulse, combination — plus heat therapy up to 45°C. Designed to use at your desk while you work. USB-C rechargeable. No cables. Automatic shut-off for safety. Your cervical tension does not stand a chance.',
    description_es:
      'Tu cuello pasa de "no puedo girar la cabeza" a "todo bien" en 15 minutos. Tres modos de masaje — knead, pulse, combinación — más terapia de calor hasta 45°C. Diseñado para ponerte frente al ordenador y usarlo mientras trabajas. Recargable por USB-C. Sin cables. Apagado automático por seguridad. Tu tensión cervical no tiene ninguna posibilidad.',
    features: [
      'Deep-kneading massage nodes — 3 intensity levels',
      'Optional heat therapy — up to 45°C',
      'Ergonomic U-shape — conforms to cervical curve',
      'USB‑C rechargeable — 90 min per charge',
      'Automatic shut-off — 15 min safety timer',
      'Lightweight & portable — travel-ready',
    ],
    specs: {
      'Battery life': '90 minutes',
      'Heat levels': 'Up to 45°C',
      'Massage modes': '3 (knead, pulse, combinations)',
      'Charge': 'USB‑C',
      'Material': 'Soft-touch silicone + ABS',
      'Weight': '≈180g',
    },
    images: ['/images/products/neck-massager.jpg'],
    icon: '🧘',
    cartIcon: '🧘',
    color: '#121a24',
  },

  // ─── Sensory & Relaxation ─────────────────────────────────────────
  {
    slug: 'weighted-mask-pro',
    name: 'Noctip Calm',
    name_en: 'Noctip Calm',
    name_es: 'Noctip Calm',
    category: 'sensory',
    price: 11,
    comparePrice: 17,
    rating: 4.7,
    reviewCount: 512,
    badge: 'new',
    shortDescription: '150g of gentle pressure + real lavender. Your body gets the message.',
    shortDescription_en: '150g of gentle pressure + real lavender. Your body gets the message.',
    shortDescription_es: '150g de presión suave + lavanda real. Tu cuerpo entiende el mensaje.',
    description:
      '150g of evenly distributed gentle pressure that your body interprets as "it is time to sleep." Real lavender aromatherapy that activates your nervous system for rest. Total blackout — not a single ray of light. Contoured nose bridge seal. Hypoallergenic fill. Machine washable outer shell. Try it for one night. If you do not feel the difference, we refund every cent.',
    description_en:
      '150g of evenly distributed gentle pressure that your body interprets as "it is time to sleep." Real lavender aromatherapy that activates your nervous system for rest. Total blackout — not a single ray of light. Contoured nose bridge seal. Hypoallergenic fill. Machine washable outer shell. Try it for one night. If you do not feel the difference, we refund every cent.',
    description_es:
      '150g de presión suave distribuida uniformemente que tu cuerpo interpreta como "ya es hora de dormir". Aromaterapia de lavanda real que activa tu sistema nervioso para el descanso. Blackout total — ni un rayo de luz. Sello contour del puente nasal. Relleno hipoalergénico. Funda exterior lavable a máquina. Pruébalo una noche. Si no notas la diferencia, te devolvemos cada euro.',
    features: [
      'Evenly distributed 150g gentle weight',
      'Replaceable aromatherapy insert — lavender included',
      '100% blackout contoured nose bridge seal',
      'Breathable velvet outer — hypoallergenic fill',
      'Machine washable outer shell — remove insert',
      'Adjustable elastic strap — fits all head sizes',
    ],
    specs: {
      'Weight': '150g',
      'Insert': 'Aromatherapy sachet — dried lavender',
      'Outer': 'Breathable velvet — 100% polyester',
      'Fill': 'Hypoallergenic microbeads',
      'Washable': 'Outer shell — 30°C machine wash',
      'Strap': 'Elastic — adjustable 26–58 cm',
    },
    images: [
      '/images/weighted-mask-pro-1.jpg',
      '/images/weighted-mask-pro-2.jpg',
      '/images/weighted-mask-pro-3.jpg',
    ],
    icon: '😴',
    cartIcon: '😴',
    color: '#12101e',
  },
]

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === categoryId)
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug)
}

export function getBestSellers(): CatalogProduct[] {
  return CATALOG.filter((p) => p.badge === 'bestseller')
}

export function getDeals(): CatalogProduct[] {
  return CATALOG.filter((p) => p.badge === 'deal' || p.badge === 'trending')
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function getLocalizedCategoryName(category: Category, locale: string): string {
  return locale === 'es'
    ? category.name_es ?? category.name
    : category.name_en ?? category.name
}

export function getLocalizedCategoryDescription(category: Category, locale: string): string {
  return locale === 'es'
    ? category.description_es ?? category.description
    : category.description_en ?? category.description
}

export function getLocalizedProductName(product: CatalogProduct, locale: string): string {
  return locale === 'es'
    ? product.name_es ?? product.name
    : product.name_en ?? product.name
}

export function getLocalizedProductShortDescription(product: CatalogProduct, locale: string): string {
  return locale === 'es'
    ? product.shortDescription_es ?? product.shortDescription
    : product.shortDescription_en ?? product.shortDescription
}

export function searchProducts(query: string): CatalogProduct[] {
  if (!query.trim() || query.length < 2) return []
  const q = query.toLowerCase()
  return CATALOG.filter(
    (p) => {
      const searchableFields = [
        p.name,
        p.name_en,
        p.name_es,
        p.shortDescription,
        p.shortDescription_en,
        p.shortDescription_es,
        p.description,
        p.description_en,
        p.description_es,
        p.category,
      ].filter(Boolean) as string[]

      return searchableFields.some((value) => value.toLowerCase().includes(q))
    },
  ).slice(0, 6)
}
