# Integration

Comment le site s'intègre aux services externes. La carte de tous les outils se trouve dans `ecosystem.md`.

## External services

- **Cloudflare Turnstile** : protège le formulaire contre le spam. Le widget est côté client, la vérification côté serveur se fait via `siteverify` dans `src/lib/turnstile.ts`.
- **Resend** : envoie le mail de contact depuis le sous-domaine `send.yanis-harrat.com`. Le client est dans `src/lib/resend.ts`. On envoie un mail texte/HTML simple : ne pas utiliser `@react-email/components`, qui est déprécié.
- **Vercel Analytics** : le composant `<Analytics />` est placé dans le layout racine. Il fonctionne sans cookie. Pas d'événements custom en offre Hobby.

## Calling conventions

- Les secrets restent côté serveur : `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_TO_EMAIL`. Seule la clé de site `NEXT_PUBLIC_TURNSTILE_SITE_KEY` est exposée au client. La liste des variables est dans `.env.example`.
- On n'envoie jamais de mail si la vérification Turnstile échoue.
- Si Resend ou Turnstile est indisponible, l'utilisateur reçoit une erreur générique l'invitant à réessayer plus tard. Aucune relance automatique.
- RGPD : Resend (stockage aux États-Unis, rétention de 30 jours), Turnstile (intérêt légitime) et Vercel Analytics doivent être déclarés dans `/mentions-legales`. Tout nouveau service doit y être ajouté.
