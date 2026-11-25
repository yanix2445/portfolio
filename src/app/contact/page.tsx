import type { Metadata } from "next";

import { BookCallLink } from "@/components/contact/book-call-link";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { contactSiteKey } from "@/lib/contact";
import { BOOKING, CONTACT, CV_PATH, OWNER } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${OWNER.fullName} pour une alternance de technicien systèmes et réseaux, dès septembre 2027.`,
  alternates: { canonical: "/contact" },
};

// Les autres moyens de joindre Yanis, sur une ligne discrète sous la carte « appel ». Le CV est
// dans l'en-tête ; LinkedIn et GitHub sont aussi dans le pied de page.
const CHANNELS = [
  { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "LinkedIn", href: CONTACT.linkedin, rel: "noopener noreferrer me" },
  { label: "GitHub", href: CONTACT.github, rel: "noopener noreferrer me" },
] as const;

// Sur téléphone, à côté du formulaire : les trois accès directs. LinkedIn, GitHub et
// l'e-mail sont aussi dans le pied de page.
const SHORTCUTS = [
  { label: "Réserver un appel", href: BOOKING.url, booking: true },
  { label: "E-mail", href: `mailto:${CONTACT.email}` },
  { label: "CV", href: CV_PATH, external: true },
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
        Je cherche une alternance de 2 ans comme technicien systèmes et réseaux, dès septembre
        2027 : 3 jours en entreprise, 2 jours à l&apos;école. Écrivez-moi, ou réservez un appel de 15 minutes.
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
                  {"booking" in shortcut ? (
                    <BookCallLink>{shortcut.label}</BookCallLink>
                  ) : (
                    <a
                      href={shortcut.href}
                      {...("external" in shortcut ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {shortcut.label}
                    </a>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Le second chemin : parler de vive voix. Sur téléphone, avec le formulaire, il tient
            dans les accès directs ci-dessus ; la page reste sur un écran. */}
        <div className={cn("flex flex-col gap-6 md:gap-[3svh]", siteKey && "max-md:hidden")}>
          <section
            aria-labelledby="talk-title"
            className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-5 md:gap-[2.4svh] md:p-6"
            data-contact-talk
          >
            <h2 id="talk-title" className="type-poster pt-[0.1em] text-display-sm">
              Un appel de 15 minutes
            </h2>
            <p className="-mt-2 text-body text-soft">
              Pour en parler de vive voix : choisissez un créneau dans mon agenda.
            </p>
            {/* En contour : l'orange reste au talon « Envoyer », une seule action pleine à l'écran. */}
            <Button asChild variant="outline" size="xl">
              <BookCallLink />
            </Button>
          </section>

          {/* Le point termine la ligne quand la liste passe à la ligne, jamais il ne la commence. */}
          <p className="flex flex-wrap items-baseline gap-x-[0.8em] gap-y-1 text-body-sm text-soft" data-contact-channels>
            <span>Ou directement :</span>
            {CHANNELS.map((channel) => (
              <span
                key={channel.href}
                className="whitespace-nowrap not-last:after:ml-[0.8em] not-last:after:text-muted-foreground not-last:after:content-['·']"
              >
                <a
                  href={channel.href}
                  className="text-foreground underline underline-offset-4 decoration-border transition-colors duration-200 hover:decoration-primary"
                  {...("rel" in channel ? { target: "_blank", rel: channel.rel } : {})}
                >
                  {channel.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
