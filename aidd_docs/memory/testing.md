# Testing

Comment le projet est vérifié : deux niveaux de tests automatisés, en plus du typage, du lint et du build.

## Strategy

- **Unitaires (Vitest)** : la logique pure, c'est-à-dire le listing et le tri du contenu (`src/lib/content.ts`), le sitemap et les métadonnées SEO des entrées. Ils tournent sur des **fixtures**, jamais sur le vrai contenu éditorial, qui change souvent. Exception : `tests/unit/profile.test.ts` vérifie la structure de `src/lib/profile.ts` (7 certifications, 5 actes dans l'ordre, fiche technique).
- **E2E (Playwright)** : un smoke test du **build de production** (`next build` puis `next start`). C'est la seule façon fiable de vérifier les statuts 404, le prérendu, le sitemap et `robots.txt` sous Cache Components.
- **E2E accueil** (`tests/e2e/home.spec.ts`) :
  - Base : ordre des six sections, H1, 3 projets à la une et lien vers le catalogue, absence d'erreur console, focus clavier, rendu sans JavaScript.
  - Mise en scène en 1440 × 900 : tête entière à cinq instants du hero, intro sans élément qui s'affiche puis disparaît, synopsis toujours lu par les lecteurs d'écran, actes épinglés jusqu'au dernier, tout affiché une fois la page parcourue, retour propre sur petit écran après redimensionnement, aucun épinglage orphelin après une navigation client.
  - Autres tailles : portable 16:9 (1366 × 650), ultra-large (2560 × 1080) et tablette en portrait (768 × 1024) sans chevauchement ni débordement ; téléphone en paysage sans épinglage ; mobile 375 px sans débordement, actes en colonne, couronnes lisibles.
  - Avec `reducedMotion: 'reduce'` : rien d'épinglé ni de masqué, actes en colonne.
- **E2E catalogue** (`tests/e2e/projects.spec.ts`) : tous les projets avec leur statut, filtres par domaine et compteur.
- **Formulaire de contact** :
  - Unitaires (`contact.test.ts`, `contact-services.test.ts`) : validation, ordre de traitement de l'action avec Turnstile et Resend simulés (aucun mail si un champ est invalide ou si le jeton est refusé, jamais d'exception), et les deux clients avec `fetch` et le SDK simulés.
  - E2E (`contact.spec.ts`) : champs étiquetés, erreurs reliées aux champs, focus, clavier, page sans défilement en 1440 × 900, 1366 × 650 et 768 × 1024, 320 et 375 px. Le build de test porte la clé de site de test Turnstile ; le script de Cloudflare est bloqué, aucun message n'est envoyé.
  - Le vrai envoi se vérifie à la main, avec de vraies clés.
- **Rendu** (`tests/visual/`) : avant une réécriture de styles, `capture.mjs` prend 54 captures (accueil à plusieurs instants du défilement, sections, autres pages, en 1440, 768 et 375 px) ; `compare.mjs` liste celles qui diffèrent. `HIDE=<sélecteur>` masque un élément dont le changement est voulu. Les actes épinglés ont une tolérance plus large : leur numéro en contour glisse au sous-pixel.
- **Performance** : Lighthouse mobile sur l'accueil, planchers 85 en performance et 100 en accessibilité, sur l'accueil et sur `/contact` (mesuré le 2026-11-15 : 93 à 95 et 100). Lancé à la main sur le build de production (`pnpm start -p 3200`) via `portly temp`, avec `CHROME_PATH` sur le Chromium de Playwright. Résoudre ce chemin par un glob zsh : `ls` est coloré dans ce shell et injecte des codes ANSI. Dans un script zsh, ne pas nommer une variable `path` : elle est liée à `PATH`.
- **Manuel** : rendu visuel des animations et ressenti sur un vrai téléphone.

## Tools

- Vitest, avec `@mdx-js/rollup` pour importer les `.mdx`. Configuration dans `vitest.config.mts`.
- Playwright (Chromium). Configuration dans `playwright.config.ts`, avec un `webServer` qui build puis démarre sur le port 3100.

## Conventions

- `tests/unit/*.test.ts` : chaque fichier importe d'abord `./setup-content`. Ce fichier neutralise `cacheLife` de `next/cache` et pointe `process.cwd()` sur `tests/fixtures/`.
- Dans `vitest.config.mts`, l'alias `@/content/*` est redirigé vers `tests/fixtures/src/content/` avant l'alias `@/*`.
- `tests/e2e/*.spec.ts` : assertions sur des invariants, sans titres de contenu codés en dur, pour que les tests survivent aux changements de MDX. Les textes du profil sont importés de `src/lib/profile.ts` et `src/lib/site.ts`.
- Les erreurs console de `/_vercel/` sont ignorées en e2e : le script Vercel Analytics n'est servi que sur Vercel.
- On teste le comportement visible (statuts HTTP, rôles ARIA, URL), jamais les détails d'implémentation.
- Une section épinglée se repère par son `.pin-spacer` : `scrollToPin` place le défilement à une fraction de cet espace, `settle` attend que l'élément mesuré ne bouge plus (le `scrub` est lissé). Pas d'attente fixe.
- `scrollThrough` relit la hauteur de la page à chaque pas : les sections épinglées l'allongent après l'hydratation.
- `headCrop` mesure la part du portrait rognée en haut ; le plancher est 6 % (les cheveux commencent vers 8 %).
- Une affiche montre un titre court : le titre complet de la fiche est dans l'attribut `data-title` du lien.
- `EntryList` vide (« Aucun contenu pour le moment ») : volontairement non testé, c'est du rendu trivial.

## Run

- Unitaires : `pnpm test`.
- E2E : `pnpm test:e2e`. Le premier lancement nécessite `pnpm exec playwright install chromium`.
- Les deux commandes sont bornées : on les lance via `portly temp`.

## Browser QA

- Entry : `pnpm dev`, lancé via Portly, puis `http://localhost:3000`.
- Auth : aucune, le site est entièrement public.
- State : le contenu vient des fichiers MDX du repo. Pour le formulaire en local, utiliser les clés de test Turnstile de Cloudflare (une clé qui valide toujours, une qui échoue toujours) et une clé Resend dédiée au développement.
