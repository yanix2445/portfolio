import { EntryPage, entryMetadata, entryStaticParams } from "@/components/content/entry-page";

// Un slug absent de generateStaticParams est rendu en entier avant la réponse :
// notFound() renvoie alors un vrai statut 404 au lieu d'un shell en 200.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return entryStaticParams("projets");
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  return entryMetadata("projets", slug);
}

export default async function ProjetPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  return <EntryPage collection="projets" slug={slug} />;
}
