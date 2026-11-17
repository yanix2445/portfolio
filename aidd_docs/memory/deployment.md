# Deployment

Où tourne le site et comment il est livré.

## Pipeline

- Vercel est connecté au repo GitHub : un push sur `main` déploie en production, une PR crée un déploiement Preview.
- Il n'y a pas de CI GitHub Actions. Le build Vercel (`next build`) sert de vérification finale.

## Environments

- Production : le projet Vercel `portfolio` (Hobby, Node 26.x), qui déploie `main`, servi sur `yanis-harrat.com` depuis le lancement du 2026-11-17 (et toujours sur `portfolio-peach-chi-42.vercel.app`).
- Domaine : l'apex `yanis-harrat.com` est l'adresse principale, comme `SITE_URL` (canonical, sitemap, Open Graph) ; `www` y redirige en 308. Ne pas inverser l'un sans l'autre. Le projet `portfolio-page-attente` (page d'attente, repo séparé) n'a plus le domaine.
- Preview : une URL Vercel par PR.
- Local : `http://localhost:3000`.
- Les variables d'environnement sont déclarées dans Vercel, séparément pour Preview et Production, et dans `.env.local` en local (non commité).
- Variables du formulaire de contact, saisies le 2026-11-16 par les CLI (`vercel env add`, `resend api-keys create`, `wrangler turnstile widget create`) :
  - **Preview** : widget Turnstile `portfolio-contact-preview` (hôtes `localhost` et l'URL fixe de chaque branche testée : `portfolio-git-claude-home-generique-yanis-harrat.vercel.app`, `portfolio-git-claude-reading-pages-redesign-yanis-harrat.vercel.app`, `portfolio-git-claude-contact-confirmation-yanis-harrat.vercel.app`), clé Resend `portfolio-preview`, destinataire `CONTACT_TO_EMAIL`. Choix de Yanis du 2026-11-16 : un vrai widget plutôt que les clés de test. Le widget ne marche donc que sur les URL fixes listées ; une URL par commit ou une autre branche affiche un widget en erreur (toast « La vérification anti-spam n'a pas abouti ») tant que son hôte n'est pas ajouté (`wrangler turnstile widget update`, ou l'API Cloudflare). Pas de joker possible : ajouter `vercel.app` ouvrirait le widget à tous les sites Vercel.
  - **Production** : widget Turnstile `portfolio-contact` (hôtes `yanis-harrat.com`, `www`, `portfolio-peach-chi-42.vercel.app`, `localhost`), clé Resend `portfolio-production`, même destinataire.
  - Les deux clés Resend sont en envoi seul, limitées au domaine `yanis-harrat.com`.
  - Widgets Turnstile de l'ancien portfolio supprimés le 2026-11-16 sur confirmation de Yanis : `portfolio-prod-2026-10-15`, `portfolio-dev-2026-10-15`, `yanis-harrat.com`. Restent : `portfolio-contact`, `portfolio-contact-preview`, `portfolio-waitlist` (page d'attente en ligne, ne pas supprimer) et `polaris` (autre projet).
  - `/contact` est prérendue : après un changement de variable, il faut un nouveau déploiement pour que le formulaire apparaisse ou disparaisse.
  - En local : `vercel env pull --environment preview --project portfolio --scope yanis-harrat` écrit `.env.local`.

## Release

- Une release correspond à un merge sur `main`. Pour un rollback, on fait « Promote » d'un déploiement précédent dans le dashboard Vercel.

## Monitoring

- Vercel Analytics pour l'audience et les logs Vercel pour la Server Action de contact.
- Alerte de mail non remis (2026-11-17) : webhook Resend vers `https://portfolio-peach-chi-42.vercel.app/api/resend-webhook`, événements `email.bounced`, `email.failed`, `email.suppressed`, `email.complained`. Son secret est `RESEND_WEBHOOK_SECRET`, en Production seulement (variable sensible, jamais affichée). Testé de bout en bout avec un mail étiqueté `contact=confirmation` vers `bounced@resend.dev`. L'URL `vercel.app` reste valable après le lancement du domaine. Après un changement de secret (`resend webhooks rotate-signing-secret`), mettre à jour la variable et redéployer.
- Pare-feu Vercel : règle « Formulaire de contact : 5 envois / 10 min par IP » (`POST /contact`), publiée le 2026-11-17. Les règles se préparent en brouillon (`vercel firewall rules add`) ; Yanis les publie (`vercel firewall publish`).

## DNS

- Le domaine est géré chez Cloudflare, mais tous les enregistrements vers Vercel et Resend doivent être en **DNS only** (nuage gris). Le proxy Cloudflare provoque une boucle SSL, un cache en double et casse le Bot Protection de Vercel.
