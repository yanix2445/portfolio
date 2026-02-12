import { MetadataRoute } from 'next'
import { getAllProjectSlugs } from "@/features/projects";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://yanis-harrat.com'

    const localeRoutes = routing.locales.map((locale) => ({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 1,
    }))

    const projectRoutes = routing.locales.flatMap((locale) =>
        getAllProjectSlugs().map((slug) => ({
            url: `${baseUrl}/${locale}/projects/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }))
    )

    return [
        ...localeRoutes,
        ...projectRoutes,
    ]
}
