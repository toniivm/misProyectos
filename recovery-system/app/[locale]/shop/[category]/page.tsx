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
  const title = cat
    ? `${cat.name} — Noctip™`
    : 'All Products — Noctip™'
  return {
    title,
    description: cat?.description ?? 'Browse all premium sleep and recovery products.',
  }
}

export default function ShopCategoryPage({ params }: Props) {
  return <CategoryPage categorySlug={params.category} />
}
