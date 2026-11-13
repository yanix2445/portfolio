import type { Metadata } from "next";
import Link from "next/link";

import { Prose } from "@/components/mdx/prose";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité du site yanis-harrat.com.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <Prose>
        <h1>Mentions légales et confidentialité</h1>

        <h2>Éditeur</h2>
        <p>
          Ce site est édité par Yanis Harrat, à titre personnel et non commercial. Pour toute
          question, utilisez la page <Link href="/contact">Contact</Link>.
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
          Le formulaire de contact n&apos;est pas encore en service. Une fois en ligne, les
          informations saisies (nom, adresse e-mail, message) serviront uniquement à répondre à
          votre demande. Elles ne seront pas stockées par le site : elles seront transmises par
          e-mail via le service <strong>Resend</strong>, qui les conserve sur des serveurs
          situés aux États-Unis pendant une durée de <strong>30 jours</strong>.
        </p>

        <h2>Protection anti-spam</h2>
        <p>
          Le formulaire sera protégé par <strong>Cloudflare Turnstile</strong>, qui analyse
          des signaux techniques du navigateur pour distinguer les humains des robots. Ce
          traitement repose sur l&apos;intérêt légitime de l&apos;éditeur à protéger le site
          contre le spam et les abus.
        </p>

        <h2>Mesure d&apos;audience</h2>
        <p>
          La fréquentation du site est mesurée avec <strong>Vercel Analytics</strong>, sans
          cookie ni identifiant persistant. Seules des statistiques agrégées (pages vues,
          pays, type d&apos;appareil) sont collectées.
        </p>

        <h2>Vos droits (RGPD)</h2>
        <p>
          Conformément au Règlement général sur la protection des données, vous disposez
          d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
          d&apos;opposition au traitement de vos données. Pour les exercer, utilisez la page{" "}
          <Link href="/contact">Contact</Link>. Vous pouvez aussi introduire une réclamation
          auprès de la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            CNIL
          </a>
          .
        </p>
      </Prose>
    </section>
  );
}
