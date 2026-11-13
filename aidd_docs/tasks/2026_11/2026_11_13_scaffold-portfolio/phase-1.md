---
status: implemented
---

# Instruction: Socle Next.js, shadcn et outillage

## Architecture projection

> Tree of the final files. ✅ create · ✏️ modify · ❌ delete

```txt
.
├── .github/
│   └── dependabot.yml ✅
├── public/
│   ├── cv/
│   │   └── .gitkeep ✅
│   ├── file.svg ✅
│   ├── globe.svg ✅
│   ├── next.svg ✅
│   ├── vercel.svg ✅
│   └── window.svg ✅
├── src/
│   ├── app/
│   │   ├── favicon.ico ✅
│   │   ├── globals.css ✅
│   │   ├── layout.tsx ✅
│   │   └── page.tsx ✅
│   └── lib/
│       └── utils.ts ✅
├── .env.example ✅
├── .gitignore ✅
├── components.json ✅
├── eslint.config.mjs ✅
├── next-env.d.ts ✅
├── next.config.ts ✅
├── package.json ✅
├── pnpm-lock.yaml ✅
├── pnpm-workspace.yaml ✅
├── README.md ✅
└── tsconfig.json ✅
```

## Test Scope

| Scenario | Action | Observable outcome | Actor |
| -------- | ------ | ------------------ | ----- |
| Setup | Commiter `CLAUDE.md`, `aidd_docs/` et un `.gitignore` initial (`.DS_Store`) sur `claude/scaffold-portfolio` | `git log` affiche 1 commit, et `CLAUDE.md` est suivi | cli |
| Happy path | `pnpm typecheck`, `pnpm lint` puis `pnpm build` via `portly temp` | Les 3 commandes sortent en code 0. La sortie de build indique `Turbopack` | cli |
| Edge case | `git diff --stat HEAD -- CLAUDE.md aidd_docs/` après la copie | Diff vide : le scaffold n'a rien écrasé | cli |
| Edge case | `test ! -e AGENTS.md && test ! -e .git/../app/.git` et `git check-ignore .env.local` | Pas d'`AGENTS.md` ni de `.git` imbriqué. `.env.local` est ignoré, `.env.example` ne l'est pas | cli |
| Teardown | Supprimer `<scratchpad>/scaffold/` | Il ne reste aucun dossier temporaire | system |

## Tasks to do

### `1)` Filet de sécurité git

> Figer l'état initial avant le scaffold.

1. Créer un `.gitignore` minimal (`.DS_Store`), puis commiter `CLAUDE.md`, `aidd_docs/` et ce `.gitignore` sur `claude/scaffold-portfolio` (`docs: add aidd project memory and install guide`).

### `2)` Scaffolder Next.js

> Créer le projet Next.js 16 à la racine sans toucher à `CLAUDE.md` ni à `aidd_docs/`.

1. Dans `<scratchpad>/scaffold/`, lancer `npx -y create-next-app@16.4.6 portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --disable-git --no-react-compiler --no-agents-md --yes` via `portly temp`.
2. Copier le résultat à la racine sans `node_modules`, `.next`, `AGENTS.md` ni `CLAUDE.md`. Fusionner le `.gitignore` généré avec `.DS_Store`.
3. Renommer le package en `portfolio` dans `package.json`, puis lancer `pnpm install` à la racine.
4. Ajouter le script `"typecheck": "tsc --noEmit"`. Garder `"lint": "eslint"`, tel que généré. Vérifier que `dev`, `build` et `start` sont présents.
5. Garder `cacheComponents`, `partialPrefetching` et la règle Turbopack `@tailwindcss/turbopack` de `next.config.ts`.

### `3)` Initialiser shadcn/ui

> Poser le design system.

1. `pnpm dlx shadcn@4.23.0 init -b radix -p nova --no-monorepo -y` via `portly temp`.
2. Vérifier :
   - `components.json` avec le style `radix-nova`, la base `neutral` et les variables CSS ;
   - `src/lib/utils.ts` (`cn()`) ;
   - `globals.css` qui importe `tw-animate-css` ;
   - l'absence de `tailwind.config.*`.

### `4)` Fichiers d'outillage

> Ajouter les fichiers d'environnement, de sécurité et de doc.

1. `.env.example` avec `RESEND_API_KEY=`, `TURNSTILE_SECRET_KEY=`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY=` et `CONTACT_TO_EMAIL=`, chacun commenté en une ligne.
2. `.gitignore` : ajouter `!.env.example` sous `.env*`.
3. `.github/dependabot.yml` avec `npm` (répertoire `/`) et `github-actions`, en `weekly`.
4. Remplacer `README.md` par une version minimale : objectif, stack, commandes (`pnpm dev`, `typecheck`, `lint`, `build`), lien vers `aidd_docs/INSTALL.md`.
5. `public/cv/.gitkeep`.

## Test acceptance criteria

| Task | Acceptance criteria |
| ---- | ------------------- |
| 1 | `git log --oneline` affiche le commit de docs, et `git ls-files CLAUDE.md` le liste |
| 2 | `package.json` contient `dev`, `build`, `start`, `lint` et `typecheck`, avec `next` en `16.4.6` et `tailwindcss` en `4.x`. `pnpm build` sort en 0 et affiche `Turbopack`. Pas d'`AGENTS.md`. `git diff HEAD -- CLAUDE.md aidd_docs/` est vide |
| 3 | `components.json` déclare `radix-nova`, `cn()` est exporté, `globals.css` importe `tw-animate-css`, aucun `tailwind.config.*` |
| 4 | `.env.example` contient les 4 clés et n'est pas ignoré. `.env.local` est ignoré. `dependabot.yml` contient 2 écosystèmes en `weekly` |
