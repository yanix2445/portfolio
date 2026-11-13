import { CONTACT, OWNER, SITE_URL } from "@/lib/site";

// Balisage schema.org : relie le site aux profils publics pour les moteurs de recherche.
const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: OWNER.fullName,
  givenName: OWNER.firstName,
  familyName: OWNER.lastName,
  jobTitle: OWNER.jobTitle,
  url: SITE_URL,
  email: `mailto:${CONTACT.email}`,
  telephone: CONTACT.phoneE164,
  sameAs: [CONTACT.linkedin, CONTACT.github],
};

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // Échappe "<" pour empêcher toute fermeture prématurée de la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON).replace(/</g, "\\u003c") }}
    />
  );
}
