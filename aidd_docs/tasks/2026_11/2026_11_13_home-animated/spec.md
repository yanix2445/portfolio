# Accueil complet et animé

## Target

La page d'accueil présente en un défilement l'identité, les compétences, les certifications, le parcours, les projets récents et le contact de Yanis HARRAT, dans une mise en scène sombre, audacieuse et richement animée.

## Hard constraints

- **Les six sections, dans cet ordre** :
  1. hero (photo, nom, accroche « Recherche d'alternance · Technicien systèmes & réseaux · BTS SIO SISR · 3 j entreprise / 2 j école », accès aux projets et au CV) ;
  2. compétences (6 groupes du CV) ;
  3. certifications (Cisco, Google IT Support, Google Cybersécurité, EBIOS Risk Manager, Anthropic) ;
  4. parcours (6 étapes, de 2022 à 2026, dont l'expérience de chef de rang présentée comme soft skills) ;
  5. projets récents (les 3 derniers projets publiés) ;
  6. veille et contact (le dernier article de veille et un appel à l'action vers la page contact).
- **Contenu fidèle au CV** : aucune compétence, certification, date ni employeur inventé.
- **Données centralisées** : compétences, certifications et parcours se modifient à un seul endroit, sans toucher à la mise en page.
- **Nom visible immédiatement** : le nom (titre principal) est lisible dès le premier affichage, avant toute animation et même sans JavaScript.
- **Mouvement réduit respecté** : quand le visiteur a demandé à réduire les animations, la page reste complète et lisible, sans mouvement.
- **Accès au clavier** : chaque lien et bouton est atteignable au clavier, avec un focus visible.
- **Rendu mobile** : la page est entièrement utilisable sur un écran de téléphone, sans défilement horizontal.
- **Performance** : le score de performance mobile de l'accueil reste au moins à 75.
- **Pas de régression** : les autres pages, les métadonnées SEO, la page 404, le sitemap et le balisage de la personne gardent leur comportement actuel.

## Non-goals

- Changer la mise en page des autres pages (projets, veille, contact, mentions légales). Le passage de tout le site au thème sombre est accepté (décision de Yanis du 2026-11-13) : seules leurs couleurs changent.
- Remplacer le contenu d'exemple des projets et de la veille.
- Régénérer le CV PDF (e-mail et téléphone perso à corriger côté Yanis).
- Ajouter le formulaire de contact.
- Basculer le domaine `yanis-harrat.com` vers ce site.

## Done-when

- Un visiteur sur l'accueil voit, en défilant, les six sections dans l'ordre, avec le contenu du CV.
- Le nom et l'accroche s'affichent dès le premier rendu, et sont présents dans le HTML avant l'exécution de tout script.
- Les entrées du hero, les compétences, les certifications et le parcours s'animent au défilement, et au moins une section est mise en scène pendant le scroll.
- Avec la préférence « réduire les animations », toutes les sections s'affichent sans mouvement.
- Sur un écran de 375 px de large, rien ne déborde horizontalement.
- Le score de performance mobile de l'accueil est d'au moins 75.
- Les suites de tests existantes passent, et la présence des six sections sur l'accueil est vérifiée automatiquement.

## Open Questions

None

## Stakeholders

- Decider: Yanis HARRAT
- Owner: Yanis HARRAT
- Consumer: recruteurs, entreprises d'accueil en alternance, enseignants du BTS

## Context

- Brief validé : [brainstorm.md](./brainstorm.md)
- Règles d'animation et d'accessibilité : `aidd_docs/memory/design.md`. Ici, l'effet passe avant la performance, avec 75 comme plancher au lieu d'un score maximal.
