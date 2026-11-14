// Contenu du CV (public/cv/yanis-harrat-cv.pdf) affiché sur l'accueil.
// On modifie le profil ici, sans toucher aux composants de mise en page.

export const HERO = {
  status: "Recherche d'alternance",
  role: "Technicien systèmes & réseaux",
  diploma: "BTS SIO SISR",
  rhythm: "3 j entreprise / 2 j école",
  location: "Paris, Île-de-France",
  intro:
    "Premières expériences en support informatique : diagnostic et résolution d'incidents, assistance utilisateurs, administration système et réseau, environnement Microsoft 365.",
} as const;

export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: "Systèmes",
    items: ["Linux Debian", "Ubuntu Server", "Windows", "Windows Server 2019/2022/2025", "macOS"],
  },
  {
    title: "Administration Microsoft",
    items: ["AD DS", "GPO", "Entra ID", "Intune", "Microsoft 365", "Autopilot", "AGDLP"],
  },
  {
    title: "Réseaux",
    items: [
      "LAN",
      "TCP/IP",
      "Modèle OSI",
      "VLAN",
      "Routage",
      "NAT",
      "HSRP",
      "VPN",
      "DHCP",
      "DNS",
      "DFS-N",
      "DFS-R",
    ],
  },
  {
    title: "Sécurité réseau",
    items: ["OPNsense", "pfSense", "Gestion des accès", "Sécurisation des environnements"],
  },
  {
    title: "Virtualisation et conteneurs",
    items: ["Proxmox", "VMware", "Docker"],
  },
  {
    title: "Maintenance et diagnostic",
    items: [
      "Support N1/N2",
      "Équipements FTTH",
      "Tests TCP/IP LAN/WAN",
      "Réflectométrie",
      "Cisco Packet Tracer",
    ],
  },
];

export type Certification = {
  issuer: string;
  title: string;
  /** Badge officiel fourni par Yanis, dans `public/images/certifs/`. Sans badge : texte seul. */
  badge?: string;
  /** Page publique qui permet de vérifier la certification. */
  verifyUrl?: string;
};

export const CERTIFICATIONS: readonly Certification[] = [
  { issuer: "Cisco", title: "Introduction to Cybersecurity" },
  { issuer: "Google", title: "IT Support Professional Certificate" },
  { issuer: "Google", title: "Cybersécurité Professional Certificate" },
  { issuer: "EBIOS", title: "Risk Manager, le MOOC" },
  { issuer: "Anthropic", title: "AI Fluency: Framework & Foundations" },
  { issuer: "Anthropic", title: "Claude Code in Action" },
  { issuer: "Anthropic", title: "Claude 101" },
];

export type TimelineKind = "formation" | "experience" | "soft-skills";

export type TimelineStep = {
  /** Début de l'étape, `YYYY` ou `YYYY-MM` : sert uniquement au tri. */
  start: string;
  /** Période affichée. */
  period: string;
  title: string;
  place: string;
  summary: string;
  kind: TimelineKind;
};

export const TIMELINE_KIND_LABEL: Record<TimelineKind, string> = {
  formation: "Formation",
  experience: "Expérience",
  "soft-skills": "Soft skills",
};

export const TIMELINE: readonly TimelineStep[] = [
  {
    start: "2022",
    period: "2022",
    title: "Bac Pro SN option ARED",
    place: "Lycée Newton, Clichy",
    summary: "Systèmes numériques : audiovisuels, réseau et équipements domestiques.",
    kind: "formation",
  },
  {
    start: "2023",
    period: "2023",
    title: "Piscine École 42",
    place: "École 42, Paris",
    summary: "Piscine du cursus Concepteur Développeur d'Applications.",
    kind: "formation",
  },
  {
    start: "2023-09",
    period: "Sept. 2023 – janv. 2025",
    title: "Chef de rang",
    place: "Coco Rocco",
    summary:
      "Relation client, gestion de la pression en forte activité et encadrement des commis.",
    kind: "soft-skills",
  },
  {
    start: "2025-01",
    period: "Janv. – mars 2025",
    title: "Consultant IT junior & développeur",
    place: "IUT Meaux",
    summary:
      "Refonte d'un système d'information hybride (Airtable, n8n, Python, JavaScript) en méthode agile.",
    kind: "experience",
  },
  {
    start: "2026",
    period: "2026",
    title: "BTS SIO option SISR",
    place: "AURLOM, Paris",
    summary: "Solutions d'infrastructure, systèmes et réseaux.",
    kind: "formation",
  },
  {
    start: "2026-06",
    period: "Juin – sept. 2026",
    title: "Technicien helpdesk N1/N2",
    place: "Secours Catholique Caritas France",
    summary:
      "Tickets N1/N2 sous SLA, incidents Windows et Microsoft 365, comptes Active Directory.",
    kind: "experience",
  },
];

// ---------------------------------------------------------------------------
// Accueil « Générique »
// ---------------------------------------------------------------------------

/** Premier écran. Année de BTS, date et lieu confirmés par Yanis le 2026-11-13. */
export const OPENING = {
  kicker: "Portfolio · Technicien systèmes & réseaux",
  synopsis:
    "Quatre mois de helpdesk N1/N2 en production. Active Directory, Microsoft 365, réseau, virtualisation.",
  synopsisAccent: "Prêt à rejoindre votre équipe.",
  slate: [
    { label: "Rôle", value: "Technicien systèmes & réseaux" },
    { label: "Formation", value: "BTS SIO SISR · 1re année" },
    { label: "Rythme", value: "3 j entreprise · 2 j école" },
    { label: "Disponible", value: "Septembre 2027 · Paris" },
  ],
} as const;

export type Act = {
  /** Début, `YYYY` ou `YYYY-MM` : sert uniquement à vérifier l'ordre. */
  start: string;
  /** Période affichée après « Acte N ». */
  period: string;
  /** Ville ou durée, en légende secondaire. */
  note: string;
  place: string;
  role: string;
  text: string;
  keywords: readonly string[];
  /** L'acte en cours : son numéro est plein au lieu d'être en contour. */
  current?: boolean;
};

/** Un acte par expérience, dans l'ordre chronologique, la formation en cours en dernier. */
export const ACTS: readonly Act[] = [
  {
    start: "2023",
    period: "2023",
    note: "Paris",
    place: "École 42",
    role: "Piscine · cursus Concepteur Développeur d'Applications",
    text: "Là où j'apprends à coder, et surtout à chercher la solution par moi-même.",
    keywords: ["Programmation", "Autonomie"],
  },
  {
    start: "2023-09",
    period: "sept. 2023 → janv. 2025",
    note: "16 mois",
    place: "Coco Rocco",
    role: "Chef de rang",
    text: "Un restaurant à forte activité. J'accueille et je conseille les clients, je gère plusieurs demandes à la fois, je coordonne la salle et la cuisine, j'encadre les commis.",
    keywords: ["Relation client", "Priorisation", "Encadrement"],
  },
  {
    start: "2025-01",
    period: "janv. → mars 2025",
    note: "Meaux",
    place: "IUT Meaux",
    role: "Consultant IT junior & développeur",
    text: "Je refonds un système d'information : analyse des besoins, bases SQL, automatisations en Python et JavaScript, workflows n8n. Je livre la solution et je forme les utilisateurs.",
    keywords: ["Airtable", "n8n", "Python", "SQL", "Git"],
  },
  {
    start: "2026-06",
    period: "juin → sept. 2026",
    note: "4 mois",
    place: "Secours Catholique",
    role: "Technicien helpdesk N1/N2",
    text: "En production. Tickets sous SLA, incidents Windows et Microsoft 365, comptes et droits Active Directory, diagnostics réseau, escalade N3 et procédures pour la base de connaissances.",
    keywords: ["AD DS", "Microsoft 365", "TCP/IP · DNS · VPN", "SLA"],
  },
  {
    start: "2026-09",
    period: "en cours",
    note: "Paris",
    place: "BTS SIO SISR",
    role: "AURLOM · 1re année",
    text: "Solutions d'infrastructure, systèmes et réseaux. Je cherche l'entreprise où jouer la suite : alternance à partir de septembre 2027, 3 jours en entreprise, 2 jours à l'école.",
    keywords: ["Systèmes", "Réseaux", "Alternance 3 j / 2 j"],
    current: true,
  },
];

export type SheetRow = {
  label: string;
  items: string;
  /** Précision secondaire, affichée en retrait. */
  aside?: string;
};

/** Fiche technique : compétences du CV, par familles. */
export const SHEET: readonly SheetRow[] = [
  {
    label: "Systèmes",
    items: "Windows Server 2019 · 2022 · 2025, Linux Debian, Ubuntu Server, Windows, macOS",
  },
  {
    label: "Microsoft",
    items: "AD DS, GPO, Entra ID, Intune, Autopilot, Microsoft 365",
    aside: "modèle AGDLP",
  },
  { label: "Réseaux", items: "TCP/IP, VLAN, routage, NAT, HSRP, VPN, DNS, DHCP, DFS-N, DFS-R" },
  { label: "Sécurité", items: "OPNsense, pfSense", aside: "gestion des accès" },
  { label: "Virtualisation", items: "Proxmox, VMware, Docker" },
  {
    label: "Support",
    items: "N1/N2, diagnostic matériel et réseau, équipements FTTH",
    aside: "Cisco Packet Tracer",
  },
  { label: "Code", items: "Python, JavaScript, SQL, n8n, Git" },
  {
    label: "Méthodes",
    items: "Rédaction de procédures, formation des utilisateurs, méthode agile",
  },
  {
    label: "Formation",
    items: "BTS SIO SISR, AURLOM (en cours) · Piscine, École 42 (2023)",
    aside: "Bac Pro SN ARED, Lycée Newton (2022)",
  },
];
