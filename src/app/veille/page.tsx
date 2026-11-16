import type { Metadata } from "next";

import { EntryList } from "@/components/content/entry-list";
import { PageHeader } from "@/components/layout/page-header";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Veille",
  description: "Articles de veille technologique.",
  alternates: { canonical: "/veille" },
};

export default async function VeillePage() {
  const entries = await getEntries("veille");

  return (
    <section
      aria-labelledby="veille-title"
      className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]"
    >
      <PageHeader id="veille-title" title="Veille">
        Ma veille technologique : les sujets que je suis, ce qu&apos;en disent les références et ce
        que j&apos;en retiens pour mon métier de technicien.
      </PageHeader>
      <EntryList collection="veille" entries={entries} />
    </section>
  );
}
