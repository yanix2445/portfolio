import type { Metadata } from "next";

import { EntryList } from "@/components/content/entry-list";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets et réalisations professionnelles du BTS SIO option SISR.",
};

export default async function ProjetsPage() {
  const entries = await getEntries("projets");

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Projets</h1>
      <EntryList collection="projets" entries={entries} />
    </section>
  );
}
