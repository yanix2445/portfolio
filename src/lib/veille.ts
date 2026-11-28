// Présentation permanente de la veille technologique, affichée en tête de `/veille`.
// Le thème et la question ont été choisis par Yanis le 2026-11-28. On modifie le texte ici,
// sans toucher à la page. Rien n'y est inventé : ni publication, ni source, ni résultat de test.

export const VEILLE = {
  /** Le sujet et l'objectif, en introduction sous le titre de la page. */
  intro:
    "Ma veille, dans le cadre de mon parcours SISR : l'IA, assistante de l'administrateur systèmes et réseaux, pour administrer, développer, automatiser et dépanner une infrastructure. Je suis ce qui sort, en entreprise comme chez les particuliers, je le teste et je donne mon avis.",
  /** La question à laquelle les fiches répondent, mot pour mot. */
  question:
    "Que peut vraiment faire l'IA pour un administrateur aujourd'hui, et que doit-il encore savoir faire lui-même ?",
  position: {
    ai: "L'IA propose et assiste.",
    admin: "L'administrateur vérifie, décide et reste responsable de l'infrastructure.",
  },
  /** La méthode, en tête du journal des fiches. */
  method:
    "Je suis mes sources au fil des jours. Tous les sept à dix jours, je retiens le sujet qui compte le plus pour un administrateur, je le teste et je publie une fiche : ce qui est sorti, ce que j'ai vérifié moi-même, et mon avis.",
} as const;
