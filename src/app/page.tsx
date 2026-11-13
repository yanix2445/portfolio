import Link from "next/link";

import { EntryList } from "@/components/content/entry-list";
import { CV_PATH } from "@/components/layout/site-header";
import { getEntries } from "@/lib/content";

export default async function HomePage() {
  const latestProjects = (await getEntries("projets")).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Yanis Harrat</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Étudiant en BTS SIO option SISR (Solutions d&apos;infrastructure, systèmes et
          réseaux). Je recherche un stage ou une alternance en administration systèmes et
          réseaux.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projets"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Voir les projets
          </Link>
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Télécharger le CV
          </a>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Derniers projets</h2>
        <EntryList collection="projets" entries={latestProjects} />
      </section>
    </div>
  );
}
