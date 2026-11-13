import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page introuvable</h1>
      <p className="mt-4 text-muted-foreground">
        La page demandée n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
