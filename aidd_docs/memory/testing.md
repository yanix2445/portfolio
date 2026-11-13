# Testing

Comment le projet est vérifié : deux niveaux de tests automatisés, en plus du typage, du lint et du build.

## Strategy

- **Unitaires (Vitest)** : la logique pure, c'est-à-dire le listing et le tri du contenu (`src/lib/content.ts`), le sitemap et les métadonnées SEO des entrées. Ils tournent sur des **fixtures**, jamais sur le vrai contenu éditorial, qui change souvent.
- **E2E (Playwright)** : un smoke test du **build de production** (`next build` puis `next start`). C'est la seule façon fiable de vérifier les statuts 404, le prérendu, le sitemap et `robots.txt` sous Cache Components.
- **Manuel** : responsive mobile, animations (y compris avec `prefers-reduced-motion`) et Lighthouse sur l'accueil.

## Tools

- Vitest, avec `@mdx-js/rollup` pour importer les `.mdx`. Configuration dans `vitest.config.mts`.
- Playwright (Chromium). Configuration dans `playwright.config.ts`, avec un `webServer` qui build puis démarre sur le port 3100.

## Conventions

- `tests/unit/*.test.ts` : chaque fichier importe d'abord `./setup-content`. Ce fichier neutralise `cacheLife` de `next/cache` et pointe `process.cwd()` sur `tests/fixtures/`.
- Dans `vitest.config.mts`, l'alias `@/content/*` est redirigé vers `tests/fixtures/src/content/` avant l'alias `@/*`.
- `tests/e2e/*.spec.ts` : assertions sur des invariants, sans titres de contenu codés en dur, pour que les tests survivent aux changements de MDX.
- On teste le comportement visible (statuts HTTP, rôles ARIA, URL), jamais les détails d'implémentation.
- `EntryList` vide (« Aucun contenu pour le moment ») : volontairement non testé, c'est du rendu trivial.

## Run

- Unitaires : `pnpm test`.
- E2E : `pnpm test:e2e`. Le premier lancement nécessite `pnpm exec playwright install chromium`.
- Les deux commandes sont bornées : on les lance via `portly temp`.

## Browser QA

- Entry : `pnpm dev`, lancé via Portly, puis `http://localhost:3000`.
- Auth : aucune, le site est entièrement public.
- State : le contenu vient des fichiers MDX du repo. Pour le formulaire en local, utiliser les clés de test Turnstile de Cloudflare (une clé qui valide toujours, une qui échoue toujours) et une clé Resend dédiée au développement.
