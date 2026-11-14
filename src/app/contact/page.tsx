import type { Metadata } from "next";

import { CONTACT, CV_PATH, OWNER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${OWNER.fullName} pour un stage ou une alternance en systèmes et réseaux.`,
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Téléphone", value: CONTACT.phone, href: `tel:${CONTACT.phoneE164}` },
  { label: "LinkedIn", value: "linkedin.com/in/yanis-harrat", href: CONTACT.linkedin, external: true },
  { label: "GitHub", value: "github.com/yanix2445", href: CONTACT.github, external: true },
] as const;

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mb-8 text-muted-foreground">
        Je recherche un stage ou une alternance en administration systèmes et réseaux.
        N&apos;hésitez pas à me contacter directement.
      </p>

      <dl className="grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((channel) => (
          <div key={channel.label} className="rounded-xl border bg-card p-5 text-card-foreground">
            <dt className="text-sm text-muted-foreground">{channel.label}</dt>
            <dd className="mt-1 font-medium">
              <a
                href={channel.href}
                className="hover:underline"
                {...("external" in channel
                  ? { target: "_blank", rel: "noopener noreferrer me" }
                  : {})}
              >
                {channel.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-sm text-muted-foreground">
        Mon CV est aussi{" "}
        <a href={CV_PATH} target="_blank" rel="noopener" className="font-medium underline">
          téléchargeable en PDF
        </a>
        . Un formulaire de contact arrivera prochainement.
      </p>
    </section>
  );
}
