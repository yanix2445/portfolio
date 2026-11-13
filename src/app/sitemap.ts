import type { MetadataRoute } from "next";

import { getSlugs, type Collection } from "@/lib/content";

const SITE_URL = "https://yanis-harrat.com";

const STATIC_PATHS = ["", "/projets", "/veille", "/contact", "/mentions-legales"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections: Collection[] = ["projets", "veille"];
  const contentPaths = (
    await Promise.all(
      collections.map(async (collection) =>
        (await getSlugs(collection)).map((slug) => `/${collection}/${slug}`),
      ),
    )
  ).flat();

  return [...STATIC_PATHS, ...contentPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
