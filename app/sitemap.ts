import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://museandmenu.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: base,                       lastModified: now, changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${base}/about`,            lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${base}/experience`,       lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${base}/formats`,          lastModified: now, changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${base}/calendar`,         lastModified: now, changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${base}/membership`,       lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${base}/partners`,         lastModified: now, changeFrequency: 'monthly',  priority: 0.6 },
    { url: `${base}/contact`,          lastModified: now, changeFrequency: 'yearly',   priority: 0.5 },
    { url: `${base}/apply`,            lastModified: now, changeFrequency: 'monthly',  priority: 0.8 },
  ]
}
