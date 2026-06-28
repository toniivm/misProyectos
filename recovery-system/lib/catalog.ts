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
  video?: string
  icon: string
  cartIcon: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'sleep-audio',
    slug: 'sleep-audio',
    name: 'Sleep & Anti-Snoring',
    name_en: 'Sleep & Anti-Snoring',
    name_es: 'Sueño y anti-ronquidos',
    icon: '',
    description: 'Anti-snoring mouthpieces and sleep audio technology for deeper, quieter rest.',
    description_en: 'Anti-snoring mouthpieces and sleep audio technology for deeper, quieter rest.',
    description_es: 'Férulas anti-ronquidos y tecnología de audio para dormir para un descanso más profundo y silencioso.',
  },
  {
    id: 'neck-recovery',
    slug: 'neck-recovery',
    name: 'Posture & Recovery',
    name_en: 'Posture & Recovery',
    name_es: 'Postura y recuperación',
    icon: '',
    description: 'Posture correction and cervical massage tools for pain relief and muscle recovery.',
    description_en: 'Posture correction and cervical massage tools for pain relief and muscle recovery.',
    description_es: 'Correctores posturales y masajeadores cervicales para alivio del dolor y recuperación muscular.',
  },
]

export const CATALOG: CatalogProduct[] = [
  // ─── Sleep & Audio ───────────────────────────────────────────────
  {
    slug: 'halo',
    name: 'Noctip Halo',
    name_en: 'Noctip Halo',
    name_es: 'Noctip Halo',
    category: 'sleep-audio',
    price: 17,
    comparePrice: 30,
    rating: 4.9,
    reviewCount: 1578,
    badge: 'bestseller',
    shortDescription: 'Elimina los ronquidos desde la primera noche. Tu pareja también dormirá mejor.',
    shortDescription_en: 'Stop snoring from night one. Your partner sleeps better too.',
    shortDescription_es: 'Elimina los ronquidos desde la primera noche. Tu pareja también dormirá mejor.',
    description:
      'Cada noche que roncas, arruinas tu descanso y el de tu pareja. El Noctip Halo resuelve el problema en su origen: avanza suavemente la mandíbula para abrir la vía aérea, eliminando los ronquidos antes de que empiecen.\n\nEl diseño ajustable de doble capa se adapta perfectamente a tu boca con 10mm de micro-ajustes. Silicona de grado médico, hipoalergénica, suave y segura para uso nocturno. Incluye estuche de viaje compacto.\n\nDesde la primera noche notarás la diferencia. Despiertas descansado, sin fatiga, sin dolor de garganta. Y tu pareja endulza por fin en silencio.',
    description_en:
      'Every night you snore, you ruin your rest — and your partner\'s. The Noctip Halo fixes the problem at its source: it gently advances your jaw to open your airway, stopping snoring before it starts.\n\nThe adjustable dual-layer design fits your mouth perfectly with 10mm of micro-adjustments. Medical-grade silicone, hypoallergenic, soft and safe for nightly use. Includes compact travel case.\n\nFrom night one you\'ll feel the difference. You wake up rested, no fatigue, no sore throat. And your partner finally sleeps in silence.',
    description_es:
      'Cada noche que roncas, arruinas tu descanso y el de tu pareja. El Noctip Halo resuelve el problema en su origen: avanza suavemente la mandíbula para abrir la vía aérea, eliminando los ronquidos antes de que empiecen.\n\nEl diseño ajustable de doble capa se adapta perfectamente a tu boca con 10mm de micro-ajustes. Silicona de grado médico, hipoalergénica, suave y segura para uso nocturno. Incluye estuche de viaje compacto.\n\nDesde la primera noche notarás la diferencia. Despiertas descansado, sin fatiga, sin dolor de garganta. Y tu pareja duerme por fin en silencio.',
    features: [
      'Elimina ronquidos desde la primera noche — abre tu vía aérea',
      'Ajuste personalizado — 10mm de micro-ajustes para tu boca',
      'Silicona de grado médico — suave, hipoalergénica, segura',
      'Diseño de doble capa — sujeta la mandíbula en posición natural',
      'Estuche de viaje incluido — compacto y discreto',
      'Reutilizable y fácil de limpiar — moldeado hervir y morder',
    ],
    specs: {
      'Tipo': 'Férula de avanzamiento mandibular anti-ronquidos',
      'Ajuste': 'Rango de 10mm — micro-ajustes individuales',
      'Material': 'Silicona médica libre de BPA',
      'Diseño': 'Doble capa — bandejas superior e inferior',
      'Moldeado': 'Hervir y morder — ajuste personalizado',
      'Incluye': 'Férula + estuche de viaje',
      'Reutilizable': 'Sí — lavable y duradera',
    },
    images: [
      '/images/productoenmanoBOCAL7ff06e72e080402ab77f9caff42355d4G.jpg_960x960q75.jpg_.avif',
      '/images/A1d0d6d78560vajabocal450f9a75fafc39b73f99V.jpg_960x960q75.jpg_.avif',
      '/images/bovcallSdfea8c2fdb1c4e108eadbf7625aeae0f9.jpg_220x220q75.jpg_.avif',
      '/images/otra bocalS778ec5f80416463a90e4d9100180b0efU.jpg_220x220q75.jpg_.avif',
    ],
    icon: '',
    cartIcon: '',
    color: '#0b0f14',
  },
  {
    slug: 'wave',
    name: 'Noctip Wave',
    name_en: 'Noctip Wave',
    name_es: 'Noctip Wave',
    category: 'neck-recovery',
    price: 20,
    comparePrice: 32,
    rating: 4.8,
    reviewCount: 812,
    badge: 'new',
    shortDescription: 'Corrige tu postura en 2 semanas. Adiós al dolor de espalda del escritorio.',
    shortDescription_en: 'Fix your posture in 2 weeks. Goodbye desk back pain.',
    shortDescription_es: 'Corrige tu postura en 2 semanas. Adiós al dolor de espalda del escritorio.',
    description:
      'Tu columna recuerda la mala postura. Cada hora encorvado frente al ordenador se acumula y termina en dolor crónico. El Noctip Wave reentrena tu postura con soporte ergonómico en forma de Y que jala tus hombros hacia atrás suavemente.\n\nCorreas ajustables de XS a XL, se adapta a cualquier cuerpo. Úsalo debajo de la ropa — nadie lo notará. Solo 15 minutos al día son suficientes para reconstruir el hábito.\n\nEn dos semanas, tu cuerpo recuerda solo. Sin dolor, sin esfuerzo consciente. Tu quiropráctico notará la diferencia.',
    description_en:
      'Your spine remembers bad posture. Every hour hunched over your desk accumulates into chronic pain. The Noctip Wave retrains your posture with ergonomic Y-shaped support that gently pulls your shoulders back.\n\nAdjustable straps from XS to XL, fits any body. Wear it under your clothes — nobody will notice. Just 15 minutes a day is enough to rebuild the habit.\n\nIn two weeks, your body remembers on its own. No pain, no conscious effort. Your chiropractor will notice the difference.',
    description_es:
      'Tu columna recuerda la mala postura. Cada hora encorvado frente al ordenador se acumula y termina en dolor crónico. El Noctip Wave reentrena tu postura con soporte ergonómico en forma de Y que jala tus hombros hacia atrás suavemente.\n\nCorreas ajustables de XS a XL, se adapta a cualquier cuerpo. Úsalo debajo de la ropa — nadie lo notará. Solo 15 minutos al día son suficientes para reconstruir el hábito.\n\nEn dos semanas, tu cuerpo recuerda solo. Sin dolor, sin esfuerzo consciente. Tu quiropráctico notará la diferencia.',
    features: [
      'Corrige la postura naturalmente — soporte en forma de Y',
      'Se adapta a tu cuerpo — correas ajustables de XS a XL',
      'Invisible bajo la ropa — nadie lo notará',
      'Malla transpirable — comodidad todo el día',
      'Resultados visibles en 2 semanas — antes y después real',
      'Ligero y portátil — llévalo a cualquier parte',
    ],
    specs: {
      'Tipo': 'Corrector postural en forma de Y',
      'Tallas': 'XS / S / M / L / XL',
      'Material': 'Malla transpirable + correas reforzadas',
      'Ajuste': 'Correas de velcro — posiciones ilimitadas',
      'Peso': '≈120g',
      'Cuidado': 'Lavar a mano — secar al aire',
      'Guía de tallas': 'Medición de ancho de pecho incluida',
    },
    images: [
      '/images/productos-reales/weighted-mask-pro.webp',
      '/images/weighted-mask-pro-1.webp',
      '/images/weighted-mask-pro-2.webp',
      '/images/weighted-mask-pro-3.webp',
    ],
    icon: '',
    cartIcon: '',
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
    shortDescription: 'Audio para dormir sin auriculares. 45 gramos que desaparecen al ponértelos.',
    shortDescription_en: 'Sleep audio without earbuds. 45 grams that disappear when you wear them.',
    shortDescription_es: 'Audio para dormir sin auriculares. 45 gramos que desaparecen al ponértelos.',
    description:
      'Si nunca has probado una banda de sueño, empieza aquí. 45 gramos que no sientes. Lavable a máquina. 10 horas de batería. Sin apps, sin cables, sin curva de aprendizaje.\n\nTe la pones y funciona. Así de simple. Los altavoces ultrafinos no presionan tus orejas — la tela suave desaparece al ponértela. Conecta por Bluetooth a tu móvil y duerme con tu podcast, música o ruido blanco favorito.\n\nDespiertas preguntándote por qué no lo intentaste antes.',
    description_en:
      'If you\'ve never tried a sleep headband, start here. 45 grams you won\'t feel. Machine washable. 10 hours of battery. No apps, no cables, no learning curve.\n\nYou put it on and it works. That simple. Ultra-thin speakers don\'t press your ears — the soft fabric disappears when you wear it. Bluetooth connects to your phone and you sleep with your favorite podcast, music, or white noise.\n\nYou wake up wondering why you didn\'t try this sooner.',
    description_es:
      'Si nunca has probado una banda de sueño, empieza aquí. 45 gramos que no sientes. Lavable a máquina. 10 horas de batería. Sin apps, sin cables, sin curva de aprendizaje.\n\nTe la pones y funciona. Así de simple. Los altavoces ultrafinos no presionan tus orejas — la tela suave desaparece al ponértela. Conecta por Bluetooth a tu móvil y duerme con tu podcast, música o ruido blanco favorito.\n\nDespiertas preguntándote por qué no lo intentaste antes.',
    features: [
      'Bluetooth 5.0 — se conecta a cualquier dispositivo',
      'Altavoces ultrafinos — sin presión en las orejas',
      'Lavable a máquina — retira los altavoces en segundos',
      '8–10 horas de batería — cubre toda la noche',
      'Tela transpirable — fresca y cómoda',
      'Talla única elástica — se adapta a cualquier forma de cabeza',
    ],
    specs: {
      'Batería': '8–10 horas',
      'Carga': '≈1.5 horas (Micro-USB)',
      'Conectividad': 'Bluetooth 5.0',
      'Material': 'Mezcla de poliéster — transpirable',
      'Tallas': 'Talla única — elástica',
      'Peso': '≈45g',
    },
    images: [
      '/images/sleepband-pro-1.webp',
      '/images/sleepband-pro-2.webp',
      '/images/sleepband-pro-3.webp',
      '/images/productos-reales/sleepband-pro.avif',
      '/images/productos-reales/sleepband-pro-2.avif',
    ],
    icon: '',
    cartIcon: '',
    color: '#101828',
  },
 
  // ─── Neck & Recovery ─────────────────────────────────────────────
  {
    slug: 'neck-massager',
    name: 'Noctip Cervical',
    name_en: 'Noctip Cervical',
    name_es: 'Noctip Cervical',
    category: 'neck-recovery',
    price: 15,
    comparePrice: 25,
    rating: 4.6,
    reviewCount: 722,
    badge: 'bestseller',
    shortDescription: 'Alivio cervical profesional en 15 minutos. Tres capas de relajación.',
    shortDescription_en: 'Professional cervical relief in 15 minutes. Three layers of relaxation.',
    shortDescription_es: 'Alivio cervical profesional en 15 minutos. Tres capas de relajación.',
    description:
      'Almohadillas de electrodos curvos pintados con aerosol mate que se adaptan a cualquier tipo de cuello, cómodas y no alergénicas. Tres capas de relajación — desde los nervios hasta los vasos sanguíneos y los músculos — masajean profundamente tu cuello para un alivio real.\n\nPequeño y portátil. Cada sesión de 15 minutos es tan cómoda como un masajista profesional en un SPA. Diseñado para uso diario en casa, oficina o viaje.\n\nEl masaje de 15 minutos libera la tensión acumulada y mejora la circulación. Resultados visibles desde la primera semana de uso.',
    description_en:
      'Curved electrode pads with matte spray finish that adapt to any neck type — comfortable and non-allergenic. Three layers of relaxation — from nerves to blood vessels and muscles — deeply massage your neck for real relief.\n\nSmall and portable. Each 15-minute session is as comfortable as a professional spa masseuse. Designed for daily use at home, office, or on the go.\n\nThe 15-minute massage releases accumulated tension and improves circulation. Visible results from the first week of use.',
    description_es:
      'Almohadillas de electrodos curvos pintados con aerosol mate que se adaptan a cualquier tipo de cuello, cómodas y no alergénicas. Tres capas de relajación — desde los nervios hasta los vasos sanguíneos y los músculos — masajean profundamente tu cuello para un alivio real.\n\nPequeño y portátil. Cada sesión de 15 minutos es tan cómoda como un masajista profesional en un SPA. Diseñado para uso diario en casa, oficina o viaje.\n\nEl masaje de 15 minutos libera la tensión acumulada y mejora la circulación. Resultados visibles desde la primera semana de uso.',
    features: [
      'Electrodos curvos con acabado mate — se adaptan a cualquier cuello',
      'Tres capas de relajación — nervios, vasos sanguíneos y músculos',
      'Sesión de 15 minutos — temporización automática',
      'Compacto y portátil — úsalo donde quieras',
      'No alergénico — material de alta calidad',
      'Uso en casa, oficina o viaje',
    ],
    specs: {
      'Tipo': 'Masajeador cervical con electrodos curvos',
      'Material': 'ABS y TPR',
      'Peso': '200g',
      'Dimensiones': '17 × 5 × 17 cm',
      'Color': 'Blanco',
      'Tiempo de masaje': '15 minutos (temporización automática)',
      'Electrónico': 'Sí',
      'Fuente de alimentación': 'Corriente Continua',
      'Voltaje': '<50V CA',
      'Paquete incluye': 'Masajeador cervical, Cable USB, Manual de usuario',
    },
    images: [
      '/images/productos-reales/neck-massager.jpg',
      '/images/masajeadorbuenoo1.png',
      '/images/masajeadordeatial2.png',
      '/images/masajeadordeatils4.png',
      '/images/masajeadordetails.png',
    ],
    icon: '',
    cartIcon: '',
    color: '#121a24',
  },
]

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === categoryId)
}

const OLD_SLUGS: Record<string, string> = {
  'sleepband-pro': 'halo',
  'white-noise-pro': 'wave',
  'weighted-mask-pro': 'neck-massager',
  'calm': 'neck-massager',
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  const resolved = OLD_SLUGS[slug] ?? slug
  return CATALOG.find((p) => p.slug === resolved)
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

export type Bundle = {
  id: string
  name: string
  name_en?: string
  name_es?: string
  slugs: string[]
  discountPercent: number
}

export const BUNDLES: Bundle[] = [
  {
    id: 'full-sleep-pack',
    name: 'Full Sleep Pack',
    name_en: 'Full Sleep Pack',
    name_es: 'Pack Sueño Completo',
    slugs: ['halo', 'sleep-headband'],
    discountPercent: 15,
  },
  {
    id: 'recovery-pack',
    name: 'Recovery Pack',
    name_en: 'Recovery Pack',
    name_es: 'Pack Recuperación',
    slugs: ['wave', 'neck-massager'],
    discountPercent: 15,
  },
  {
    id: 'complete-pack',
    name: 'Everything Pack',
    name_en: 'Everything Pack',
    name_es: 'Pack Todo Noctip',
    slugs: ['halo', 'wave', 'sleep-headband', 'neck-massager'],
    discountPercent: 20,
  },
]

export function getActiveBundle(cartSlugs: string[]): Bundle | null {
  const unique = [...new Set(cartSlugs)]
  let best: Bundle | null = null
  for (const bundle of BUNDLES) {
    const hasAll = bundle.slugs.every((s) => unique.includes(s))
    if (hasAll && (!best || bundle.discountPercent > best.discountPercent)) {
      best = bundle
    }
  }
  return best
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
