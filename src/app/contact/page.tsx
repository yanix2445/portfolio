import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
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

// Sur téléphone, à côté du formulaire : les trois accès directs. LinkedIn, GitHub et
// l'e-mail sont aussi dans le pied de page.
const SHORTCUTS = [
  { label: "Appeler", href: `tel:${CONTACT.phoneE164}` },
  { label: "E-mail", href: `mailto:${CONTACT.email}` },
  { label: "CV (PDF)", href: CV_PATH, external: true },
] as const;

// Le formulaire n'est proposé que si Turnstile et Resend sont configurés : sinon
// (prévisualisation sans clés, par exemple), la page garde ses coordonnées directes.
// La page est prérendue : seul ce choix est figé au build, aucun secret n'en sort.
export default function ContactPage() {
  const siteKey = contactSiteKey(process.env);

  return (
    // Avec le formulaire, la page tient en un écran sur ordinateur, pied de page compris :
    // titre borné par la hauteur, coordonnées resserrées, marges en hauteur d'écran.
    <section
      aria-labelledby="contact-title"
      className={cn(
        "flex flex-col gap-8 px-gutter",
        // Le contenu est centré dans la hauteur libre : pas de grand vide sous le formulaire.
        siteKey
          ? "flex-1 justify-center gap-5 py-5 md:gap-[4svh] md:py-[3svh]"
          : "pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]",
      )}
    >
      <PageHeader id="contact-title" title="Contact" compact={Boolean(siteKey)}>
        Je recherche un stage ou une alternance en administration systèmes et réseaux.
        N&apos;hésitez pas à me contacter directement.
      </PageHeader>

      <div
        className={cn(
          "grid",
          siteKey ? "gap-5" : "gap-10",
          siteKey ? "md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-[6vw]" : "md:mt-[3vh]",
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

        {siteKey ? (
          <ul className="flex flex-wrap gap-2 md:hidden" data-contact-shortcuts>
            {SHORTCUTS.map((shortcut) => (
              <li key={shortcut.label}>
                <Button asChild variant="outline" size="label">
                  <a
                    href={shortcut.href}
                    {...("external" in shortcut ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {shortcut.label}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : null}

        <dl
          className={cn(siteKey ? "max-md:hidden" : "md:max-w-[60vw]")}
          data-contact-channels
        >
          {CHANNELS.map((channel) => (
            <div
              key={channel.label}
              className={cn(
                "grid items-baseline gap-1.5 border-t border-border last:border-b md:grid-cols-[9rem_1fr] md:gap-6",
                siteKey ? "py-3 md:py-[1.4svh]" : "py-4.5",
              )}
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
