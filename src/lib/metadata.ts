// lib/metadata.ts
import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Yanis Harrat - Technicien IT & Développeur | BTS SIO SISR | Alternance CDI Paris",
  description: "Technicien IT et développeur BTS SIO SISR. Infrastructure réseau + développement web (React/Next.js). Recherche alternance ou CDI Paris. Contact : 06.03.05.98.29",
  keywords: [
    "technicien informatique junior",
    "BTS SIO SISR alternance",
    "technicien IT Paris",
    "alternance informatique",
    "CDI technicien informatique",
    "développeur informatique junior",
    "technicien réseau alternance",
    "emploi informatique Paris",
    "technicien système réseau",
    "alternance BTS informatique",
    "CDI junior informatique",
    "infrastructure IT junior",
    "technicien fibre optique",
    "développeur full stack IT",
    "emploi technicien réseau",
    "alternance développement informatique",
    "CDI infrastructure IT",
    "recrutement technicien IT",
    "offre emploi informatique",
    "technicien support informatique"
  ].join(", "),
  authors: [{ name: "Yanis Harrat" }],
  creator: "Yanis Harrat",
  publisher: "Yanis Harrat",
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "/",
    title: "Yanis Harrat - Technicien IT & Développeur | BTS SIO SISR Alternance",
    description: "🚀 Technicien IT + Développeur disponible ! Infrastructure réseau • FTTH • React/Next.js • BTS SIO SISR • Contact: 06.03.05.98.29",
    siteName: "Portfolio Yanis Harrat",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Yanis Harrat - Technicien IT & Développeur disponible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanis Harrat - Technicien IT & Développeur BTS SIO SISR",
    description: "🚀 Double compétence IT : Technicien réseau/infrastructure + Développeur. BTS SIO SISR, projets concrets. Alternance/CDI Paris.",
    images:["/og-image.jpeg"],
    creator: "@yanix2445",
    site: "@yanix2445",
  },
  other: {
    // Liens directs pour faciliter le contact
    "contact:phone": "tel:+33603059829",
    "contact:email": "mailto:yanis.amine.harrat@gmail.com",
    "contact:linkedin": "https://linkedin.com/in/yanisharrat",
    "contact:github": "https://github.com/yanix2445",
    
    // Infos cruciales pour RH
    "availability": "DISPONIBLE IMMÉDIATEMENT",
    "contract:type": "Alternance BTS SIO ou CDI junior",
    "location": "Paris + Île-de-France",
    "age": "22 ans",
    "level": "Junior avec expérience concrète",
    "mobility": "Mobile toute Île-de-France",
    
    // Skills spécialisées IT
    "skills:infrastructure": "Réseau FTTH, fibre optique, TCP/IP",
    "skills:systems": "Windows/Linux/MacOS, infrastructure IT",
    "skills:development": "React, Next.js, JavaScript, Python",
    "skills:database": "PostgreSQL, Airtable, modélisation",
    "skills:tools": "n8n, Docker, Git, VS Code",
    "specialization": "DOUBLE COMPÉTENCE : IT Infrastructure + Développement",
    "certification": "BTS SIO option SISR (Systèmes et Réseaux)",
    "experience:it": "2+ ans technicien fibre optique FTTH",
    "experience:dev": "Projets CRM, automation, full-stack",
    "education": "BTS SIO SISR • École 42",
    
    // Call-to-action
    "cta": "Contactez-moi directement pour un entretien !",
    "response:time": "Réponse sous 24h garantie",
  },
  applicationName: "Portfolio Yanis Harrat - Technicien IT & Développeur",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "ton-code-verification-google", // À configurer après déploiement
  },
  category: "business",
  classification: "Technicien IT & Développeur | Double Compétence | BTS SIO SISR",
  alternates: {
    canonical: "/",
  },
};