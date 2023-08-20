import { SAIT_URL } from '@/config/url'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/admin/', '/club/'],
    },
    sitemap: `${SAIT_URL}/sitemap.xml`,
  }
}
