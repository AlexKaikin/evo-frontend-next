import { SAIT_URL } from "@/config/url"

export default async function sitemap() {
  const staticRoutes = ['', '/products', '/posts']

  const staticPages = staticRoutes.map((route: string) => ({
    url: `${SAIT_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...staticPages]
}
