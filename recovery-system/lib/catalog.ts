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
    shortDescription: 'Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.',
    shortDescription_en: 'Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.',
    shortDescription_es: 'Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos.',
    description:
      'Noctip Halo fuses textile engineering with precision acoustic drivers to deliver rich, immersive sleep audio without the discomfort of in-ear devices. Designed for side sleepers and crafted from breathable, moisture-wicking knit, Halo stays comfortable all night. Removable modules allow safe machine washing and USB‑C fast charging ensures quick top-ups between nights.',
    description_en:
      'Noctip Halo fuses textile engineering with precision acoustic drivers to deliver rich, immersive sleep audio without the discomfort of in-ear devices. Designed for side sleepers and crafted from breathable, moisture-wicking knit, Halo stays comfortable all night. Removable modules allow safe machine washing and USB‑C fast charging ensures quick top-ups between nights.',
    description_es:
      'Noctip Halo combina ingeniería textil con drivers acústicos de precisión para ofrecer audio nocturno inmersivo sin la molestia de los auriculares intrauditivos. Diseñada para quienes duermen de lado, su tejido transpirable y que evacua la humedad permanece cómoda toda la noche. Los módulos son extraíbles para lavado y la carga rápida USB‑C permite recargas rápidas.',
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
    shortDescription: 'Compact ambient sound system with studio‑tuned sleep profiles and adaptive soft light.',
    shortDescription_en: 'Compact ambient sound system with studio‑tuned sleep profiles and adaptive soft light.',
    shortDescription_es: 'Sistema de sonido ambiental compacto con perfiles de sueño y luz suave adaptativa.',
    description:
      'Noctip Wave is a compact ambient sound system engineered to mask disruptive noise and guide the brain into deeper sleep states. Wave includes a library of studio‑tuned profiles (white, brown, ocean, rain, and bespoke blends), adaptive volume sensing and a gentle night light that fades as you fall asleep.',
    description_en:
      'Noctip Wave is a compact ambient sound system engineered to mask disruptive noise and guide the brain into deeper sleep states. Wave includes a library of studio‑tuned profiles (white, brown, ocean, rain, and bespoke blends), adaptive volume sensing and a gentle night light that fades as you fall asleep.',
    description_es:
      'Noctip Wave es un sistema de sonido ambiental compacto diseñado para enmascarar ruidos molestos y guiar al cerebro hacia un sueño más profundo. Incluye una biblioteca de perfiles (blanco, marrón, océano, lluvia) y una luz nocturna suave que se atenúa al dormirte.',
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
    shortDescription: 'Essential Bluetooth sleep headband with ultra-thin speakers for everyday rest.',
    shortDescription_en: 'Essential Bluetooth sleep headband with ultra-thin speakers for everyday rest.',
    shortDescription_es: 'Cinta Bluetooth esencial para dormir con altavoces ultrafinos para el descanso diario.',
    description:
      'Noctip Rest is the essential entry to sleep audio. A lightweight, washable headband with integrated Bluetooth speakers that deliver clear, balanced sound without ear pressure. Ideal for sleep, meditation and focus sessions. Simple setup, long battery life and a soft fabric that disappears once you put it on.',
    description_en:
      'Noctip Rest is the essential entry to sleep audio. A lightweight, washable headband with integrated Bluetooth speakers that deliver clear, balanced sound without ear pressure. Ideal for sleep, meditation and focus sessions. Simple setup, long battery life and a soft fabric that disappears once you put it on.',
    description_es:
      'Noctip Rest es la entrada esencial al audio de sueño. Una cinta ligera y lavable con altavoces Bluetooth integrados que ofrecen sonido claro y equilibrado sin presión en los oídos. Ideal para dormir, meditación y sesiones de concentración. Configuración sencilla, larga duración de batería y una tela suave que desaparece al ponértela.',
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
    shortDescription: 'Portable cervical massager with heat therapy and multiple intensity modes.',
    shortDescription_en: 'Portable cervical massager with heat therapy and multiple intensity modes.',
    shortDescription_es: 'Masajeador cervical portátil con terapia de calor y múltiples modos de intensidad.',
    description:
      'Noctip Relief combines ergonomic design with deep-kneading massage nodes and optional heat therapy to relieve cervical tension, desk fatigue and muscle stiffness. Three massage modes and adjustable intensity let you customize each session. Compact, rechargeable via USB‑C and ready to use anywhere — at your desk, on the couch or while traveling.',
    description_en:
      'Noctip Relief combines ergonomic design with deep-kneading massage nodes and optional heat therapy to relieve cervical tension, desk fatigue and muscle stiffness. Three massage modes and adjustable intensity let you customize each session. Compact, rechargeable via USB‑C and ready to use anywhere — at your desk, on the couch or while traveling.',
    description_es:
      'Noctip Relief combina un diseño ergonómico con nodos de masaje profundo y terapia de calor opcional para aliviar la tensión cervical, el cansancio de escritorio y la rigidez muscular. Tres modos de masaje e intensidad ajustable te permiten personalizar cada sesión. Compacto, recargable vía USB‑C y listo para usar en cualquier lugar.',
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
    shortDescription: 'Weighted sleep mask with aromatherapy insert and 100% blackout seal.',
    shortDescription_en: 'Weighted sleep mask with aromatherapy insert and 100% blackout seal.',
    shortDescription_es: 'Antifaz con peso con inserto de aromaterapia y sello de blackout 100%.',
    description:
      'Noctip Calm combines evenly distributed 150g of gentle weight with breathable velvet fabric and an optional lavender aromatherapy insert to reduce eye tension and accelerate sleep onset. The contoured nose bridge seal ensures complete blackout while the hypoallergenic fill stays comfortable against all skin types. Machine washable outer shell for easy maintenance.',
    description_en:
      'Noctip Calm combines evenly distributed 150g of gentle weight with breathable velvet fabric and an optional lavender aromatherapy insert to reduce eye tension and accelerate sleep onset. The contoured nose bridge seal ensures complete blackout while the hypoallergenic fill stays comfortable against all skin types. Machine washable outer shell for easy maintenance.',
    description_es:
      'Noctip Calm combina 150g de peso suave distribuido uniformemente con tejido de terciopelo transpirable y un inserto de aromaterapia de lavanda opcional para reducir la tensión ocular y acelerar el inicio del sueño. El sello contour del puente nasal garantiza un blackout completo mientras el relleno hipoalergénico se mantiene cómodo.',
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
