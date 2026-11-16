# Accueil « Générique » et catalogue de projets

## Target

L'accueil et la page des projets du portfolio reproduisent la direction « Générique » validée sur maquette, de sorte qu'un recruteur d'alternance comprenne en un défilement qui est Yanis HARRAT, son parcours, ses projets et comment l'appeler.

## Hard constraints

- **Fidélité à la maquette** : l'accueil suit [`mockup/index.html`](./mockup/index.html) pour l'univers (couleurs, lettrage, légendes), l'ordre des sections et la mise en scène au défilement. Le hero est reproduit à l'identique.
- **Portrait** : la tête de Yanis est entière à chaque étape de l'animation et sur chaque taille d'écran. Seul le bas de la photo peut être rogné.
- **Actes** : un acte par expérience, avec lieu, dates et rôle, dans l'ordre chronologique, le BTS en cours en dernier.
- **Projets à la une** : l'accueil montre exactement 3 projets, ceux que Yanis a marqués « à la une », et un lien vers le catalogue qui affiche le nombre total de projets.
- **Catalogue** : `/projets` liste tous les projets dans le même univers. Chaque projet porte un statut parmi « À l'affiche », « En tournage » et « Prochainement », et on peut filtrer par domaine.
- **Certifications** : une couronne de laurier par certification, avec son nom. Le badge officiel est affiché quand Yanis en a fourni le fichier. Aucun logo de marque n'est redessiné.
- **Vérité du contenu** : chaque fait affiché (dates, employeurs, compétences, certifications) vient du CV ou d'une confirmation de Yanis. Rien n'est inventé.
- **Accents** : aucune lettre accentuée d'un titre n'est masquée ou coupée par la ligne voisine.
- **Mobile** : toute la page est utilisable sur téléphone, sans défilement horizontal de la page. Les actes s'y lisent en colonne.
- **Sans animation** : avec la préférence « réduire les animations », ou sans JavaScript, tout le contenu reste visible et lisible, sans mouvement.
- **Clavier** : chaque lien et bouton est atteignable au clavier, avec un focus visible.
- **Performance** : le score de performance mobile de l'accueil est d'au moins 85, et celui d'accessibilité est de 100.
- **Reste du site** : les pages de détail d'un projet, la veille, le contact et les mentions légales adoptent les couleurs et les polices du nouvel univers, et continuent de fonctionner. Le SEO, le sitemap, la page 404 et le balisage de la personne sont conservés.

## Non-goals

- Refaire la mise en page des pages de détail d'un projet, de la veille, du contact et des mentions légales.
- Écrire de nouvelles fiches de projet : seules les fiches existantes sont cataloguées.
- Ajouter le formulaire de contact.
- Régénérer le CV PDF.
- Basculer le domaine `yanis-harrat.com` vers ce site.
- Reprendre quoi que ce soit des designs rejetés (PR #10 et #11) ou des maquettes « Topologie » et « Kinetic ».

## Done-when

- Sur ordinateur, un visiteur qui défile l'accueil voit dans l'ordre : le hero, sa transformation en affiche avec le synopsis, les cinq actes, « À l'affiche », la « Fiche technique », les certifications et la fin avec l'appel, l'e-mail et le CV.
- À chaque instant de l'animation du hero, la tête de Yanis est entière.
- L'accueil montre 3 projets à la une et un lien vers le catalogue avec le bon nombre de projets.
- Sur `/projets`, tous les projets apparaissent avec leur statut, et un filtre par domaine réduit la liste.
- Sur un écran de 375 px de large, toute la page se lit sans défilement horizontal et les actes sont en colonne.
- Avec « réduire les animations », et sans JavaScript, toutes les sections sont visibles sans mouvement.
- Aucun accent de titre n'est masqué, sur ordinateur comme sur mobile.
- Le score mobile de l'accueil atteint 85 en performance et 100 en accessibilité.
- Les suites de tests passent, et des tests automatiques couvrent l'ordre des sections, les projets à la une, les filtres du catalogue, le rendu mobile et le rendu sans animation.
- Yanis valide le rendu réel sur une prévisualisation avant toute fusion.

## Open Questions

None

## Stakeholders

- Decider: Yanis HARRAT
- Owner: Yanis HARRAT
- Consumer: recruteurs d'alternance, enseignants et jury du BTS

## Context

- Brief validé et décisions : [brainstorm.md](./brainstorm.md). Produit : `PRODUCT.md`.
- Trois points ont une valeur par défaut tant que Yanis n'a pas répondu, sans bloquer la construction :
  - l'École 42 reste l'acte I ;
  - les compétences affichées sont celles du CV, plus la rédaction de procédures, la formation des utilisateurs et la méthode agile ;
  - une certification sans badge fourni affiche le nom de l'organisme et de la certification.
- Les trois vrais projets (lab Active Directory, homelab, AppKite) sont dans la PR #12, à fusionner pour que le catalogue montre du vrai contenu.
