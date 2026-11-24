# Codebase Audit: dependencies

Dépendances saines : lockfile commité, 866 empreintes d'intégrité, aucune dépendance git ni URL, aucune licence GPL ou AGPL en production. Deux alertes modérées, uniquement au build.

- **Date**: 2026_11_24
- **Scope**: `package.json`, `pnpm-lock.yaml` (`pnpm audit`, `pnpm outdated`, `pnpm licenses list --prod`)
- **Health**: good
- **Findings**: 0 critical, 0 major, 3 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category     | Location | Issue | Suggested fix | Effort |
| --- | ------------ | -------- | ----- | ------------- | ------ |
| 🟢  | dependencies | `package.json:31` | Le CLI `shadcn` est en `dependencies` pour un seul `@import "shadcn/tailwind.css"`. Il entraîne `ts-morph` → `minimatch` < 11.0.1 (GHSA-g3hv-75wg-m249, modérée) dans l'arbre de production. **Corrigé le 2026-11-24** (alerte restante limitée au CLI en dev). | Passer `shadcn` en `devDependencies` : la CSS est lue au build, et Vercel installe les dépendances de dev. Vérifier par un `pnpm build`. | S |
| 🟢  | dependencies | `package.json:39` | `@tailwindcss/typography` entraîne `postcss-selector-parser` < 6.1.5 (GHSA-rj75-hqrm-r3gf, modérée). Ce n'est utilisé qu'au build, sans entrée externe. **Corrigé le 2026-11-24** (override pnpm, 6.1.6). | Ajouter une `overrides` pnpm (`postcss-selector-parser: ">=6.1.5"`) ou attendre la mise à jour du plugin. | S |
| 🟢  | dependencies | `package.json:44` | Versions majeures en retard : `eslint` 9 → 10, `typescript` 6 → 7 (`:47`). **Montés le 2026-11-24** (TypeScript 6 gardé à côté pour `typescript-eslint`). Correctifs disponibles : `@playwright/test` 1.65.1 et `lucide-react` 1.74 (PR Dependabot #24 et #23 ouvertes), `vitest` 5.1.1. | Merger les PR Dependabot ouvertes. Traiter ESLint 10 et TypeScript 7 dans une PR à part, après avoir vérifié la compatibilité de `eslint-config-next`. | M |

## Top actions

1. Merger les PR Dependabot #23 et #24, puis passer `shadcn` en dépendance de dev (ligne 1) : l'alerte `minimatch` quitte l'arbre de production.
2. Ajouter l'override `postcss-selector-parser` (ligne 2).
3. Planifier la montée vers ESLint 10 et TypeScript 7 (ligne 3).

## Coverage

- **Scanned**: dependencies (CVE via `pnpm audit`, versions via `pnpm outdated`, licences de production, dépendances déclarées mais non importées, intégrité du lockfile). Licence notable : `@img/sharp-libvips` en LGPL-3.0, liée dynamiquement par `next/image`, acceptable pour un site non commercial.
- **Skipped**: none. Attention : pendant l'audit, `package.json` et `pnpm-lock.yaml` ont été réécrits à 09:07 (montées dans les plages, comme un `pnpm update`) et ne sont pas commités. Les deux alertes ci-dessus valent aussi pour le lockfile commité (`postcss-selector-parser@6.0.10`, `minimatch@10.2.6`).
