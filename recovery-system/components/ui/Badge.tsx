'use client'
import type { CatalogProduct } from '../../lib/catalog'
export default function Badge({ type, locale }: { type: CatalogProduct['badge']; locale: string }) {
  if (!type) return null
  const map = {
    bestseller: { label: locale === 'es' ? 'Más vendido' : 'Best Seller', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/25' },
    new: { label: locale === 'es' ? 'Nuevo' : 'New', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25' },
    deal: { label: locale === 'es' ? 'Oferta' : 'Deal', cls: 'bg-rose-400/15 text-rose-300 border-rose-400/25' },
    trending: { label: locale === 'es' ? 'Tendencia' : 'Trending', cls: 'bg-violet-400/15 text-violet-300 border-violet-400/25' },
  }
  const b = map[type]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${b.cls}`}>
      {b.label}
    </span>
  )
}
