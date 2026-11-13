# Refonte de l'accueil (direction Impeccable « Opérationnel dès lundi »)

## Target

La page d'accueil est entièrement refaite selon le contrat de direction `.impeccable/surfaces/src-app-page-tsx.md` : un recruteur comprend en 10 secondes que Yanis HARRAT est « opérationnel dès lundi » et peut l'appeler ou télécharger son CV, au niveau de finition de dovetail.com.

## Hard constraints

- **Le contrat de direction fait loi** : THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, motion et palette tirée du portrait (`.impeccable/surfaces/src-app-page-tsx.md`).
- **Refus explicites de Yanis** : aucun rendu template SaaS (cartes lumineuses, dégradés, glow), aucun cliché hacker, pas de CV plat, aucune animation gratuite, aucune métaphore lourde.
- **Contenu** : tout fait affiché vient du CV, de `src/lib/profile.ts` ou de `src/lib/site.ts`. La démo de tickets est étiquetée « exemple » et n'invente aucun chiffre présenté comme réel.
- **Garde-fous** :
  - le H1 est lisible sans JavaScript ;
  - `prefers-reduced-motion` donne une page complète et statique ;
  - focus clavier visible ;
  - aucun débordement à 320 et 375 px ;
  - Lighthouse mobile ≥ 90 (performance) et 100 (accessibilité).
- **Pas de régression** : les autres pages, le SEO, le JSON-LD, le sitemap et la 404 continuent de fonctionner. Elles peuvent hériter des nouveaux tokens.

## Non-goals

- Réécrire le contenu des projets et de la veille : une session dédiée s'en charge.
- Ajouter le formulaire de contact.
- Basculer le domaine.
- Régénérer le CV PDF.

## Done-when

- Le premier écran correspond au FIRST VIEWPORT du contrat : titre trois voix avec le portrait en pastille, accroche, appel et CV visibles sans défiler, sur desktop et mobile.
- La démo de file de tickets tourne, se met en pause hors écran et au survol ou au focus, et reste statique en mouvement réduit.
- La relecture finale Impeccable (finish reviewer) rend le verdict `ship`. DESIGN.md et `.impeccable/design.json` décrivent le monde construit.
- Les suites de tests passent, avec des tests e2e qui couvrent le nouveau premier écran.

## Open Questions

None

## Stakeholders

- Decider: Yanis HARRAT
- Owner: Yanis HARRAT
- Consumer: recruteurs en alternance

## Context

- Produit : `PRODUCT.md`. Direction : `.impeccable/surfaces/src-app-page-tsx.md`. L'ancien accueil (PR #10) sert de contre-exemple : il a été rejeté comme générique.
