import { CATEGORIES } from '../../../../lib/catalog'
import { locales } from '../../../../i18n/routing'
import CategoryPage from '../../../../components/CategoryPage'
import type { Metadata } from 'next'

type Props = { params: { locale: string; category: string } }

/** Pre-render all locale × category combinations (including "all") */
export function generateStaticParams() {
  const categorySlugs = [...CATEGORIES.map((c) => c.slug), 'all']
  return locales.flatMap((locale) =>
    categorySlugs.map((category) => ({ locale, category })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.category)
  const isAll = params.category === 'all'
  const isEs = params.locale === 'es'
  const catName = cat ? (isEs ? (cat.name_es ?? cat.name) : (cat.name_en ?? cat.name)) : (isEs ? 'Todos los productos' : 'All Products')
  const catDesc = cat ? (isEs ? (cat.description_es ?? cat.description) : (cat.description_en ?? cat.description)) : (isEs ? 'Todos los productos de sueño y postura de Noctip.' : 'Browse all premium sleep and recovery products.')
  const title = cat ? `${catName} — Noctip™` : (isEs ? 'Todos los productos — Noctip™' : 'All Products — Noctip™')
  const description = catDesc
  const canonical = `https://noctip.com/${params.locale}/shop/${params.category}`

  return {
    title,
    description,
    keywords: isAll
      ? (isEs ? 'noctip, sueño, postura, anti ronquidos, banda sueño, masajeador cervical' : 'noctip, sleep products, recovery products, anti-snoring, posture corrector, sleep headband, neck massager')
      : `noctip, ${catName.toLowerCase()}, ${isEs ? 'sueño, recuperación, bienestar' : 'sleep, recovery, wellness'}`,
    alternates: {
      canonical,
      languages: {
        es: `https://noctip.com/es/shop/${params.category}`,
        en: `https://noctip.com/en/shop/${params.category}`,
        'x-default': `https://noctip.com/es/shop/${params.category}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: 'https://noctip.com/images/products/sleep-headband.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://noctip.com/images/products/sleep-headband.jpg'],
    },
  }
}

export default function ShopCategoryPage({ params }: Props) {
  return <CategoryPage categorySlug={params.category} />
}
