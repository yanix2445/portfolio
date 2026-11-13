import type { MetadataRoute } from "next";

import { getEntries, type Collection } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = ["", "/projets", "/veille", "/contact", "/mentions-legales"];
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
