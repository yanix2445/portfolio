import type { MetadataRoute } from "next";

import { getEntries, type Collection } from "@/lib/content";
import { CV_PATH, SITE_URL } from "@/lib/site";

// Le CV en PDF est indexé comme une page : un recruteur peut le trouver en cherchant le nom.
const STATIC_PATHS = ["", "/projets", "/veille", "/contact", "/mentions-legales", CV_PATH];
const COLLECTIONS: Collection[] = ["projets", "veille"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentRoutes = (
    await Promise.all(
      COLLECTIONS.map(async (collection) =>
        (await getEntries(collection)).map(({ slug, metadata }) => ({
          url: `${SITE_URL}/${collection}/${slug}`,
          lastModified: metadata.date,
        })),
      ),
    )
  ).flat();

  return [...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })), ...contentRoutes];
}
