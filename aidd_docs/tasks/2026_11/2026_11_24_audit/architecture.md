# Codebase Audit: architecture

Le code suit la carte documentée (`aidd_docs/memory/codebase-map.md`, `architecture.md`) : les couches sont respectées et aucune dépendance ne va dans le mauvais sens.

- **Date**: 2026_11_24
- **Scope**: `src/`, comparé à `aidd_docs/memory/`
- **Health**: good
- **Findings**: 0 critical, 0 major, 2 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category     | Location | Issue | Suggested fix | Effort |
| --- | ------------ | -------- | ----- | ------------- | ------ |
| 🟢  | architecture | `src/components/content/entry-page.tsx:46` | Le module d'UI porte aussi la plomberie des routes : `entryStaticParams`, `entryMetadata` (`:51`), Open Graph compris. C'est un composant partagé par deux routes, mais il mélange rendu et métadonnées. | Déplacer `entryStaticParams` et `entryMetadata` dans `src/lib/` (par exemple `entries.ts`), à côté de `content.ts`. | S |
| 🟢  | architecture | `aidd_docs/tasks/2026_11/2026_11_15_finition-tokens-contact/plan.md:3` | Les quatre `plan.md` sont restés en `status: implemented` alors que leurs PR sont mergées (#1, #10, #13, #15). Les outils AIDD les lisent comme « à relire » (hedge de l'onboarding). | Passer à un statut final après le merge. Le framework ne définit pas de statut « shipped » : se mettre d'accord sur la valeur. | S |

## Top actions

1. Mettre à jour le statut des plans livrés (ligne 2), pour que l'onboarding AIDD ne propose plus de revue sur du travail déjà mergé.
2. Sortir les helpers de route de `entry-page.tsx` à la prochaine modification de ce fichier (ligne 1). À confier à `aidd-dev:07-refactor`.

## Coverage

- **Scanned**: architecture (conformité avec `codebase-map.md` et `architecture.md`, sens des imports : `src/lib` n'importe rien de `src/components`, `server-only` dans les deux clients externes, aucune God-module)
- **Skipped**: aucun ADR ni diagramme C4 : la conformité a été vérifiée contre la mémoire du projet (`aidd_docs/memory/`)
