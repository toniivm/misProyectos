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
    icon: '😴',
    description: 'Anti-snoring devices and sleep audio technology for deeper, quieter rest.',
    description_en: 'Anti-snoring devices and sleep audio technology for deeper, quieter rest.',
    description_es: 'Dispositivos anti-ronquidos y tecnología de audio para dormir para un descanso más profundo y silencioso.',
  },
  {
    id: 'neck-recovery',
    slug: 'neck-recovery',
    name: 'Neck & Recovery',
    name_en: 'Neck & Recovery',
    name_es: 'Cuello y recuperación',
    icon: '🧘',
    description: 'Posture correction and cervical massage tools for pain relief and muscle recovery.',
    description_en: 'Posture correction and cervical massage tools for pain relief and muscle recovery.',
    description_es: 'Herramientas de corrección postural y masaje cervical para alivio del dolor y recuperación muscular.',
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
      '/images/productos-reales/sleepband-pro.avif',
      '/images/productos-reales/sleepband-pro-2.avif',
    ],
    icon: '😴',
    cartIcon: '😴',
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
      '/images/productos-reales/white-noise-pro.jpg',
      '/images/white-noise-pro-2.jpg',
      '/images/white-noise-pro-3.jpg',
    ],
    icon: '🧘',
    cartIcon: '🧘',
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
      '/images/products/sleep-headband.jpg',
      '/images/sleepband-lifestyle.avif',
      '/images/sleepband-detail-clean.png',
      '/images/productos-reales/sleep-headband.avif',
      '/images/productos-reales/sleep-headband-2.avif',
      '/images/sleepband-battery.avif',
    ],
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
    shortDescription: 'De "no puedo girar la cabeza" a "todo bien" en 15 minutos.',
    shortDescription_en: 'From "I can\'t turn my head" to "all good" in 15 minutes.',
    shortDescription_es: 'De "no puedo girar la cabeza" a "todo bien" en 15 minutos.',
    description:
      'Tu tensión cervical no tiene posibilidad. Tres modos de masaje — amasado, pulsación, combinación — más terapia de calor hasta 45°C. Diseñado para usarlo en tu escritorio mientras trabajas.\n\nLa forma U ergonómica se adapta a la curva de tu cuello. Los nodos de masaje profundo liberan la tensión en cada uso. Recargable por USB-C, sin cables. Apagado automático por seguridad.\n\nEn 15 minutos pasas de dolor intenso a movilidad completa. Usa una vez al día y notarás la diferencia en una semana.',
    description_en:
      'Your cervical tension doesn\'t stand a chance. Three massage modes — knead, pulse, combination — plus heat therapy up to 45°C. Designed to use at your desk while you work.\n\nThe ergonomic U-shape conforms to your neck curve. Deep-kneading nodes release tension with every use. USB-C rechargeable, no cables. Automatic shut-off for safety.\n\nIn 15 minutes you go from intense pain to full mobility. Use once a day and you\'ll feel the difference in a week.',
    description_es:
      'Tu tensión cervical no tiene posibilidad. Tres modos de masaje — amasado, pulsación, combinación — más terapia de calor hasta 45°C. Diseñado para usarlo en tu escritorio mientras trabajas.\n\nLa forma U ergonómica se adapta a la curva de tu cuello. Los nodos de masaje profundo liberan la tensión en cada uso. Recargable por USB-C, sin cables. Apagado automático por seguridad.\n\nEn 15 minutos pasas de dolor intenso a movilidad completa. Usa una vez al día y notarás la diferencia en una semana.',
    features: [
      'Alivia tensión en 15 minutos — nodos de masaje profundo',
      'Terapia de calor opcional — hasta 45°C',
      'Forma U ergonómica — se adapta a la curva cervical',
      'Recargable por USB-C — 90 minutos por carga',
      'Apagado automático — temporizador de seguridad de 15 min',
      'Ligero y portátil — listo para viajar',
    ],
    specs: {
      'Batería': '90 minutos',
      'Niveles de calor': 'Hasta 45°C',
      'Modos de masaje': '3 (amasado, pulsación, combinación)',
      'Carga': 'USB-C',
      'Material': 'Silicona suave + ABS',
      'Peso': '≈180g',
    },
    images: [
      '/images/products/neck-massager.jpg',
      '/images/productos-reales/neck-massager.jpg',
    ],
    icon: '🧘',
    cartIcon: '🧘',
    color: '#121a24',
  },

  // ─── Sensory & Relaxation ─────────────────────────────────────────
  {
    slug: 'calm',
    name: 'Noctip Calm',
    name_en: 'Noctip Calm',
    name_es: 'Noctip Calm',
    category: 'neck-recovery',
    price: 11,
    comparePrice: 17,
    rating: 4.7,
    reviewCount: 512,
    badge: 'new',
    shortDescription: 'Electrodos flotantes que se adaptan a tu cuello. Alivio en cualquier lugar.',
    shortDescription_en: 'Floating electrodes that adapt to your neck. Relief anywhere.',
    shortDescription_es: 'Electrodos flotantes que se adaptan a tu cuello. Alivio en cualquier lugar.',
    description:
      'El masajeador cervical más inteligente que probarás. Los electrodos flotantes se adaptan automáticamente a las curvas de tu cuello, maximizando el contacto con la piel sin ajustes manuales.\n\nUn solo botón para empezar. Temporización automática — no tienes que pensar en ello. Diseño elástico con buena recuperación, se adapta a cualquier tamaño de cuello.\n\nPeso de solo 150g. Usa en tu escritorio, en casa o de viaje. Resultados desde el primer uso.',
    description_en:
      'The smartest cervical massager you\'ll ever try. Floating electrodes automatically adapt to your neck curves, maximizing skin contact without manual adjustments.\n\nOne button to start. Automatic timing — you don\'t have to think about it. Elastic design with strong rebound, fits any neck size.\n\nOnly 150g. Use at your desk, at home, or traveling. Results from the first use.',
    description_es:
      'El masajeador cervical más inteligente que probarás. Los electrodos flotantes se adaptan automáticamente a las curvas de tu cuello, maximizando el contacto con la piel sin ajustes manuales.\n\nUn solo botón para empezar. Temporización automática — no tienes que pensar en ello. Diseño elástico con buena recuperación, se adapta a cualquier tamaño de cuello.\n\nPeso de solo 150g. Usa en tu escritorio, en casa o de viaje. Resultados desde el primer uso.',
    features: [
      'Electrodos flotantes — se adaptan a las curvas de tu cuello',
      'Brazo elástico — buena recuperación, construcción duradera',
      'Inicio con un botón — sin controles complicados',
      'Diseño curvo — máximo contacto con la piel',
      'Ligero y portátil — en el trabajo, en casa o viajando',
      'Forma U ergonómica — se adapta a todos los tamaños',
    ],
    specs: {
      'Tipo': 'Masajeador cervical por pulsos',
      'Electrodos': 'Placas curvas flotantes — auto-adaptantes',
      'Diseño': 'Brazo elástico — buena recuperación, resistencia',
      'Controles': 'Inicio con botón — temporización automática',
      'Alimentación': 'Batería recargable',
      'Peso': '≈150g',
      'Material': 'ABS + silicona suave',
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

const OLD_SLUGS: Record<string, string> = {
  'sleepband-pro': 'halo',
  'white-noise-pro': 'wave',
  'weighted-mask-pro': 'calm',
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
    id: 'anti-snore-pack',
    name: 'Anti-Snore Pack',
    name_en: 'Anti-Snore Pack',
    name_es: 'Pack Anti-Ronquidos',
    slugs: ['halo', 'calm'],
    discountPercent: 10,
  },
  {
    id: 'recovery-pack',
    name: 'Recovery Pack',
    name_en: 'Recovery Pack',
    name_es: 'Pack Recuperación',
    slugs: ['wave', 'neck-massager', 'calm'],
    discountPercent: 15,
  },
  {
    id: 'complete-pack',
    name: 'Everything Pack',
    name_en: 'Everything Pack',
    name_es: 'Pack Todo Noctip',
    slugs: ['halo', 'wave', 'sleep-headband', 'neck-massager', 'calm'],
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
