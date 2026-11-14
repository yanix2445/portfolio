// Modèle des projets, sans dépendance serveur : utilisable par les composants client.

export type ProjectStatus = "released" | "in-progress" | "upcoming";

export type ProjectDomain = "systemes" | "reseau" | "securite" | "virtualisation" | "code" | "autre";

/** Champs propres aux fiches de `src/content/projets/`, tous optionnels. */
export type ProjectFields = {
  /** Projet mis en avant sur l'accueil. */
  featured?: boolean;
  /** Ordre parmi les projets à la une : 1 en premier. Sans rang, après les autres. */
  rank?: number;
  status?: ProjectStatus;
  domain?: ProjectDomain;
  /** Titre court pour l'affiche. À défaut, le titre de la fiche. */
  poster?: string;
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  released: "À l'affiche",
  "in-progress": "En tournage",
  upcoming: "Prochainement",
};

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
};

type ProjectSource = {
  slug: string;
  metadata: { title: string; summary: string; date: string; tags: string[] } & ProjectFields;
};

/** Applique les valeurs par défaut : non à la une, « À l'affiche », domaine « Autre ». */
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
    status: metadata.status ?? "released",
    domain: metadata.domain ?? "autre",
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
