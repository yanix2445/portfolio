import { Suspense } from "react";

import {
  EntryPage,
  EntryPageFallback,
  entryMetadata,
  entryStaticParams,
} from "@/components/content/entry-page";

// Un slug absent de generateStaticParams est rendu en entier avant la réponse :
// notFound() renvoie alors un vrai statut 404 au lieu d'un shell en 200.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return entryStaticParams("veille");
}

export async function generateMetadata({ params }: PageProps<"/veille/[slug]">) {
  const { slug } = await params;
  return entryMetadata("veille", slug);
}

// `params` se lit sous <Suspense>, même prérendu : l'App Shell commun à tous les slugs
// (prefetch partiel) ne peut pas le contenir, et la navigation reste instantanée.
export default function VeilleArticlePage({ params }: PageProps<"/veille/[slug]">) {
  return (
    <Suspense fallback={<EntryPageFallback />}>
      <EntryPage collection="veille" params={params} />
    </Suspense>
  );
}
