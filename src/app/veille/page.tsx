import type { Metadata } from "next";

import { EntryList } from "@/components/content/entry-list";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Veille",
  description: "Articles de veille technologique.",
};

export default async function VeillePage() {
  const entries = await getEntries("veille");

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Veille</h1>
      <EntryList collection="veille" entries={entries} />
    </section>
  );
}
