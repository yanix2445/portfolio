// Présentation permanente de la veille technologique, affichée en tête de `/veille`.
// Le texte reprend la demande de Yanis (2026-11-25), resserré à sa demande. On le modifie ici,
// sans toucher à la page. Rien n'y est inventé : ni publication, ni source, ni résultat de test.

export const VEILLE = {
  /** Le sujet et l'objectif, en introduction sous le titre de la page. */
  intro:
    "Ma veille, dans le cadre de mon parcours SISR : l'intelligence artificielle comme assistant pour administrer, développer et dépanner une infrastructure systèmes et réseaux. Je cherche où elle fait gagner du temps, ses limites et ses risques, et une méthode d'utilisation sécurisée, traçable et contrôlée.",
  /** La problématique, mot pour mot. */
  question:
    "Dans quelle mesure l'intelligence artificielle peut-elle assister un administrateur dans ces tâches sans compromettre la sécurité ni la traçabilité des actions, tout en lui laissant la maîtrise des décisions et de leur exécution ?",
  position: {
    ai: "L'IA propose et assiste.",
    admin: "L'administrateur vérifie, décide et reste responsable de l'infrastructure.",
  },
  /** La méthode, en tête du journal des fiches. */
  method:
    "Pendant la semaine, je cherche, j'analyse les sources et je teste quand le sujet s'y prête. En fin de semaine, je publie une fiche qui sépare ce que j'ai lu de ce que j'ai vérifié moi-même.",
} as const;
