# Codebase Audit: tests

La suite est bien équilibrée : 68 tests unitaires au vert, 5 fichiers e2e sur le build de production, des assertions sur le comportement visible, sans test ignoré. Deux trous : le chemin Turnstile n'est jamais exercé, et rien ne lance les tests automatiquement.

- **Date**: 2026_11_24
- **Scope**: `tests/`, `.github/`, `package.json`
- **Health**: good
- **Findings**: 0 critical, 2 major, 0 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category | Location | Issue | Suggested fix | Effort |
| --- | -------- | -------- | -------- | ------------- | ------ |
| 🟡  | tests    | `tests/e2e/contact.spec.ts:8` | Tous les tests du formulaire bloquent `challenges.cloudflare.com`. L'attente du jeton et l'envoi automatique qui suit ne sont donc jamais exécutés : c'est ainsi que le bug 🔴 de `code-quality.md` est passé. **Corrigé le 2026-11-24** (`tests/e2e/contact-turnstile.spec.ts`). | Ajouter un test qui laisse charger le widget de test (`1x00000000000000000000AA`), retarde `**/cdn-cgi/challenge-platform/**` de quelques secondes, clique sur « Envoyer » avant le jeton et attend exactement une requête de Server Action. Clé Resend factice : aucun envoi. | M |
| 🟡  | tests    | `.github/dependabot.yml:1` | Pas de CI : typage, lint, tests unitaires et e2e ne tournent qu'à la main, et le build Vercel ne lance que `next build`. Les PR Dependabot arrivent chaque semaine sans aucun test. | Workflow GitHub Actions sur chaque PR : `pnpm typecheck`, `pnpm lint`, `pnpm test`, puis `pnpm test:e2e` (Chromium en cache). Il reste dans le budget de 0 € (minutes gratuites). | M |

## Top actions

1. Écrire le test e2e du chemin Turnstile (ligne 1) avant de corriger le bug, pour le voir échouer puis passer. À confier à `aidd-dev:06-test`.
2. Ajouter la CI GitHub Actions (ligne 2), pour que les PR Dependabot soient vérifiées avant le merge.

## Coverage

- **Scanned**: tests (chemins critiques : formulaire, webhook, contenu, SEO ; tests qui testent l'implémentation ; tests instables : un seul `waitForTimeout(120)`, à l'intérieur d'un `toPass` qui sonde la stabilité, `home.spec.ts:168` ; tests ignorés : aucun ; équilibre de la pyramide)
- **Skipped**: aucun outil de couverture configuré, inspection statique seulement. Les e2e n'ont pas été relancés pour cet audit (Chromium de Playwright 1.65.0 absent de la machine).
