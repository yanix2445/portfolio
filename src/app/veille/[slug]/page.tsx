import { EntryPage, entryMetadata, entryStaticParams } from "@/components/content/entry-page";

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

export default async function VeilleArticlePage({ params }: PageProps<"/veille/[slug]">) {
  const { slug } = await params;
  return <EntryPage collection="veille" slug={slug} />;
}
