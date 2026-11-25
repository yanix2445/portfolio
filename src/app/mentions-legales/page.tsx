import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SequenceNav } from "@/components/content/sequence-nav";
import { PageHeader } from "@/components/layout/page-header";
import { Prose } from "@/components/mdx/prose";
import { formatDate } from "@/lib/content";
import { headingId } from "@/lib/headings";
import { HOST, LEGAL_UPDATED, PROVIDERS, TREATMENTS, type Treatment } from "@/lib/legal";
import { CONTACT, OWNER, SITE_HOST } from "@/lib/site";
import { frenchSpacing } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site ${SITE_HOST} : éditeur, hébergeur, données collectées, cookies et vos droits.`,
  alternates: { canonical: "/mentions-legales" },
};

// Les intertitres, dans l'ordre : le sommaire et les ancres en dérivent.
const SECTIONS = [
  "Éditeur et hébergeur",
  "Vos données",
  "Cookies et stockage",
  "Données hors d'Europe",
  "Vos droits",
  "Propriété intellectuelle",
] as const;
const HEADINGS = SECTIONS.map((text) => ({ id: headingId(text), text }));

function Section({ title, children }: { title: (typeof SECTIONS)[number]; children: ReactNode }) {
  return (
    <>
      <h2 id={headingId(title)}>{title}</h2>
      {children}
    </>
  );
}

// Mêmes colonnes qu'une fiche (`entry-page.tsx`) : sommaire à gauche, texte au centre,
// l'essentiel à droite dès 64 rem ; empilés en dessous, sans sommaire sur téléphone.
const BODY_GRID =
  "grid gap-10 md:gap-[6vh] lg:grid-cols-[minmax(11rem,0.75fr)_minmax(0,3fr)_minmax(11rem,0.75fr)] lg:gap-[2.4vw] xl:gap-[3vw]";
const READING = "mx-auto w-full min-w-0 max-w-[75ch] text-body";
const SIDE = cn(READING, "lg:sticky lg:top-[calc(var(--header-h)+5vh)] lg:row-start-1 lg:mx-0 lg:max-w-none");

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

// Une ligne du générique : le rôle en légende, le nom en face. Elle sert aux faits de l'en-tête,
// aux prestataires et aux fiches de traitement.
function CreditRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-border py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="type-label pt-[0.2em] text-muted-foreground">{label}</dt>
      <dd className="text-body-sm text-foreground">
        {typeof children === "string" ? frenchSpacing(children) : children}
      </dd>
    </div>
  );
}

function TreatmentSheet({ treatment }: { treatment: Treatment }) {
  return (
    <>
      <h3>{treatment.title}</h3>
      <dl className="not-prose border-b border-border">
        <CreditRow label="Données">{treatment.data}</CreditRow>
        <CreditRow label="Pourquoi">{treatment.purpose}</CreditRow>
        <CreditRow label="Base légale">{treatment.basis}</CreditRow>
        <CreditRow label="Conservation">{treatment.retention}</CreditRow>
        <CreditRow label="Destinataires">{treatment.recipients}</CreditRow>
      </dl>
    </>
  );
}

// Ce que le visiteur veut savoir sans tout lire, à côté du texte.
const ESSENTIALS = [
  "Le site ne dépose aucun cookie.",
  "Aucun message n'est stocké sur le site : il part par e-mail.",
  "Aucun pixel de suivi dans les e-mails.",
  "Rien n'est vendu ni utilisé pour de la publicité.",
] as const;

export default function MentionsLegalesPage() {
  return (
    <article aria-labelledby="legal-title" className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]">
      <PageHeader id="legal-title" title="Mentions légales">
        Qui édite ce site, qui l&apos;héberge, et ce que deviennent les données que vous y laissez.
      </PageHeader>
      <p className="mt-6 type-label text-muted-foreground md:mt-[3vh]">
        Mise à jour le <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED)}</time>
      </p>

      <div className={cn(BODY_GRID, "mt-12 items-start md:mt-[9vh]")}>
        <aside className={cn(SIDE, "max-md:hidden lg:col-start-1")}>
          <SequenceNav headings={HEADINGS} />
        </aside>

        {/* Avant le texte quand les colonnes s'empilent : l'essentiel se lit d'abord. */}
        <aside aria-labelledby="essentials-title" className={cn(SIDE, "lg:col-start-3")}>
          <h2 id="essentials-title" className="type-label text-muted-foreground">
            L&apos;essentiel
          </h2>
          <ul className="mt-5 border-b border-border md:mt-[2.6vh]">
            {ESSENTIALS.map((line) => (
              <li key={line} className="border-t border-border py-3 text-body-sm text-soft md:py-[1.5vh]">
                {frenchSpacing(line)}
              </li>
            ))}
          </ul>
        </aside>

        <Prose className={cn(READING, "prose-sequences lg:col-start-2 lg:row-start-1")}>
          <Section title="Éditeur et hébergeur">
            <dl className="not-prose border-b border-border">
              <CreditRow label="Éditeur">
                {OWNER.fullName}, particulier. Site personnel, non commercial.
              </CreditRow>
              <CreditRow label="Directeur de la publication">{OWNER.fullName}</CreditRow>
              <CreditRow label="Contact">
                <a href={`mailto:${CONTACT.email}`} className="underline decoration-primary underline-offset-[0.2em] transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </CreditRow>
              <CreditRow label="Hébergeur">
                {HOST.name}, {HOST.address}.{" "}
                <a href={HOST.url} {...EXTERNAL} className="underline decoration-primary underline-offset-[0.2em] transition-colors hover:text-primary">
                  vercel.com
                </a>
              </CreditRow>
            </dl>
            <p>
              L&apos;éditeur publie ce site à titre non professionnel. Comme le permet
              l&apos;article 1-1, II de la loi n°&nbsp;2004&#8209;575 du 21 juin 2004 pour la confiance dans
              l&apos;économie numérique (LCEN), son adresse et son numéro de téléphone ne sont pas
              publiés&nbsp;: ils ont été communiqués à l&apos;hébergeur.
            </p>
            <p>Les services qui traitent des données pour le site&nbsp;:</p>
            <dl className="not-prose border-b border-border">
              {PROVIDERS.map((provider) => (
                <CreditRow key={provider.role} label={provider.role}>
                  {provider.name}, {provider.country}
                </CreditRow>
              ))}
            </dl>
          </Section>

          <Section title="Vos données">
            <p>
              Le responsable du traitement est {OWNER.fullName}. Le site ne collecte que ce dont il a
              besoin, et seulement quand vous agissez&nbsp;: écrire, réserver un appel. Aucune donnée
              n&apos;est vendue, utilisée pour de la publicité ou soumise à une décision automatisée.
              Rien ne vous oblige à remplir le formulaire&nbsp;: l&apos;e-mail direct reste possible.
            </p>
            {TREATMENTS.map((treatment) => (
              <TreatmentSheet key={treatment.title} treatment={treatment} />
            ))}
          </Section>

          <Section title="Cookies et stockage">
            <p>
              Le site lui-même ne dépose aucun cookie, et la mesure d&apos;audience n&apos;en
              utilise pas&nbsp;: c&apos;est pourquoi aucun bandeau ne vous demande votre accord.
            </p>
            <ul>
              <li>
                <strong>Brouillon du formulaire.</strong> Pendant la saisie, votre texte est gardé
                dans le stockage de session de l&apos;onglet, pour ne pas le perdre. Il ne quitte pas
                votre appareil et disparaît à la fermeture de l&apos;onglet ou après l&apos;envoi.
              </li>
              <li>
                <strong>Cloudflare Turnstile.</strong> Sur la page Contact, le widget anti-spam peut
                utiliser des traceurs strictement nécessaires à la détection des robots, décrits dans
                la{" "}
                <a href="https://www.cloudflare.com/turnstile-privacy-policy/" {...EXTERNAL}>
                  politique de confidentialité de Turnstile
                </a>
                .
              </li>
              <li>
                <strong>Cal.com.</strong> Son script ne se charge que si vous survolez, ciblez au clavier ou cliquez
                «&nbsp;Réserver un appel&nbsp;». La fenêtre de réservation relève alors de la{" "}
                <a href="https://cal.com/privacy" {...EXTERNAL}>
                  politique de confidentialité de Cal.com
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section title="Données hors d'Europe">
            <p>
              Vercel, Resend, Cloudflare et Cal.com sont des sociétés américaines&nbsp;: les données
              qu&apos;elles traitent peuvent l&apos;être aux États-Unis. Ces transferts reposent sur
              la décision d&apos;adéquation de la Commission européenne du 10 juillet 2023, le{" "}
              <a href="https://www.dataprivacyframework.gov/list" {...EXTERNAL}>
                Data Privacy Framework
              </a>
              , auquel ces quatre sociétés déclarent adhérer.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Vous pouvez accéder à vos données, les faire corriger ou effacer, limiter leur
              traitement, vous y opposer et les récupérer (articles 15 à 21 du RGPD). Vous pouvez
              aussi définir ce qu&apos;elles deviennent après votre décès (article 85 de la loi
              Informatique et Libertés).
            </p>
            <p>
              Pour exercer ces droits, écrivez à{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ou passez par la page{" "}
              <Link href="/contact">Contact</Link>. Vous recevrez une réponse sous un mois au plus.
              Si elle ne vous satisfait pas, vous pouvez adresser une réclamation à la{" "}
              <a href="https://www.cnil.fr/fr/plaintes" {...EXTERNAL}>
                CNIL
              </a>
              , 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              Les textes, photos et la mise en page du site appartiennent à {OWNER.fullName}. Les
              reproduire demande son accord écrit. Les badges de certification appartiennent à leurs
              émetteurs respectifs.
            </p>
            <p>
              Les polices Big Shoulders, Hanken Grotesk et Geist Mono sont diffusées sous licence SIL
              Open Font License 1.1. Le code source du site est consultable sur{" "}
              <a href={`${CONTACT.github}/portfolio`} {...EXTERNAL}>
                GitHub
              </a>
              .
            </p>
          </Section>
        </Prose>

      </div>
    </article>
  );
}
