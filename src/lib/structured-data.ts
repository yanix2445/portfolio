// Balisage schema.org du site : qui est Yanis, et de quoi parle chaque fiche. Il sert aux
// moteurs de recherche et aux assistants IA, qui en tirent des faits sans interpréter la mise
// en page. Chaque nœud porte un `@id` : les fiches désignent leur auteur sans le recopier.

import type { Collection, ContentMeta } from "@/lib/content";
import { CERTIFICATIONS } from "@/lib/profile";
import { CONTACT, OWNER, PORTRAIT, SITE_NAME, SITE_URL } from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const COLLECTION_LABEL: Record<Collection, string> = { projets: "Projets", veille: "Veille" };

/** Le site, la page de profil (l'accueil) et la personne. */
export function profileGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "fr-FR",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        alternateName: OWNER.fullName,
        givenName: OWNER.firstName,
        familyName: "Harrat",
        // Ce qu'il est aujourd'hui : il cherche l'alternance, il n'y est pas encore.
        jobTitle: "Futur alternant technicien systèmes et réseaux (BTS SIO SISR)",
        description:
          "Après une 1re année de BTS SIO à Fénelon Sup, Yanis Harrat entre en BTS SIO option SISR à l'AURLOM en septembre 2027 et cherche une alternance de deux ans comme technicien systèmes et réseaux à Paris et en Île-de-France (3 jours en entreprise, 2 jours à l'école).",
        url: SITE_URL,
        image: `${SITE_URL}${PORTRAIT.src}`,
        email: `mailto:${CONTACT.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Fénelon Sup" },
          { "@type": "EducationalOrganization", name: "Lycée Newton" },
        ],
        knowsAbout: [
          "Active Directory",
          "Windows Server",
          "Microsoft 365",
          "Entra ID",
          "Intune",
          "Proxmox",
          "OPNsense",
          "Docker",
          "VLAN",
          "TCP/IP",
          "DNS",
          "DHCP",
          "Python",
          "n8n",
        ],
        hasCredential: CERTIFICATIONS.map(({ issuer, title, verifyUrl }) => ({
          "@type": "EducationalOccupationalCredential",
          name: title,
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: issuer },
          ...(verifyUrl ? { url: verifyUrl } : {}),
        })),
        sameAs: [CONTACT.linkedin, CONTACT.github],
      },
    ],
  };
}

/** Une fiche : article de veille ou fiche technique de projet, avec son fil d'Ariane. */
export function entryGraph(collection: Collection, slug: string, metadata: ContentMeta) {
  const url = `${SITE_URL}/${collection}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": collection === "veille" ? "BlogPosting" : "TechArticle",
        "@id": `${url}#article`,
        url,
        headline: metadata.title,
        description: metadata.description ?? metadata.summary,
        datePublished: metadata.date,
        inLanguage: "fr-FR",
        keywords: metadata.tags,
        author: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        ...(metadata.cover ? { image: `${SITE_URL}${metadata.cover}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: COLLECTION_LABEL[collection],
            item: `${SITE_URL}/${collection}`,
          },
          { "@type": "ListItem", position: 3, name: metadata.title },
        ],
      },
    ],
  };
}
