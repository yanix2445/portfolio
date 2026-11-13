---
status: implemented
---

# Instruction: Layout, pages squelettes, SEO et mémoire

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx ✅
│   │   ├── mentions-legales/
│   │   │   └── page.tsx ✅
│   │   ├── layout.tsx
│   │   ├── not-found.tsx ✅
│   │   ├── page.tsx
│   │   ├── robots.ts ✅
│   │   └── sitemap.ts ✅
│   └── components/
│       └── layout/
│           ├── site-footer.tsx ✅
│           └── site-header.tsx ✅
├── aidd_docs/
│   └── memory/
│       ├── coding-assertions.md ✏️
│       ├── design.md ✏️
│       └── navigation.md ✏️
└── package.json
```

`layout.tsx`, `page.tsx` et `package.json` sont créés en phase 1 et modifiés ici.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Installer `@vercel/analytics` | La dépendance est présente | cli |
| Happy path | `pnpm build` | `/`, `/projets`, `/veille`, `/contact`, `/mentions-legales`, `/sitemap.xml` et `/robots.txt` sont prérendus | cli |
| Happy path | `pnpm start` via Portly, puis `curl` de `/sitemap.xml` et `/robots.txt` | Le sitemap liste les pages fixes et les 2 slugs d'exemple en `https://yanis-harrat.com`, et le robots pointe vers le sitemap | api |
| Happy path | `curl /` | Le HTML contient `<html lang="fr"`, le header, le footer et le H1 | api |
| Edge case | `curl -w '%{http_code}' /page-inconnue` | `404` avec le contenu de `not-found` | api |
| Edge case | Lien CV du header | Il pointe vers `/cv/yanis-harrat-cv.pdf`, qui renvoie 404 tant que le PDF n'est pas déposé dans `public/cv/`. C'est attendu et noté dans le README | api |
| Teardown | Arrêter le serveur Portly | Aucun serveur résiduel | system |

## Wireframe

```txt
┌─────────────────────────────────────┐
│ (1) Header : nom · Projets · Veille │
│     · Contact · CV (PDF)            │
├─────────────────────────────────────┤
│ (2) Hero : H1 nom + accroche BTS    │
│     SIO SISR · boutons Projets/CV   │
├─────────────────────────────────────┤
│ (3) Aperçu : derniers projets       │
├─────────────────────────────────────┤
│ (4) Footer : © · mentions légales · │
│     liens GitHub/LinkedIn           │
└─────────────────────────────────────┘
```

1. Header : navigation principale, avec le CV en lien vers `/cv/yanis-harrat-cv.pdf`.
2. Hero : H1 statique (élément LCP), sans animation dans cette feature.
3. Aperçu : les 3 dernières entrées de `getEntries('projets')`.
4. Footer : lien vers `/mentions-legales` et liens externes.

## Tasks to do

### `1)` Layout racine

> Poser le cadre commun et l'analytics.

1. `layout.tsx` :
   - `lang="fr"` et fonts via `next/font` (celles posées par shadcn) ;
   - `metadata` avec `metadataBase: new URL('https://yanis-harrat.com')`, un template de titre et une description ;
   - `<SiteHeader />`, `<SiteFooter />` et `<Analytics />` de `@vercel/analytics/next`.
2. Créer `site-header.tsx` et `site-footer.tsx` avec `next/link`. Pas de hook de route client hors `<Suspense>`.

### `2)` Pages squelettes

> Toutes les routes du contrat existent.

1. `page.tsx` : accueil selon le wireframe, sans animation.
2. `contact/page.tsx` : titre et texte d'attente, sans formulaire (feature suivante).
3. `mentions-legales/page.tsx` : sections éditeur, hébergeur (Vercel), formulaire de contact (Resend, stockage aux États-Unis, rétention de 30 jours), anti-spam (Cloudflare Turnstile, intérêt légitime), mesure d'audience (Vercel Analytics, sans cookie) et droits RGPD.
4. `not-found.tsx` avec un lien de retour vers l'accueil.
5. Ajouter au README une ligne : déposer le CV dans `public/cv/yanis-harrat-cv.pdf`.

### `3)` SEO technique

> Rendre le site indexable.

1. `sitemap.ts` : pages fixes, plus les slugs de `getSlugs('projets')` et `getSlugs('veille')`.
2. `robots.ts` : tout autoriser, avec un lien vers le sitemap.

### `4)` Mise à jour de la mémoire

> Aligner la mémoire sur le code réel.

1. `coding-assertions.md` : `pnpm lint` exécute `eslint` (ESLint CLI, `next lint` étant supprimé).
2. `design.md` : remplacer « style `new-york` » par « base Radix, preset `nova` (style `radix-nova`) ».
3. `navigation.md` : les `[slug]` utilisent `generateStaticParams` et `notFound()` (Cache Components actif, pas de `dynamicParams`).
4. Lancer `node <aidd-context>/hooks/update_memory.js claude` depuis la racine pour resynchroniser le bloc mémoire de `CLAUDE.md`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Le HTML de `/` contient `lang="fr"`, le header, le footer et le composant Analytics |
| 2 | `/`, `/contact` et `/mentions-legales` répondent 200, et une URL inconnue répond 404. Les mentions citent Resend, Turnstile et Vercel Analytics |
| 3 | `/sitemap.xml` contient 7 URL absolues en `https://yanis-harrat.com`, et `/robots.txt` référence le sitemap |
| 4 | `coding-assertions.md`, `design.md` et `navigation.md` décrivent le code réel, et le script de sync sort en 0 |
