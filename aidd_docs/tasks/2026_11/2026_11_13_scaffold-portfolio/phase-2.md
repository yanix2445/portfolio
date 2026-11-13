---
status: pending
---

# Instruction: Contenu MDX et pages dynamiques

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── projets/
│   │   │   ├── page.tsx ✅
│   │   │   └── [slug]/
│   │   │       └── page.tsx ✅
│   │   └── veille/
│   │       ├── page.tsx ✅
│   │       └── [slug]/
│   │           └── page.tsx ✅
│   ├── components/
│   │   └── mdx/
│   │       └── prose.tsx ✅
│   ├── content/
│   │   ├── projets/
│   │   │   └── exemple-projet.mdx ✅
│   │   └── veille/
│   │       └── exemple-veille.mdx ✅
│   ├── lib/
│   │   └── content.ts ✅
│   ├── types/
│   │   └── mdx.d.ts ✅
│   └── mdx-components.tsx ✅
├── next.config.ts
└── package.json
```

`globals.css`, `next.config.ts` et `package.json` sont créés en phase 1 et modifiés ici.

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Installer `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` et `@tailwindcss/typography` | Les dépendances sont présentes dans `package.json` | cli |
| Happy path | `pnpm build` | La sortie liste `/projets/exemple-projet` et `/veille/exemple-veille` comme prérendus, sans erreur `dynamicParams` ni `blocking-prerender` | cli |
| Happy path | `pnpm start` via Portly, puis `curl` de `/projets` et `/projets/exemple-projet` | La liste contient le titre issu de `metadata`, et la page de détail contient le titre et le corps MDX | api |
| Edge case | `curl -o /dev/null -w '%{http_code}' /projets/inexistant` | `404`, via `notFound()` | api |
| Teardown | Arrêter le serveur Portly | Aucun serveur résiduel | system |

## Wireframe

```txt
┌─────────────────────────────────────┐
│ (1) Header (phase 3)                │
├─────────────────────────────────────┤
│ (2) Titre de section : Projets      │
│  ┌───────────────────────────────┐  │
│  │ (3) Carte : titre · résumé ·  │  │
│  │     date · tags → lien slug   │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│ (4) Page détail /projets/[slug] :   │
│     titre · métadonnées · corps MDX │
│     en prose                        │
├─────────────────────────────────────┤
│ (5) Footer (phase 3)                │
└─────────────────────────────────────┘
```

1. Header : ajouté en phase 3 dans le layout.
2. Titre de la liste (Projets ou Veille).
3. Une carte par entrée MDX, triée par date décroissante, avec un lien vers son slug.
4. Page de détail : métadonnées en en-tête, puis le contenu MDX stylé `prose`.
5. Footer : ajouté en phase 3.

## Tasks to do

### `1)` Configurer @next/mdx

> Rendre les fichiers `.mdx` importables sous Turbopack.

1. Installer les dépendances du Setup avec PNPM.
2. Dans `next.config.ts`, envelopper la config existante avec `createMDX()` (sans plugin pour l'instant, en strings si on en ajoute) et ajouter `pageExtensions: ['ts', 'tsx', 'md', 'mdx']`, sans perdre `cacheComponents`, `partialPrefetching` ni la règle Turbopack CSS.
3. Créer `src/mdx-components.tsx` (`useMDXComponents` typé avec `MDXComponents`).
4. Créer `src/types/mdx.d.ts`, qui déclare `module '*.mdx'` avec `export const metadata: ContentMeta` en plus du composant par défaut.
5. Ajouter `@plugin "@tailwindcss/typography";` dans `globals.css`, et vérifier au build que les classes `prose` sont générées. Sinon, styler `prose.tsx` à la main.

### `2)` Contenu d'exemple et listing

> Disposer d'une source de contenu typée.

1. Créer `exemple-projet.mdx` et `exemple-veille.mdx`, chacun avec `export const metadata = { title, summary, date, tags }` et un corps court.
2. Créer `src/lib/content.ts`, côté serveur uniquement :
   - type `ContentMeta` ;
   - `getSlugs(collection)`, qui lit le dossier via `fs` ;
   - `getEntries(collection)`, qui fait un import dynamique des `.mdx` et trie par date décroissante ;
   - `getEntry(collection, slug)`, qui renvoie `null` si le slug est inconnu.
3. Marquer ces fonctions `'use cache'` avec `cacheLife('max')` si le build signale une IO non cachée.

### `3)` Pages liste et détail

> Prérendre les pages projets et veille.

1. `src/app/projets/page.tsx` et `src/app/veille/page.tsx` listent les entrées sous forme de cartes.
2. `[slug]/page.tsx`, pour projets et veille :
   - `generateStaticParams` à partir de `getSlugs`, qui doit renvoyer au moins un slug ;
   - `notFound()` si `getEntry` renvoie `null` ;
   - `generateMetadata` à partir de `metadata` ;
   - rendu dans `src/components/mdx/prose.tsx` ;
   - aucun export `dynamicParams`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | Un `.mdx` importé compile au `pnpm build` sans erreur Turbopack, et `pnpm typecheck` accepte l'accès à `metadata` |
| 2 | `getEntries('projets')` renvoie l'entrée d'exemple avec son `title`, et `getEntry('projets', 'x')` renvoie `null` |
| 3 | Le build prérend les 4 routes. `/projets/exemple-projet` affiche le corps MDX, et `/projets/inexistant` renvoie 404 |
