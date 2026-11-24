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
    id: 'limpieza',
    slug: 'limpieza',
    name: 'Limpieza sin frotar',
    name_en: 'Clean without scrubbing',
    name_es: 'Limpieza sin frotar',
    icon: '',
    description: 'Vapor a presión para despegar grasa, cal y suciedad incrustada. Solo agua.',
    description_en: 'Pressurised steam to lift grease, limescale and baked-on dirt. Just water.',
    description_es: 'Vapor a presión para despegar grasa, cal y suciedad incrustada. Solo agua.',
  },
]

export const CATALOG: CatalogProduct[] = [
  {
    slug: 'vapor',
    name: 'Nítida Vapor',
    name_en: 'Nítida Vapor',
    name_es: 'Nítida Vapor',
    category: 'limpieza',
    price: 39.99,
    comparePrice: 39.99,
    rating: 0,
    reviewCount: 0,
    badge: 'new',
    shortDescription: 'La grasa y la cal se derriten. Tú no.',
    shortDescription_en: 'Grease and limescale melt away. You don’t.',
    shortDescription_es: 'La grasa y la cal se derriten. Tú no.',
    description:
      'Limpiador de vapor a presión con 12 accesorios. Solo agua del grifo: 1.050 W, 3 bar y hasta 115 °C para despegar grasa, cal y suciedad incrustada de cocina, baño, cristales y tapicería.\n\nSe calienta en 3-5 minutos, se apaga solo cuando se queda sin agua y pesa poco: se usa con una mano. Incluye 12 accesorios para cocina, baño, juntas, mamparas, cristales, tapicería y coche.\n\nGarantía de 2 años, 30 días para probarlo y pago seguro con tarjeta. Sin detergentes: no quedan restos de producto en la vitro ni en el colchón.',
    description_en:
      'Pressurised steam cleaner with 12 accessories. Just tap water: 1,050 W, 3 bar and up to 115 °C to lift grease, limescale and baked-on dirt from kitchens, bathrooms, glass and upholstery.\n\nHeats up in 3-5 minutes, switches off automatically when the tank runs dry and is light enough to use one-handed. Includes 12 accessories for kitchen, bathroom, grout, shower screens, glass, upholstery and car.\n\n2-year warranty, 30 days to try it and secure card payment. No detergents: no residue left on your hob or mattress.',
    description_es:
      'Limpiador de vapor a presión con 12 accesorios. Solo agua del grifo: 1.050 W, 3 bar y hasta 115 °C para despegar grasa, cal y suciedad incrustada de cocina, baño, cristales y tapicería.\n\nSe calienta en 3-5 minutos, se apaga solo cuando se queda sin agua y pesa poco: se usa con una mano. Incluye 12 accesorios para cocina, baño, juntas, mamparas, cristales, tapicería y coche.\n\nGarantía de 2 años, 30 días para probarlo y pago seguro con tarjeta. Sin detergentes: no quedan restos de producto en la vitro ni en el colchón.',
    features: [
      '12 accesorios: cocina, baño, juntas, cristales, tapicería y coche',
      '3 bar de presión y hasta 115 °C: la grasa se despega sin frotar',
      'Solo agua del grifo, sin detergentes ni restos químicos',
      'Listo en 3-5 minutos · depósito de 350 ml',
      'Apagado automático y tapa de seguridad',
      'Garantía de 2 años · 30 días para probarlo',
    ],
    features_en: [
      '12 accessories: kitchen, bathroom, grout, glass, upholstery and car',
      '3 bar of pressure and up to 115 °C: grease lifts without scrubbing',
      'Tap water only, no detergents or chemical residue',
      'Ready in 3-5 minutes · 350 ml tank',
      'Auto shut-off and safety cap',
      '2-year warranty · 30 days to try it',
    ],
    specs: {
      'Potencia': '1.050 W',
      'Presión': '3 bar (0,3 MPa)',
      'Temperatura': 'Hasta 115 °C',
      'Depósito': '350 ml (llenado recomendado 250 ml)',
      'Calentamiento': '3-5 minutos',
      'Caudal de vapor': '28 g/min',
      'Medidas': '27 × 13 × 24 cm',
      'Accesorios': '12 incluidos',
      'Apagado': 'Automático al quedarse sin agua',
      'Garantía': '2 años',
    },
    // Imágenes reales del producto (mismo modelo OEM 1050W, 12 accesorios).
    // Sustituir por fotos propias en cuanto llegue la unidad.
    images: [
      '/images/vapor/vs-studio-product-800.webp',
      '/images/vapor/vs-studio-kit.webp',
      '/images/vapor/vs-gal-limpieza-800.webp',
    ],
    icon: '',
    cartIcon: '',
    color: '#0b1520',
  },
  {
    slug: 'vapor-duo',
    name: 'Nítida Vapor — Pack Dúo',
    name_en: 'Nítida Vapor — Duo Pack',
    name_es: 'Nítida Vapor — Pack Dúo',
    category: 'limpieza',
    price: 69.99,
    comparePrice: 69.99,
    rating: 0,
    reviewCount: 0,
    hidden: true,
    shortDescription: 'Dos unidades: una para ti y otra para regalar. Ahorras 9,99 €.',
    shortDescription_en: 'Two units: one for you and one to gift. Save €9.99.',
    shortDescription_es: 'Dos unidades: una para ti y otra para regalar. Ahorras 9,99 €.',
    description:
      'Pack de 2 unidades de Nítida Vapor. Cada una incluye los 12 accesorios, 1.050 W, 3 bar y hasta 115 °C. Una para casa y otra para regalar o para el coche.',
    description_en:
      'Pack of 2 Nítida Vapor units. Each one includes the 12 accessories, 1,050 W, 3 bar and up to 115 °C. One for home and one to gift or keep in the car.',
    description_es:
      'Pack de 2 unidades de Nítida Vapor. Cada una incluye los 12 accesorios, 1.050 W, 3 bar y hasta 115 °C. Una para casa y otra para regalar o para el coche.',
    features: [
      '2 limpiadores completos con 12 accesorios cada uno',
      'Ahorras 9,99 € frente a comprar dos sueltos',
      'Envío gratis y 30 días para probarlo',
      'Garantía de 2 años en las dos unidades',
    ],
    features_en: [
      '2 complete steam cleaners with 12 accessories each',
      'Save €9.99 versus buying two separately',
      'Free shipping and 30 days to try it',
      '2-year warranty on both units',
    ],
    specs: {
      'Contenido': '2 × Nítida Vapor',
      'Accesorios': '12 por unidad (24 en total)',
      'Potencia': '1.050 W por unidad',
      'Presión': '3 bar',
      'Garantía': '2 años',
    },
    images: ['/images/vapor/vs-studio-kit.webp'],
    icon: '',
    cartIcon: '',
    color: '#0b1520',
  },
  {
    slug: 'vapor-trio',
    name: 'Nítida Vapor — Pack Familia',
    name_en: 'Nítida Vapor — Family Pack',
    name_es: 'Nítida Vapor — Pack Familia',
    category: 'limpieza',
    price: 94.99,
    comparePrice: 94.99,
    rating: 0,
    reviewCount: 0,
    hidden: true,
    shortDescription: 'Tres unidades: casa, coche y regalo. Ahorras 24,98 €.',
    shortDescription_en: 'Three units: home, car and gift. Save €24.98.',
    shortDescription_es: 'Tres unidades: casa, coche y regalo. Ahorras 24,98 €.',
    description:
      'Pack de 3 unidades de Nítida Vapor. Tres limpiadores completos con 12 accesorios cada uno, para casa, el coche y para regalar.',
    description_en:
      'Pack of 3 Nítida Vapor units. Three complete steam cleaners with 12 accessories each, for home, car and gifting.',
    description_es:
      'Pack de 3 unidades de Nítida Vapor. Tres limpiadores completos con 12 accesorios cada uno, para casa, el coche y para regalar.',
    features: [
      '3 limpiadores completos con 12 accesorios cada uno',
      'Ahorras 24,98 € frente a comprar tres sueltos',
      'Envío gratis y 30 días para probarlo',
      'Garantía de 2 años en las tres unidades',
    ],
    features_en: [
      '3 complete steam cleaners with 12 accessories each',
      'Save €24.98 versus buying three separately',
      'Free shipping and 30 days to try it',
      '2-year warranty on all three units',
    ],
    specs: {
      'Contenido': '3 × Nítida Vapor',
      'Accesorios': '12 por unidad (36 en total)',
      'Potencia': '1.050 W por unidad',
      'Presión': '3 bar',
      'Garantía': '2 años',
    },
    images: ['/images/vapor/vs-studio-kit.webp'],
    icon: '',
    cartIcon: '',
    color: '#0b1520',
  },
]

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === categoryId && !p.hidden)
}

const OLD_SLUGS: Record<string, string> = {
  'halo': 'vapor',
  'wave': 'vapor',
  'sleep-headband': 'vapor',
  'neck-massager': 'vapor',
  'sleepband-pro': 'vapor',
  'white-noise-pro': 'vapor',
  'weighted-mask-pro': 'vapor',
  'weighted-mask': 'vapor',
  'calm': 'vapor',
  'sleepband': 'vapor',
  'rest': 'vapor',
  'back': 'vapor',
  'cervical': 'vapor',
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

// Sin packs ni descuentos inventados: un producto, un precio.
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
