import { entryStaticParams } from "@/components/content/entry-page";
import { SHARE_ALT, SHARE_SIZE, entryShareImage } from "@/components/seo/entry-share-image";

// L'image de partage de chaque fiche, générée au build : voir `entry-share-image.tsx`.
export const alt = SHARE_ALT.projets;
export const size = SHARE_SIZE;
export const contentType = "image/png";

// Une image par fiche : la route d'image n'hérite pas des paramètres de la page.
export function generateStaticParams() {
  return entryStaticParams("projets");
}

export default function Image({ params }: { params: Promise<{ slug: string }> }) {
  return entryShareImage("projets", params);
}
