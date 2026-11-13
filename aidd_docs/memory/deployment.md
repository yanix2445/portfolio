# Deployment

Où tourne le site et comment il est livré.

## Pipeline

- Vercel est connecté au repo GitHub : un push sur `main` déploie en production, une PR crée un déploiement Preview.
- Il n'y a pas de CI GitHub Actions. Le build Vercel (`next build`) sert de vérification finale.

## Environments

- Production : `https://yanis-harrat.com`, sur Vercel Hobby.
- Preview : une URL Vercel par PR.
- Local : `http://localhost:3000`.
- Les variables d'environnement sont déclarées dans Vercel, séparément pour Preview et Production, et dans `.env.local` en local (non commité).

## Release

- Une release correspond à un merge sur `main`. Pour un rollback, on fait « Promote » d'un déploiement précédent dans le dashboard Vercel.

## Monitoring

- Vercel Analytics pour l'audience et les logs Vercel pour la Server Action de contact. Aucune alerte n'est configurée.

## DNS

- Le domaine est géré chez Cloudflare, mais tous les enregistrements vers Vercel et Resend doivent être en **DNS only** (nuage gris). Le proxy Cloudflare provoque une boucle SSL, un cache en double et casse le Bot Protection de Vercel.
