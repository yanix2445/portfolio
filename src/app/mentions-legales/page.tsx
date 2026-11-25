import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Prose } from "@/components/mdx/prose";
import { CONTACT, OWNER, SITE_HOST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site ${SITE_HOST}.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <section
      aria-labelledby="legal-title"
      className="px-gutter pt-12 pb-20 md:pt-[12vh] md:pb-[14vh]"
    >
      <PageHeader id="legal-title" title="Mentions légales">
        Qui édite et héberge ce site, et ce que deviennent les données que vous y laissez :
        confidentialité et RGPD.
      </PageHeader>
      {/* Le texte s'aligne sur la colonne de lecture des fiches et des articles. */}
      <div className="mt-10 grid md:mt-[7vh] md:grid-cols-[0.78fr_1.22fr] md:gap-[4vw]">
        <Prose className="md:col-start-2">
          <h2>Éditeur</h2>
          <p>
            Ce site est édité par {OWNER.fullName}, à titre personnel et non commercial.
            <br />
            E-mail : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>

          <h2>Hébergeur</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
            ).
          </p>

          <h2>Formulaire de contact</h2>
          <p>
            Les informations saisies dans le formulaire de contact (nom, adresse e-mail, message)
            servent uniquement à répondre à votre demande. Elles ne sont pas stockées par le site :
            elles sont transmises par e-mail via le service <strong>Resend</strong>, qui les
            conserve sur des serveurs situés aux États-Unis pendant une durée de{" "}
            <strong>30 jours</strong>. Un e-mail automatique confirme la réception à l&apos;adresse
            saisie ; il ne reprend pas votre message. Les e-mails envoyés ne contiennent ni pixel
            de suivi ni lien de mesure des clics. Pendant la saisie, un brouillon est gardé dans
            votre navigateur (stockage de session de l&apos;onglet) pour ne pas perdre votre texte :
            il ne quitte pas votre appareil et disparaît à la fermeture de l&apos;onglet ou après
            l&apos;envoi. Pour limiter les abus, le nombre d&apos;envois par adresse IP est limité.
          </p>

          <h2>Protection anti-spam</h2>
          <p>
            Le formulaire est protégé par <strong>Cloudflare Turnstile</strong>, qui analyse des
            signaux techniques du navigateur pour distinguer les humains des robots. Ce traitement
            repose sur l&apos;intérêt légitime de l&apos;éditeur à protéger le site contre le spam
            et les abus.
          </p>

          <h2>Prise de rendez-vous</h2>
          <p>
            Le bouton « Réserver un appel » ouvre le calendrier de <strong>Cal.com</strong> (Cal.com,
            Inc., États-Unis). Son script n&apos;est chargé que lorsque vous survolez, ciblez ou
            cliquez ce bouton. Les informations saisies pour réserver (nom, adresse e-mail, créneau,
            message éventuel) sont traitées par Cal.com pour organiser l&apos;appel, selon sa{" "}
            <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
              politique de confidentialité
            </a>
            .
          </p>

          <h2>Mesure d&apos;audience</h2>
          <p>
            La fréquentation du site est mesurée avec <strong>Vercel Analytics</strong>, sans cookie
            ni identifiant persistant. Seules des statistiques agrégées (pages vues, pays, type
            d&apos;appareil) sont collectées.
          </p>

          <h2>Vos droits (RGPD)</h2>
          <p>
            Conformément au Règlement général sur la protection des données, vous disposez d&apos;un
            droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
            d&apos;opposition au traitement de vos données. Pour les exercer, écrivez à{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> (voir aussi la page{" "}
            <Link href="/contact">Contact</Link>). Vous pouvez aussi introduire une réclamation
            auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              CNIL
            </a>
            .
          </p>
        </Prose>
      </div>
    </section>
  );
}
