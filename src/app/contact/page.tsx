import type { Metadata } from "next";

import { BookCallLink } from "@/components/contact/book-call-link";
import { ContactForm } from "@/components/contact/contact-form";
import { contactSiteKey } from "@/lib/contact";
import { BOOKING, CONTACT, CV_PATH, OWNER } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${OWNER.fullName} pour une alternance de technicien systèmes et réseaux, dès septembre 2027.`,
  alternates: { canonical: "/contact" },
};

// Les autres moyens de joindre Yanis, sur une ligne discrète sous le formulaire. Le CV est
// dans l'en-tête ; LinkedIn et GitHub sont aussi dans le pied de page.
const CHANNEL_LINK =
  "text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-primary";
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
      {/* La phrase à compléter tient lieu de titre visuel ; le titre de la page reste pour les
          lecteurs d'écran et l'onglet du navigateur. */}
      <header>
        <h1 id="contact-title" className={cn(siteKey ? "sr-only" : "type-poster pt-[0.1em] text-display-xl")}>
          Contact
        </h1>
        <p className={cn("max-w-[64ch] text-body-sm text-muted-foreground", siteKey ? "max-md:sr-only" : "mt-[3vh]")}>
          Je cherche une alternance de 2 ans comme technicien systèmes et réseaux, dès septembre
          2027 : 3 jours en entreprise, 2 jours à l&apos;école. Écrivez-moi, ou réservez un appel de
          15 minutes.
        </p>
      </header>

      <div className={cn("flex flex-col", siteKey ? "gap-4 md:gap-[4svh]" : "gap-10 md:mt-[3vh]")}>
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
          // Sur téléphone, les autres chemins en une ligne de liens, sous l'envoi.
          <p className="flex flex-wrap items-baseline gap-x-[0.8em] gap-y-1 text-body-sm text-soft md:hidden" data-contact-shortcuts>
            <span>Ou :</span>
            {SHORTCUTS.map((shortcut) => (
              <span
                key={shortcut.label}
                className="whitespace-nowrap not-last:after:ml-[0.8em] not-last:after:text-muted-foreground not-last:after:content-['·']"
              >
                {"booking" in shortcut ? (
                  <BookCallLink className={CHANNEL_LINK}>{shortcut.label}</BookCallLink>
                ) : (
                  <a
                    href={shortcut.href}
                    className={CHANNEL_LINK}
                    {...("external" in shortcut ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {shortcut.label}
                  </a>
                )}
              </span>
            ))}
          </p>
        ) : null}

        {/* Les autres chemins, sur une ligne sous la phrase : l'appel, l'e-mail, les profils.
            Le point termine la ligne quand elle passe à la ligne, jamais il ne la commence. */}
        <p
          className={cn(
            "flex flex-wrap items-baseline gap-x-[0.8em] gap-y-1 border-t border-border pt-4 text-body-sm text-soft md:pt-[2svh]",
            siteKey && "max-md:hidden",
          )}
          data-contact-channels
        >
          <span>Ou bien :</span>
          <span className="whitespace-nowrap after:ml-[0.8em] after:text-muted-foreground after:content-['·']">
            <BookCallLink className={CHANNEL_LINK}>Réserver un appel de 15 min</BookCallLink>
          </span>
          {CHANNELS.map((channel) => (
            <span
              key={channel.href}
              className="whitespace-nowrap not-last:after:ml-[0.8em] not-last:after:text-muted-foreground not-last:after:content-['·']"
            >
              <a
                href={channel.href}
                className={CHANNEL_LINK}
                {...("rel" in channel ? { target: "_blank", rel: channel.rel } : {})}
              >
                {channel.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
