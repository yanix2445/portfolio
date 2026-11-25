// Modèle des projets, sans dépendance serveur : utilisable par les composants client.

export type ProjectStatus = "released" | "in-progress" | "upcoming";

export type ProjectDomain = "systemes" | "reseau" | "securite" | "virtualisation" | "code" | "autre";

/** Le cadre du projet : en entreprise (alternance, stage), en formation (BTS, école) ou chez soi. */
export type ProjectContext = "entreprise" | "formation" | "personnel";

/** Champs propres aux fiches de `src/content/projets/`, tous optionnels. */
export type ProjectFields = {
  /** Projet mis en avant sur l'accueil. */
  featured?: boolean;
  /** Ordre parmi les projets à la une : 1 en premier. Sans rang, après les autres. */
  rank?: number;
  status?: ProjectStatus;
  domain?: ProjectDomain;
  /** Cadre du projet. À défaut, « personnel ». */
  context?: ProjectContext;
  /** Titre court pour l'affiche. À défaut, le titre de la fiche. */
  poster?: string;
  /** Image de l'affiche (capture, photo, schéma), chemin dans `public/`, ex. `/images/projets/<slug>.jpg`. */
  cover?: string;
  /** Description de l'image pour les lecteurs d'écran, sur la page du projet. */
  coverAlt?: string;
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  released: "À l'affiche",
  "in-progress": "En tournage",
  upcoming: "Prochainement",
};

/** Sens des statuts, en clair : les libellés empruntent au cinéma. */
export const STATUS_MEANING: Record<ProjectStatus, string> = {
  released: "terminé",
  "in-progress": "en cours",
  upcoming: "à venir",
};

/** Les statuts présents dans une liste, dans l'ordre terminé, en cours, à venir. */
export function presentStatuses(projects: readonly Project[]): ProjectStatus[] {
  return (Object.keys(STATUS_LABEL) as ProjectStatus[]).filter((status) =>
    projects.some((project) => project.status === status),
  );
}

export const CONTEXT_LABEL: Record<ProjectContext, string> = {
  entreprise: "Entreprise",
  formation: "Formation",
  personnel: "Personnel",
};

export const CONTEXT_ORDER: readonly ProjectContext[] = ["entreprise", "formation", "personnel"];

/** Les cadres qui ont au moins un projet, dans l'ordre d'affichage. */
export function presentContexts(projects: readonly Project[]): ProjectContext[] {
  return CONTEXT_ORDER.filter((context) => projects.some((project) => project.context === context));
}

export const DOMAIN_LABEL: Record<ProjectDomain, string> = {
  systemes: "Systèmes",
  reseau: "Réseau",
  securite: "Sécurité",
  virtualisation: "Virtualisation",
  code: "Code",
  autre: "Autre",
};

export const DOMAIN_ORDER: readonly ProjectDomain[] = [
  "systemes",
  "reseau",
  "securite",
  "virtualisation",
  "code",
  "autre",
];

export type Project = {
  slug: string;
  title: string;
  poster: string;
  summary: string;
  date: string;
  tags: string[];
  featured: boolean;
  rank: number;
  status: ProjectStatus;
  domain: ProjectDomain;
  context: ProjectContext;
  /** Image de l'affiche, ou `null` sans image. */
  cover: string | null;
};

type ProjectSource = {
  slug: string;
  metadata: { title: string; summary: string; date: string; tags: string[] } & ProjectFields;
};

/** Applique les valeurs par défaut : non à la une, « À l'affiche », domaine « Autre », cadre « Personnel ». */
export function toProject({ slug, metadata }: ProjectSource): Project {
  return {
    slug,
    title: metadata.title,
    poster: metadata.poster ?? metadata.title,
    summary: metadata.summary,
    date: metadata.date,
    tags: metadata.tags,
    featured: metadata.featured ?? false,
    rank: metadata.rank ?? Number.POSITIVE_INFINITY,
    // Une valeur inconnue (faute de frappe dans une fiche) retombe sur le défaut.
    status: metadata.status && metadata.status in STATUS_LABEL ? metadata.status : "released",
    domain: metadata.domain && metadata.domain in DOMAIN_LABEL ? metadata.domain : "autre",
    context: metadata.context && metadata.context in CONTEXT_LABEL ? metadata.context : "personnel",
    cover: metadata.cover ?? null,
  };
}

export const FEATURED_COUNT = 3;

/**
 * Les projets à la une : ceux marqués `featured` d'abord (par `rank`), complétés par les plus récents.
 * `projects` est attendu du plus récent au plus ancien.
 */
export function pickFeatured(projects: readonly Project[], count = FEATURED_COUNT): Project[] {
  const featured = projects
    .filter((project) => project.featured)
    .toSorted((a, b) => a.rank - b.rank);
  const others = projects.filter((project) => !project.featured);
  return [...featured, ...others].slice(0, count);
}

/** Les domaines qui ont au moins un projet, dans l'ordre d'affichage. */
export function presentDomains(projects: readonly Project[]): ProjectDomain[] {
  return DOMAIN_ORDER.filter((domain) => projects.some((project) => project.domain === domain));
}
