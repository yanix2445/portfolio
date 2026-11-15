import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="mt-4 text-muted-foreground">
        La page demandée n&apos;existe pas ou a été déplacée.
      </p>
      <Button asChild variant="outline" size="lg" className="mt-8">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </section>
  );
}
