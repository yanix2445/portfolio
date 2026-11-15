# Deployment

Où tourne le site et comment il est livré.

## Pipeline

- Vercel est connecté au repo GitHub : un push sur `main` déploie en production, une PR crée un déploiement Preview.
- Il n'y a pas de CI GitHub Actions. Le build Vercel (`next build`) sert de vérification finale.

## Environments

- Production : le projet Vercel `portfolio` (Hobby, Node 26.x), qui déploie `main`. Avant le lancement, il n'est servi que sur son URL Vercel (`portfolio-peach-chi-42.vercel.app`).
- Domaine : `yanis-harrat.com` et `www` restent attachés au projet Vercel `portfolio-page-attente` (page d'attente, repo séparé) jusqu'au lancement. Ne pas les déplacer sans décision explicite de Yanis. Pour lancer : retirer le domaine de `portfolio-page-attente`, puis l'ajouter à `portfolio`. Le DNS Cloudflare ne change pas.
- Preview : une URL Vercel par PR.
- Local : `http://localhost:3000`.
- Les variables d'environnement sont déclarées dans Vercel, séparément pour Preview et Production, et dans `.env.local` en local (non commité).
- Variables du formulaire de contact, saisies le 2026-11-16 par les CLI (`vercel env add`, `resend api-keys create`, `wrangler turnstile widget create`) :
  - **Preview** : clés de test Turnstile de Cloudflare (le widget marche sur toutes les URL de prévisualisation et affiche un bandeau « test »), clé Resend `portfolio-preview`, destinataire `CONTACT_TO_EMAIL`.
  - **Production** : widget Turnstile `portfolio-contact` (hôtes `yanis-harrat.com`, `www`, `portfolio-peach-chi-42.vercel.app`, `localhost`), clé Resend `portfolio-production`, même destinataire.
  - Les deux clés Resend sont en envoi seul, limitées au domaine `yanis-harrat.com`.
  - `/contact` est prérendue : après un changement de variable, il faut un nouveau déploiement pour que le formulaire apparaisse ou disparaisse.
  - En local : `vercel env pull --environment preview --project portfolio --scope yanis-harrat` écrit `.env.local`.

## Release

- Une release correspond à un merge sur `main`. Pour un rollback, on fait « Promote » d'un déploiement précédent dans le dashboard Vercel.

## Monitoring

- Vercel Analytics pour l'audience et les logs Vercel pour la Server Action de contact. Aucune alerte n'est configurée.

## DNS

- Le domaine est géré chez Cloudflare, mais tous les enregistrements vers Vercel et Resend doivent être en **DNS only** (nuage gris). Le proxy Cloudflare provoque une boucle SSL, un cache en double et casse le Bot Protection de Vercel.
