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
  const title = cat
    ? `${cat.name} — Noctip™`
    : 'All Products — Noctip™'
  const description = cat?.description ?? 'Browse all premium sleep and recovery products.'
  const canonical = `https://noctip.com/${params.locale}/shop/${params.category}`

  return {
    title,
    description,
    keywords: isAll
      ? 'noctip, sleep products, recovery products, anti-snoring, posture corrector, sleep headband, neck massager'
      : `noctip, ${cat?.name?.toLowerCase() || ''}, sleep, recovery, wellness`,
    alternates: {
      canonical,
      languages: {
        es: `https://noctip.com/es/shop/${params.category}`,
        en: `https://noctip.com/en/shop/${params.category}`,
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
