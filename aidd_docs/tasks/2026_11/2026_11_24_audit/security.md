# Codebase Audit: security

Les bases sont solides : revalidation côté serveur, Turnstile avant tout envoi, signature du webhook vérifiée, HTML des mails échappé, aucun secret dans le code. Il reste deux risques à traiter.

- **Date**: 2026_11_24
- **Scope**: `src/`, `next.config.ts`, en-têtes HTTP de production (`curl -I https://yanis-harrat.com`, 2026-11-24)
- **Health**: good
- **Findings**: 0 critical, 2 major, 2 minor

Sévérité : 🔴 critique, 🟡 majeur, 🟢 mineur. Effort : `S` < 1 h, `M` < 1 j, `L` > 1 j.

## Findings

| Sev | Category | Location | Issue | Suggested fix | Effort |
| --- | -------- | -------- | ----- | ------------- | ------ |
| 🟡  | security | `src/lib/contact-emails.ts:192` | L'accusé de réception recopie le `name` saisi (100 caractères libres, aussi `:212` en texte) et part vers n'importe quelle adresse depuis `@yanis-harrat.com`, signé DKIM et aligné DMARC. Le formulaire peut donc relayer un court texte de spam ou d'hameçonnage (« Bonjour <lien>, ») à un tiers, au nom du domaine. Le commentaire `:182-184` affirme pourtant l'inverse. Turnstile et la limite de 5 envois par 10 min et par IP freinent l'abus, mais ne l'empêchent pas. **Corrigé le 2026-11-24** : l'accusé salue par « Bonjour, ». | Saluer sans le nom (« Bonjour, »), ou refuser dans `validateContact` un nom qui contient `://`, `www.`, `@` ou un nom de domaine. | S |
| 🟡  | security | `next.config.ts:4` | Aucun `headers()` : en production, seul HSTS est envoyé. Il manque `Content-Security-Policy` (au moins `frame-ancestors`), `X-Content-Type-Options`, `Referrer-Policy` et `Permissions-Policy`. `/contact` peut être encadrée par un autre site (clickjacking). Le risque concret est faible, mais pour un portfolio SISR, la note d'un scan d'en-têtes est visible par les recruteurs. **Corrigé le 2026-11-24** : CSP sans nonce appliquée directement (pas de `Report-Only` : les tests e2e détectent toute violation), `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. | Ajouter `headers()` : `frame-ancestors 'none'`, `nosniff`, `strict-origin-when-cross-origin`, `Permissions-Policy` restrictive. Puis une CSP qui autorise Turnstile (`challenges.cloudflare.com`) et Vercel Analytics, testée d'abord en `Report-Only`. | M |
| 🟢  | security | `src/lib/turnstile.ts:23` | La réponse de `siteverify` n'est lue que pour `success`. Ni `hostname` ni `action` ne sont vérifiés, alors que Cloudflare recommande de contrôler `hostname`. Le widget de production accepte aussi `localhost` (`deployment.md`). **Corrigé le 2026-11-24** (hôte vérifié en production ; widget de production limité à `yanis-harrat.com` et `www`, PR #30 et #31). | Comparer `result.hostname` à une liste d'hôtes attendus (et retirer `localhost` du widget de production). | S |
| 🟢  | security | `src/lib/contact.ts:69` | La regex d'e-mail accepte `?`, `&`, `<`, `>` et `"`. `notificationEmail` construit ensuite `mailto:${email}?subject=…` (`contact-emails.ts:136`) : un visiteur peut pré-remplir l'objet ou le corps de la réponse de Yanis (`a@b.co?body=…`). Le HTML est échappé, il n'y a pas de XSS. **Corrigé le 2026-11-24.** | Refuser ces caractères dans l'adresse, ou encoder la partie locale avec `encodeURIComponent`. | S |

## Top actions

1. Retirer le nom de l'accusé de réception (ligne 1) : une ligne à changer, et le formulaire ne peut plus servir de relais au nom du domaine.
2. Ajouter les en-têtes de sécurité, puis une CSP en `Report-Only` (ligne 2). À confier à `aidd-dev:02-implement`, avec une vérification e2e que Turnstile et Analytics se chargent toujours.
3. Vérifier `hostname` dans `siteverify` et durcir la regex d'e-mail dans le même commit (lignes 3 et 4).

## Coverage

- **Scanned**: security (entrées du formulaire et du webhook, authentification du webhook, secrets, injections HTML et en-têtes de mail, désérialisation, en-têtes HTTP en production). `.env.local` est ignoré par git, aucun secret n'est en dur.
- **Skipped**: aucun outil d'analyse statique (Semgrep, CodeQL) : la revue a été faite à la main
