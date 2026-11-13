---
objective: "Le portfolio est un projet Next.js qui build en prérendu statique avec toutes ses routes squelettes, son contenu MDX d'exemple, son SEO de base et son outillage (lint, typecheck, Dependabot)."
status: implemented
---

# Plan: Scaffold initial du portfolio yanis-harrat.com

Source: Contrat SDLC du 2026-11-13 (texte), fondé sur `aidd_docs/INSTALL.md` et `aidd_docs/memory/*.md`

## Phases

| #   | Phase | File | Depends on |
| --- | ----- | ---- | ---------- |
| 1   | Socle Next.js, shadcn et outillage | [`phase-1.md`](./phase-1.md) | none |
| 2   | Contenu MDX et pages dynamiques | [`phase-2.md`](./phase-2.md) | 1 |
| 3   | Layout, pages squelettes, SEO et mémoire | [`phase-3.md`](./phase-3.md) | 1, 2 |

## External sources

| URL | What it settled |
| --- | --------------- |
| https://nextjs.org/docs/app/guides/mdx | Dépendances `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` et `@types/mdx`. `mdx-components.tsx` est requis dans `src/`. Import dynamique d'un `.mdx` et `export const metadata` lisible à l'import. Plugins en strings sous Turbopack |
| https://nextjs.org/docs/app/guides/migrating-to-cache-components | Avec `cacheComponents`, `dynamicParams` fait échouer le build : il faut utiliser `notFound()`. `generateStaticParams` doit renvoyer au moins un param. `ensureStatic = 'navigation'` (16.4+) impose une route statique |
| https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents | `cacheComponents` va de pair avec `partialPrefetching`, et les deux deviennent le défaut à la prochaine version majeure |
| https://nextjs.org/docs/app/api-reference/config/eslint | `next lint` est supprimé en Next 16. ESLint CLI avec un `eslint.config.mjs` en flat config |
| https://www.npmjs.com/package/create-next-app | v16.4.6 sondée dans le scratchpad. Elle génère `"lint": "eslint"`, `dev`/`build`/`start`, `cacheComponents: true`, `partialPrefetching: true`, Tailwind 4 via `@tailwindcss/turbopack` (sans PostCSS), `pnpm-workspace.yaml`, `next-env.d.ts`, `public/*.svg`, `src/app/favicon.ico` et `.gitignore` avec `.env*` |
| https://www.npmjs.com/package/shadcn | v4.23.0 sondée. Le style `new-york` n'existe plus. `init -b radix -p nova --no-monorepo -y` donne le style `radix-nova` avec `tw-animate-css`, `radix-ui`, `lucide-react` et `src/lib/utils.ts` |

## Impact

| Category | Verdict and evidence | Handled in |
| -------- | -------------------- | ---------- |
| runtime | Dépend du registre npm pendant l'installation (observé lors des sondes). Le comportement de `<Analytics />` hors de Vercel n'a pas été vérifié, et le déploiement est hors périmètre | 1, 3 |
| regression | Pas de code existant. État initial observé : `CLAUDE.md`, `aidd_docs/`, `.DS_Store` et un `.git` sans commit sur `claude/scaffold-portfolio`. Le filet de sécurité est un commit de ces fichiers avant le scaffold, suivi d'un `git diff` sur `CLAUDE.md` et `aidd_docs/` après la copie. Risque faible | 1 |
| architecture | Part d'un repo vide et crée le monolithe Next.js prérendu décrit dans `architecture.md` et `codebase-map.md`. Cache Components est actif, ce qui diffère du « SSG classique » décrit en mémoire | 1, 2, 3 |
| documentation | `README.md` est créé. Il faut aligner `coding-assertions.md` (`lint` = `eslint`), `design.md` (style `radix-nova` au lieu de `new-york`) et `navigation.md` (`notFound()` au lieu de `dynamicParams`), puis rafraîchir la mémoire | 3 |

## Rules

| Rule | Why it applies |
| ---- | -------------- |
| Jamais de travail sur `main`, la branche est `claude/scaffold-portfolio` | Règle globale CLAUDE.md, hook `protect-main` |
| Serveurs de dev et commandes bornées via Portly | Règle globale CLAUDE.md |
| Contenu en MDX via `@next/mdx`, pas `next-mdx-remote` | `architecture.md` |
| Toutes les routes prérendues, les `[slug]` via `generateStaticParams` | `navigation.md`, contrainte SEO |
| Pas de `tailwind.config` : les tokens vont dans `src/app/globals.css` | `design.md` |
| Épingler les versions exactes des CLI de scaffold | `INSTALL.md` (Stack summary) |
| `mentions-legales` déclare Resend, Turnstile et Vercel Analytics | `integration.md`, RGPD |
| Conventional Commits en anglais | `vcs.md` |

## Decisions

| Decision | Why |
| -------- | --- |
| Scaffold dans un dossier temporaire du scratchpad, puis copie à la racine, sans `AGENTS.md` ni `CLAUDE.md` générés (`--no-agents-md`) | create-next-app refuse un dossier non vide, et un `AGENTS.md` ferait concurrence au bloc mémoire AIDD |
| On garde `cacheComponents` et `partialPrefetching`, actifs par défaut. Un slug inconnu passe par `notFound()` au lieu de `dynamicParams = false` | C'est le modèle par défaut de Next 16.4 et le futur défaut de la prochaine version majeure : le désactiver créerait une dette de migration |
| shadcn en base `radix`, preset `nova` (style `radix-nova`) | `new-york` a disparu en v4. Radix est la base auditée dans INSTALL.md |
| `.gitignore` en `.env*` avec l'exception `!.env.example`, au lieu de `.env*.local` | Le template de Next 16.4 ignore déjà tous les `.env*`, ce qui est plus strict que le contrat. L'exception garde `.env.example` versionné |
| Métadonnées des contenus via `export const metadata` dans le MDX, typées par une déclaration de module `*.mdx` | Supporté nativement par `@next/mdx`. `@types/mdx` ne type que l'export par défaut |
