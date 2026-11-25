# Run: Présentation permanente de la veille et fiches publiées

## Run 1

- Head: `8450153`
- Left: rien n'est commité (`vcs.md` : « AI should auto commit: never »). Écarts au plan, demandés par Yanis pendant la phase 4 : la présentation en rangées à légendes du wireframe de la phase 2 a été refusée deux fois (« trop de texte d'un bloc », « ça fait tableau », puis le bloc compact en deux colonnes). La version livrée est le « journal de bord » qu'il a choisi : la problématique et la position en tête, le sujet et l'objectif dans l'introduction, la méthode en tête des fiches, et les fiches sur un fil vertical repérées par leur semaine ISO, la date et le temps de lecture. Le « Fiche N » de la phase 3 cède la place à la semaine. L'ajout de `takeaway`, la section « Fiches publiées » et les titres de fiche en `h3` sont conformes au plan.

| Task | Validation | Result |
| ---- | ---------- | ------ |
| 1.1 | Ouvrir chaque fiche depuis `/veille` (`entry.spec.ts`), `portly temp 'pnpm test:e2e'` | Passe avant et après les changements ; le `h1` reprend `data-title` |
| 2.1 | Relecture de `src/lib/veille.ts` contre la demande de Yanis | Problématique mot pour mot ; le reste resserré à sa demande ; aucune publication, source ni résultat inventé |
| 2.2 | `/veille` en 1440 et 375 px, avec et sans JavaScript (script Playwright, puis `entry.spec.ts`) | Problématique et position avant les fiches, aucun débordement, présentation entière sans JavaScript |
| 3.1 | `pnpm typecheck` ; lecture de la fiche MDX | `takeaway` facultatif accepté ; seule la ligne `takeaway` ajoutée, citée de « Ce que j'en retiens » |
| 3.2 | `/veille` avec la fiche réelle puis avec deux fiches d'essai temporaires (supprimées) | Section « Fiches publiées » et compteur ; la dernière fiche au point plein ; semaine, date et durée ; « Ce que j'en retiens » seulement quand `takeaway` existe |
| 4.1 | Tests « présentation de la veille » et « sans JavaScript » dans `entry.spec.ts`, `pnpm test:e2e` | 76 tests e2e passent |
| 4.2 | Lecture de `design.md`, `project-brief.md`, `testing.md` | Les trois décrivent la page et les tests livrés |
| 4.3 | `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e` via `portly temp`, port 3100 libre ; `impeccable detect --changed` | Sorties 0 ; 72 tests unitaires, 76 e2e (`contact-turnstile.spec.ts` compris, réseau disponible) ; détecteur : aucun constat |
| 4.4 | Résumé final à Yanis | Rédigé dans la réponse |

## Run 2

- Head: `8450153`
- Left: rien n'est commité. À la demande de Yanis, l'en-tête passe en version compacte, comme celui de la page Contact : « Veille » à gauche, le sujet et l'objectif à droite ; sous un filet, la problématique en grand sur la largeur, puis la position. Le journal des fiches ne change pas.

| Task | Validation | Result |
| ---- | ---------- | ------ |
| 1.1 | Ouvrir chaque fiche depuis `/veille` (`entry.spec.ts`), `pnpm test:e2e` | Passe ; le `h1` reprend `data-title` |
| 2.1 | Relecture de `src/lib/veille.ts`, inchangé depuis le run 1 | Problématique mot pour mot ; rien d'inventé |
| 2.2 | `/veille` en 1440 et 375 px (capture Playwright) ; test « présentation de la veille » de `entry.spec.ts` | En-tête sur une ligne sur grand écran, empilé sur téléphone ; problématique et position avant les fiches ; aucun débordement |
| 4.3 | `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e` via `portly temp` ; `impeccable detect --changed` | Sorties 0 ; 76 e2e passent ; détecteur : aucun constat |
| 3.1 | `pnpm typecheck`, inchangé depuis le run 1 | `takeaway` facultatif accepté |
| 3.2 | `/veille` en 1440 et 375 px | « Fiches publiées », semaine, date, durée et « Ce que j'en retiens » inchangés |
| 4.1 | Tests « présentation de la veille » et « sans JavaScript », `pnpm test:e2e` | Passent avec le nouvel en-tête |
| 4.2 | Lecture de `design.md` | La version compacte de l'en-tête est décrite |
| 4.4 | Résumé final à Yanis | Rédigé dans la réponse |
