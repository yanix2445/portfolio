# Deployment

Où tourne le site et comment il est livré.

## Pipeline

- Vercel est connecté au repo GitHub : un push sur `main` déploie en production, une PR crée un déploiement Preview.
- CI GitHub Actions (`.github/workflows/ci.yml`), sur chaque PR (Dependabot comprises) et chaque push sur `main` : un job typage, lint et tests unitaires, un job e2e sur le build de production (Chromium en cache, une relance en CI pour les tests qui dépendent de Cloudflare). Gratuite : le dépôt est public. Le build Vercel reste séparé, il ne lance pas les tests.

## Environments

- Production : le projet Vercel `portfolio` (Hobby, Node 26.x), qui déploie `main`, servi sur `yanis-harrat.com` depuis le lancement du 2026-11-17. L'ancienne URL `portfolio-peach-chi-42.vercel.app` ne sert plus rien (`DEPLOYMENT_NOT_FOUND`, constaté le 2026-11-17) : n'y faire pointer aucun service.
- Domaine : l'apex `yanis-harrat.com` est l'adresse principale, comme `SITE_URL` (canonical, sitemap, Open Graph) ; `www` y redirige en 308. Ne pas inverser l'un sans l'autre. Le projet `portfolio-page-attente` (page d'attente, repo séparé) n'a plus le domaine.
- Preview : une URL Vercel par PR.
- Local : `http://localhost:3000`.
- Les variables d'environnement sont déclarées dans Vercel, séparément pour Preview et Production, et dans `.env.local` en local (non commité).
- Variables du formulaire de contact, saisies le 2026-11-16 par les CLI (`vercel env add`, `resend api-keys create`, `wrangler turnstile widget create`) :
  - **Preview** : widget Turnstile `portfolio-contact-preview` (hôtes `localhost` et l'URL fixe de chaque branche testée : `portfolio-git-claude-home-generique-yanis-harrat.vercel.app`, `portfolio-git-claude-reading-pages-redesign-yanis-harrat.vercel.app`, `portfolio-git-claude-contact-confirmation-yanis-harrat.vercel.app`), clé Resend `portfolio-preview`, destinataire `CONTACT_TO_EMAIL`. Choix de Yanis du 2026-11-16 : un vrai widget plutôt que les clés de test. Le widget ne marche donc que sur les URL fixes listées ; une URL par commit ou une autre branche affiche un widget en erreur (toast « La vérification anti-spam n'a pas abouti ») tant que son hôte n'est pas ajouté (`cf turnstile widgets update <sitekey> --name … --widget-mode managed --domains …`, qui remplace la liste entière : la relire avec `cf turnstile widgets get` avant). Pas de joker possible : ajouter `vercel.app` ouvrirait le widget à tous les sites Vercel.
  - **Production** : widget Turnstile `portfolio-contact` (hôtes `yanis-harrat.com`, `www`, `portfolio-peach-chi-42.vercel.app` ; `localhost` retiré le 2026-11-24, avec `cf turnstile widgets update`), clé Resend `portfolio-production`, même destinataire. En local, utiliser les clés Preview (`vercel env pull --environment preview`), dont le widget accepte `localhost`.
  - Les deux clés Resend sont en envoi seul, limitées au domaine `yanis-harrat.com`.
  - Widgets Turnstile de l'ancien portfolio supprimés le 2026-11-16 sur confirmation de Yanis : `portfolio-prod-2026-10-15`, `portfolio-dev-2026-10-15`, `yanis-harrat.com`. Restent : `portfolio-contact`, `portfolio-contact-preview`, `portfolio-waitlist` (page d'attente en ligne, ne pas supprimer) et `polaris` (autre projet).
  - `/contact` est prérendue : après un changement de variable, il faut un nouveau déploiement pour que le formulaire apparaisse ou disparaisse.
  - En local : `vercel env pull --environment preview --project portfolio --scope yanis-harrat` écrit `.env.local`.

## Release

- Une release correspond à un merge sur `main`. Pour un rollback, on fait « Promote » d'un déploiement précédent dans le dashboard Vercel.

## Monitoring

- Vercel Analytics pour l'audience et les logs Vercel pour la Server Action de contact.
- Alerte de mail non remis (2026-11-17) : webhook Resend vers `https://yanis-harrat.com/api/resend-webhook`, événements `email.bounced`, `email.failed`, `email.suppressed`, `email.complained`. Son secret est `RESEND_WEBHOOK_SECRET`, en Production seulement (variable sensible, jamais affichée). Testé de bout en bout avec un mail étiqueté `contact=confirmation` vers `bounced@resend.dev`. Repointé le 2026-11-17 depuis l'URL `vercel.app`, devenue introuvable (aucun événement réel perdu, même secret). Après un changement de secret (`resend webhooks rotate-signing-secret`), mettre à jour la variable et redéployer.
- Pare-feu Vercel : règle « Formulaire de contact : 5 envois / 10 min par IP » (`POST /contact`), publiée le 2026-11-17. Les règles se préparent en brouillon (`vercel firewall rules add`) ; Yanis les publie (`vercel firewall publish`).

## DNS

- Le domaine est géré chez Cloudflare, mais tous les enregistrements vers Vercel et Resend doivent être en **DNS only** (nuage gris). Le proxy Cloudflare provoque une boucle SSL, un cache en double et casse le Bot Protection de Vercel.
