import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/checkout/', '/api/', '/account/', '/tracking/'],
      },
    ],
    sitemap: 'https://noctip.com/sitemap.xml',
  }
}
