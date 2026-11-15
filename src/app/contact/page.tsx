import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { contactSiteKey } from "@/lib/contact";
import { CONTACT, CV_PATH, OWNER } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${OWNER.fullName} pour un stage ou une alternance en systèmes et réseaux.`,
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Téléphone", value: CONTACT.phone, href: `tel:${CONTACT.phoneE164}` },
  { label: "LinkedIn", value: "linkedin.com/in/yanis-harrat", href: CONTACT.linkedin, rel: "noopener noreferrer me" },
  { label: "GitHub", value: "github.com/yanix2445", href: CONTACT.github, rel: "noopener noreferrer me" },
  { label: "CV", value: "Télécharger le PDF", href: CV_PATH, rel: "noopener" },
] as const;

// Le formulaire n'est proposé que si Turnstile et Resend sont configurés : sinon
// (prévisualisation sans clés, par exemple), la page garde ses coordonnées directes.
// La page est prérendue : seul ce choix est figé au build, aucun secret n'en sort.
export default function ContactPage() {
  const siteKey = contactSiteKey(process.env);

  return (
    <section
      aria-labelledby="contact-title"
      className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]"
    >
      <PageHeader id="contact-title" title="Contact">
        Je recherche un stage ou une alternance en administration systèmes et réseaux.
        N&apos;hésitez pas à me contacter directement.
      </PageHeader>

      <div
        className={cn(
          "mt-10 grid gap-12 md:mt-[7vh]",
          siteKey && "md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-[6vw]",
        )}
      >
        {siteKey ? (
          <div>
            <ContactForm siteKey={siteKey} />
            <noscript>
              <p className="mt-6 text-body-sm text-soft">
                Le formulaire a besoin de JavaScript. Vous pouvez aussi m&apos;écrire directement à{" "}
                {CONTACT.email}.
              </p>
            </noscript>
          </div>
        ) : null}

        <dl className={cn(!siteKey && "md:max-w-[60vw]")} data-contact-channels>
          {CHANNELS.map((channel) => (
            <div
              key={channel.label}
              className="grid items-baseline gap-1.5 border-t border-border py-4.5 last:border-b md:grid-cols-[9rem_1fr] md:gap-6"
            >
              <dt className="type-label text-muted-foreground">{channel.label}</dt>
              <dd className="text-lead">
                <a
                  href={channel.href}
                  className="underline-offset-4 hover:underline"
                  {...("rel" in channel ? { target: "_blank", rel: channel.rel } : {})}
                >
                  {channel.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
