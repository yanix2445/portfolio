import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Yanis Harrat pour un stage ou une alternance.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-muted-foreground">
        Le formulaire de contact arrive bientôt. En attendant, vous pouvez me joindre via
        les liens en bas de page.
      </p>
    </section>
  );
}
