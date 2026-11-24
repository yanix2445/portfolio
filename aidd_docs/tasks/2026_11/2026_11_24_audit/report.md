# Codebase Audit: portfolio (7 piliers)

Code sain et bien testé, mais un bug critique sur le seul chemin de conversion : si le visiteur clique sur « Envoyer » avant l'arrivée du jeton anti-spam, son message ne part jamais, sans aucun retour.

- **Date**: 2026_11_24
- **Scope**: tout le repo (`main` à `9bd7bff`), en-têtes HTTP de production
- **Health**: fair
- **Findings**: 1 critical, 4 major, 16 minor

Sévérité : 🔴 critique (à corriger maintenant), 🟡 majeur (bientôt), 🟢 mineur (quand c'est pratique). Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j. Le détail de chaque ligne est dans le fichier du pilier.

## Findings

| Sev | Category     | Location | Issue | Suggested fix | Effort |
| --- | ------------ | -------- | ----- | ------------- | ------ |
| 🔴  | code-quality | `src/components/contact/contact-form.tsx:144` | L'envoi automatique après le jeton Turnstile est annulé par `handleSubmit`, qui voit encore `busy === true`. Le message ne part pas, sans aucun retour. Reproduit le 2026-11-24 : 0 appel à la Server Action. **Corrigé le 2026-11-24** (`flushSync`, branche `claude/fix-contact-auto-submit`). | Marquer l'envoi en attente dans un `ref`, ou `flushSync` avant `requestSubmit()`, ou appeler `formAction` directement. | S |
| 🟡  | security     | `src/lib/contact-emails.ts:192` | L'accusé de réception recopie le nom libre vers n'importe quelle adresse : un relais de spam au nom du domaine. **Corrigé le 2026-11-24.** | Saluer sans le nom, ou refuser les noms qui contiennent un lien. | S |
| 🟡  | security     | `next.config.ts:4` | Seul HSTS est envoyé en production : pas de CSP, de `frame-ancestors`, de `nosniff`, de `Referrer-Policy`. **Corrigé le 2026-11-24.** | `headers()` dans `next.config.ts`, puis une CSP en `Report-Only`. | M |
| 🟡  | tests        | `tests/e2e/contact.spec.ts:8` | Cloudflare est bloqué dans tous les tests du formulaire : le chemin d'attente du jeton n'est jamais exécuté. **Corrigé le 2026-11-24** (`tests/e2e/contact-turnstile.spec.ts`). | Test e2e avec la clé de test et un défi retardé. | M |
| 🟡  | tests        | `.github/dependabot.yml:1` | Pas de CI : rien ne vérifie les PR, Dependabot compris. | Workflow GitHub Actions : typage, lint, unitaires, e2e. | M |
| 🟢  | code-quality | `src/components/contact/contact-form.tsx:81` | 379 lignes : brouillon, attente Turnstile et rendu mêlés. | Extraire `useContactDraft` et `useTurnstileGate`. | M |
| 🟢  | code-quality | `src/components/contact/contact-form.tsx:33` | `FIELD_ORDER` et `TEXT_FIELDS` en double. | Une seule constante. | S |
| 🟢  | code-quality | `src/components/content/entry-list.tsx:53` | « Lire l'article → » en dur malgré le paramètre `collection`. | Retirer le paramètre ou dériver le libellé. | S |
| 🟢  | code-quality | `src/components/home/hero-section.tsx:37` | `priority` est déprécié depuis Next 16. | `preload`. | S |
| 🟢  | code-quality | `.env.example:17` | « quatre variables ci-dessus » : il y en a six. | Nommer les quatre variables requises. | S |
| 🟢  | code-quality | `src/components/home/acts-section.tsx:5` | `ROMAN` s'arrête à 8 actes. | Conversion générique ou garde-fou dans le test. | S |
| 🟢  | security     | `src/lib/turnstile.ts:23` | `hostname` de `siteverify` non vérifié ; `localhost` accepté en production. | Contrôler `result.hostname`. | S |
| 🟢  | security     | `src/lib/contact.ts:69` | La regex d'e-mail accepte `?&<>"` : la réponse `mailto:` peut être pré-remplie. | Durcir la regex ou encoder la partie locale. | S |
| 🟢  | dependencies | `package.json:31` | Le CLI `shadcn` en production entraîne `minimatch` vulnérable (modérée). | Passer en `devDependencies`. | S |
| 🟢  | dependencies | `package.json:39` | `postcss-selector-parser` vulnérable (modérée, build seulement). | Override pnpm. | S |
| 🟢  | dependencies | `package.json:44` | ESLint 10 et TypeScript 7 disponibles ; PR Dependabot #23 et #24 ouvertes. | Merger #23 et #24, planifier les majeures. | M |
| 🟢  | architecture | `src/components/content/entry-page.tsx:46` | Helpers de route (paramètres, métadonnées) dans un module d'UI. | Les déplacer dans `src/lib/`. | S |
| 🟢  | architecture | `aidd_docs/tasks/2026_11/2026_11_15_finition-tokens-contact/plan.md:3` | Plans livrés restés en `status: implemented`. | Statut final après le merge. | S |
| 🟢  | performance  | `src/components/home/hero-section.tsx:33` | Portrait source PNG de 1,75 Mo. | Source compressée en WebP ou JPEG. | S |
| 🟢  | ui           | `src/components/content/entry-list.tsx:29` | Nom accessible très long pour chaque ligne de la veille. | Lien nommé par le titre seul. | S |
| 🟢  | ui           | `src/lib/contact-emails.ts:14` | Couleurs des mails recopiées sans contrôle de synchronisation. | Test qui compare avec `globals.css`. | S |

## Top actions

1. **Réparer l'envoi du formulaire** (🔴 `contact-form.tsx:144`, avec 🟡 `contact.spec.ts:8`) : écrire d'abord le test e2e qui échoue, puis corriger, en extrayant `useTurnstileGate` au passage. À confier à `aidd-dev:06-test` puis `aidd-dev:08-debug`.
2. **Fermer le relais de spam** (🟡 `contact-emails.ts:192`) : retirer le nom de l'accusé, un changement d'une ligne.
3. **Mettre en place la CI** (🟡 `dependabot.yml:1`), puis merger les PR Dependabot #23 et #24.
4. **Ajouter les en-têtes de sécurité** (🟡 `next.config.ts:4`), CSP d'abord en `Report-Only`, puis relancer Lighthouse.
5. Regrouper les corrections 🟢 dans un ou deux commits de nettoyage (`aidd-dev:07-refactor`).

## Coverage

- **Scanned**: code-quality, architecture, security, dependencies, performance, tests, ui. Vérifications lancées le 2026-11-24 : `pnpm typecheck`, `pnpm lint` et `pnpm test` au vert (68 tests), `pnpm audit` (2 alertes modérées), `pnpm outdated`, `pnpm licenses list --prod`, `curl -I` sur la production, et reproduction du bug du formulaire dans le navigateur (dev, clés de test Turnstile, clé Resend factice, aucun mail envoyé).
- **Skipped**: aucun pilier entier n'a été sauté. Limites : pas de passe axe à l'exécution (ui), pas de profileur ni d'analyseur de bundle (performance), pas d'outil de couverture, e2e non relancés car le Chromium de Playwright n'est pas installé (tests), pas d'analyse statique outillée (security, code-quality).
