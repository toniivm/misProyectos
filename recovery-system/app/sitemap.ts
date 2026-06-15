import { MetadataRoute } from 'next'
import { CATALOG, CATEGORIES } from '../lib/catalog'

const BASE_URL = 'https://noctip.com'
const locales = ['es', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Homepage for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
  }

  // Category pages
  for (const category of CATEGORIES) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/shop/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Product pages
  for (const product of CATALOG) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }

  // Static pages
  for (const locale of locales) {
    entries.push(
      { url: `${BASE_URL}/${locale}/shop/all`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/${locale}/legal/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/shipping`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/${locale}/legal/returns`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/${locale}/legal/cookies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/${locale}/legal/legal-notice`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    )
  }

  return entries
}
