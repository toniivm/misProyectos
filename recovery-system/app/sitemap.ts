import { MetadataRoute } from 'next'
import { CATALOG, CATEGORIES } from '../lib/catalog'

const BASE_URL = 'https://noctip.com'
const locales = ['es', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const buildDate = new Date('2026-09-17')

  // Homepage for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 1,
    })
  }

  // Category pages
  for (const category of CATEGORIES) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/shop/${category.slug}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // Product pages
  for (const product of CATALOG) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }

  // Static pages (tracking excluded intentionally - blocked by robots.txt)
  for (const locale of locales) {
    entries.push(
      { url: `${BASE_URL}/${locale}/shop/all`, lastModified: buildDate, changeFrequency: 'daily', priority: 0.8 },
      { url: `${BASE_URL}/${locale}/about`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/${locale}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/${locale}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/${locale}/blog/como-dejar-de-roncar-sin-cirugia`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/${locale}/blog/como-dormir-mejor-sin-pastillas`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/${locale}/legal/privacy`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/terms`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/shipping`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/${locale}/legal/returns`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/${locale}/legal/cookies`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/legal-notice`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.2 },
    )
  }

  return entries
}
