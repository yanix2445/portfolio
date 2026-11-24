# Codebase Audit: code-quality

Code propre et lisible dans l'ensemble. Un vrai bug : l'envoi automatique du formulaire de contact, après l'arrivée du jeton Turnstile, ne part jamais.

- **Date**: 2026_11_24
- **Scope**: `src/`, `tests/`, fichiers de configuration (`main` à `9bd7bff`)
- **Health**: fair
- **Findings**: 1 critical, 0 major, 6 minor

Sévérité : 🔴 critique (à corriger maintenant), 🟡 majeur (bientôt), 🟢 mineur (quand c'est pratique). Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category     | Location | Issue | Suggested fix | Effort |
| --- | ------------ | -------- | ----- | ------------- | ------ |
| 🔴  | code-quality | `src/components/contact/contact-form.tsx:144` | `stopWaiting(true)` appelle `requestSubmit()` juste après `setWaiting(false)`, mais l'état n'est pas encore appliqué : `handleSubmit` voit encore `busy === true` et annule l'envoi (`:164-166`). Le message ne part pas et aucun message ne s'affiche. Reproduit le 2026-11-24 (dev, clés de test Turnstile, `turnstile.reset()` puis clic) : spinner, jeton reçu, **0 appel** à la Server Action, ni toast ni résultat. Un second clic envoie bien. **Corrigé le 2026-11-24** (`flushSync`, branche `claude/fix-contact-auto-submit`). Le cas touche le visiteur à qui Cloudflare demande de cocher la case (widget `interaction-only`) et celui qui envoie dans la première seconde. | Ne pas repasser par `handleSubmit` : garder « envoi en attente » dans un `ref` lu par `handleSubmit`, ou `flushSync(() => setWaiting(false))` avant `requestSubmit()`, ou lancer directement `formAction(new FormData(form))` dans `startTransition`. Ajouter le test e2e décrit dans `tests.md`. | S |
| 🟢  | code-quality | `src/components/contact/contact-form.tsx:81` | Composant de 379 lignes qui mêle le brouillon (`sessionStorage`), l'attente du jeton Turnstile et le rendu du billet. C'est cette imbrication qui rend le bug ci-dessus difficile à voir et à tester. **Corrigé le 2026-11-24** (PR #33 : `useContactDraft` et `useTurnstileGate`, 280 lignes). | Extraire `useContactDraft` et `useTurnstileGate` (attente, délai, envoi automatique). | M |
| 🟢  | code-quality | `src/components/contact/contact-form.tsx:33` | `FIELD_ORDER` et `TEXT_FIELDS` (`:34`) contiennent la même liste. **Corrigé le 2026-11-24.** | Garder une seule constante. | S |
| 🟢  | code-quality | `src/components/content/entry-list.tsx:53` | Reçoit `collection`, mais affiche « Lire l'article → » en dur : généralisation inachevée (seule la veille s'en sert). **Corrigé le 2026-11-24** (libellé tiré de `collection`). | Retirer le paramètre, ou dériver le libellé de `collection` comme `entry-page.tsx:274`. | S |
| 🟢  | code-quality | `src/components/home/hero-section.tsx:37` | `priority` est déprécié depuis Next 16 au profit de `preload` (doc `next/dist/docs/.../image.md:294`). `entry-page.tsx:227` utilise déjà `preload`. **Corrigé le 2026-11-24.** | Remplacer par `preload`. | S |
| 🟢  | code-quality | `.env.example:17` | « les quatre variables ci-dessus (hors CONTACT_FROM_EMAIL) » : il y en a six au-dessus, dont `RESEND_WEBHOOK_SECRET`, qui n'est pas requise pour afficher le formulaire. **Corrigé le 2026-11-24.** | Nommer les quatre variables requises. | S |
| 🟢  | code-quality | `src/components/home/acts-section.tsx:5` | `ROMAN` s'arrête à VIII : un 9e acte afficherait « Acte undefined ». | Convertir le nombre en chiffres romains, ou faire échouer `profile.test.ts` au-delà de 8 actes. | S |

## Top actions

1. Corriger l'envoi automatique après le jeton (ligne 🔴) et le couvrir par un test e2e (`tests.md`, ligne 1). À confier à `aidd-dev:08-debug` ou `aidd-dev:02-implement`.
2. Extraire les deux hooks du formulaire pendant la correction (ligne 2), pour que le chemin d'attente se teste seul. À confier à `aidd-dev:07-refactor`.
3. Regrouper les cinq petites corrections 🟢 restantes dans un seul commit de nettoyage.

## Coverage

- **Scanned**: code-quality (lecture de tous les fichiers de `src/`, `pnpm typecheck`, `pnpm lint` et `pnpm test` au vert le 2026-11-24, reproduction du bug dans le navigateur)
- **Skipped**: aucun outil d'exports inutilisés (knip, ts-prune) : le code mort n'a été cherché qu'à la main
