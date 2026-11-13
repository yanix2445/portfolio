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
