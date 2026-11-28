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
  hidden?: boolean
  shortDescription: string
  shortDescription_en?: string
  shortDescription_es?: string
  description: string
  description_en?: string
  description_es?: string
  features: string[]
  features_en?: string[]
  specs: Record<string, string>
  images?: string[]
  video?: string
  icon: string
  cartIcon: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'hogar',
    slug: 'hogar',
    name: 'Calzado seco',
    name_en: 'Dry footwear',
    name_es: 'Calzado seco',
    icon: '',
    description: 'Aire caliente a 360° para secar el calzado por dentro y quitarle el olor a humedad. Sin radiadores ni periódicos.',
    description_en: '360° warm air to dry footwear from the inside and remove damp smells. No radiators, no newspaper.',
    description_es: 'Aire caliente a 360° para secar el calzado por dentro y quitarle el olor a humedad. Sin radiadores ni periódicos.',
  },
]

export const CATALOG: CatalogProduct[] = [
  {
    slug: 'dry',
    name: 'Nítida Dry',
    name_en: 'Nítida Dry',
    name_es: 'Nítida Dry',
    category: 'hogar',
    price: 39.99,
    comparePrice: 39.99,
    rating: 0,
    reviewCount: 0,
    badge: 'new',
    shortDescription: 'Zapatos secos y sin olor cada mañana. Sin radiadores ni periódicos.',
    shortDescription_en: 'Dry, odour-free shoes every morning. No radiators, no newspaper.',
    shortDescription_es: 'Zapatos secos y sin olor cada mañana. Sin radiadores ni periódicos.',
    description:
      'Secador de calzado con aire caliente a 360°, dos tubos y temporizador de 3, 6 o 9 horas. Seca botas, zapatillas, guantes y calcetines por dentro, sin radiadores ni periódicos. 130 W y se pliega para guardarlo en cualquier cajón.\n\nFunciona solo: eliges el tiempo, se apaga solo y por la mañana está seco. El aire caliente sale por dos tubos perforados que llegan a la puntera y al talón. Sin bolsas de calor y sin olor a humedad.\n\nIncluye 30 días para probarlo, 2 años de garantía y envío gratis con seguimiento.',
    description_en:
      'Footwear dryer with 360° warm air, two tubes and a 3, 6 or 9-hour timer. Dries boots, trainers, gloves and socks from the inside, without radiators or newspaper. 130 W and it folds away into any drawer.\n\nIt runs on its own: choose the time, it switches off by itself and your shoes are dry in the morning. Warm air comes out of two perforated tubes that reach the toe and the heel. No heat bags, no damp smell.\n\nIncludes 30 days to try it, a 2-year warranty and free tracked shipping.',
    description_es:
      'Secador de calzado con aire caliente a 360°, dos tubos y temporizador de 3, 6 o 9 horas. Seca botas, zapatillas, guantes y calcetines por dentro, sin radiadores ni periódicos. 130 W y se pliega para guardarlo en cualquier cajón.\n\nFunciona solo: eliges el tiempo, se apaga solo y por la mañana está seco. El aire caliente sale por dos tubos perforados que llegan a la puntera y al talón. Sin bolsas de calor y sin olor a humedad.\n\nIncluye 30 días para probarlo, 2 años de garantía y envío gratis con seguimiento.',
    features: [
      'Seca el calzado por dentro con aire caliente a 360°',
      'Temporizador de 3, 6 o 9 horas con apagado automático',
      'Dos tubos perforados: llegan a la puntera y al talón',
      '130 W de bajo consumo · cable de 1,2 m',
      'Se pliega y cabe en un cajón',
      'Para botas, zapatillas, guantes y calcetines',
      '30 días para probarlo · garantía de 2 años',
    ],
    features_en: [
      'Dries footwear from the inside with 360° warm air',
      '3, 6 or 9-hour timer with automatic shut-off',
      'Two perforated tubes reach the toe and the heel',
      'Low 130 W consumption · 1.2 m cable',
      'Folds flat to fit in a drawer',
      'For boots, trainers, gloves and socks',
      '30 days to try it · 2-year warranty',
    ],
    specs: {
      'Potencia': '130 W',
      'Voltaje': '220-240 V',
      'Temporizador': '3 / 6 / 9 horas',
      'Apagado': 'Automático al terminar',
      'Salidas de aire': '2 tubos perforados, 360°',
      'Plegable': 'Sí',
      'Cable': '1,2 m',
      'Uso': 'Calzado, botas, guantes y calcetines',
      'Certificado': 'CE',
      'Garantía': '2 años',
    },
    // Imágenes del mismo modelo OEM. Sustituir por fotos propias en cuanto llegue la unidad.
    images: [
      '/images/dry/hero-boots.jpg',
      '/images/dry/studio.jpg',
      '/images/dry/folded.jpg',
      '/images/dry/detail-vents.jpg',
      '/images/dry/detail-panel.jpg',
    ],
    video: '/videos/dry-hero.mp4',
    icon: '',
    cartIcon: '',
    color: '#F3E7D7',
  },
  {
    slug: 'dry-duo',
    name: 'Nítida Dry — Pack Dúo',
    name_en: 'Nítida Dry — Duo Pack',
    name_es: 'Nítida Dry — Pack Dúo',
    category: 'hogar',
    price: 69.99,
    comparePrice: 69.99,
    rating: 0,
    reviewCount: 0,
    hidden: true,
    shortDescription: 'Dos unidades: una para ti y otra para casa. Ahorras 9,99 €.',
    shortDescription_en: 'Two units: one for you and one for home. Save €9.99.',
    shortDescription_es: 'Dos unidades: una para ti y otra para casa. Ahorras 9,99 €.',
    description:
      'Pack de 2 secadores Nítida Dry. Dos unidades completas con temporizador de 3, 6 o 9 horas, dos tubos de aire caliente y cable de 1,2 m. Una para tu calzado y otra para el de casa o para regalar.',
    description_en:
      'Pack of 2 Nítida Dry dryers. Two complete units with a 3, 6 or 9-hour timer, two warm-air tubes and a 1.2 m cable. One for your footwear and one for home or to gift.',
    description_es:
      'Pack de 2 secadores Nítida Dry. Dos unidades completas con temporizador de 3, 6 o 9 horas, dos tubos de aire caliente y cable de 1,2 m. Una para tu calzado y otra para el de casa o para regalar.',
    features: [
      '2 secadores completos',
      'Ahorras 9,99 € frente a comprar dos sueltos',
      'Envío gratis y 30 días para probarlo',
      'Garantía de 2 años en las dos unidades',
    ],
    features_en: [
      '2 complete dryers',
      'Save €9.99 versus buying two separately',
      'Free shipping and 30 days to try it',
      '2-year warranty on both units',
    ],
    specs: {
      'Contenido': '2 × Nítida Dry',
      'Potencia': '130 W por unidad',
      'Temporizador': '3 / 6 / 9 horas',
      'Garantía': '2 años',
    },
    images: ['/images/dry/studio.jpg'],
    icon: '',
    cartIcon: '',
    color: '#F3E7D7',
  },
  {
    slug: 'dry-trio',
    name: 'Nítida Dry — Pack Familia',
    name_en: 'Nítida Dry — Family Pack',
    name_es: 'Nítida Dry — Pack Familia',
    category: 'hogar',
    price: 94.99,
    comparePrice: 94.99,
    rating: 0,
    reviewCount: 0,
    hidden: true,
    shortDescription: 'Tres unidades: casa, trabajo y regalo. Ahorras 24,98 €.',
    shortDescription_en: 'Three units: home, work and gift. Save €24.98.',
    shortDescription_es: 'Tres unidades: casa, trabajo y regalo. Ahorras 24,98 €.',
    description:
      'Pack de 3 secadores Nítida Dry. Tres unidades completas para casa, el trabajo y para regalar. Cada una con temporizador de 3, 6 o 9 horas y dos tubos de aire caliente.',
    description_en:
      'Pack of 3 Nítida Dry dryers. Three complete units for home, work and gifting. Each with a 3, 6 or 9-hour timer and two warm-air tubes.',
    description_es:
      'Pack de 3 secadores Nítida Dry. Tres unidades completas para casa, el trabajo y para regalar. Cada una con temporizador de 3, 6 o 9 horas y dos tubos de aire caliente.',
    features: [
      '3 secadores completos',
      'Ahorras 24,98 € frente a comprar tres sueltos',
      'Envío gratis y 30 días para probarlo',
      'Garantía de 2 años en las tres unidades',
    ],
    features_en: [
      '3 complete dryers',
      'Save €24.98 versus buying three separately',
      'Free shipping and 30 days to try it',
      '2-year warranty on all three units',
    ],
    specs: {
      'Contenido': '3 × Nítida Dry',
      'Potencia': '130 W por unidad',
      'Temporizador': '3 / 6 / 9 horas',
      'Garantía': '2 años',
    },
    images: ['/images/dry/folded.jpg'],
    icon: '',
    cartIcon: '',
    color: '#F3E7D7',
  },
]

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === categoryId && !p.hidden)
}

const OLD_SLUGS: Record<string, string> = {
  'vapor': 'dry',
  'vapor-duo': 'dry-duo',
  'vapor-trio': 'dry-trio',
  'halo': 'dry',
  'wave': 'dry',
  'sleep-headband': 'dry',
  'neck-massager': 'dry',
  'sleepband-pro': 'dry',
  'white-noise-pro': 'dry',
  'weighted-mask-pro': 'dry',
  'weighted-mask': 'dry',
  'calm': 'dry',
  'sleepband': 'dry',
  'rest': 'dry',
  'back': 'dry',
  'cervical': 'dry',
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  const resolved = OLD_SLUGS[slug] ?? slug
  return CATALOG.find((p) => p.slug === resolved)
}

export function getBestSellers(): CatalogProduct[] {
  return CATALOG.filter((p) => p.badge === 'bestseller' && !p.hidden)
}

export function getDeals(): CatalogProduct[] {
  return CATALOG.filter((p) => (p.badge === 'deal' || p.badge === 'trending') && !p.hidden)
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

// Sin packs ni descuentos inventados: los packs son productos con su propio precio.
export const BUNDLES: Bundle[] = []

export function getActiveBundle(_cartSlugs: string[]): Bundle | null {
  return null
}

export function searchProducts(query: string): CatalogProduct[] {
  if (!query.trim() || query.length < 2) return []
  const q = query.toLowerCase()
  return CATALOG.filter(
    (p) => {
      if (p.hidden) return false
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
