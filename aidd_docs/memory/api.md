# API

La surface serveur du site. Il n'y a pas d'API publique, seulement des Server Actions.

## Style

- Server Actions Next.js (`"use server"`) dans `src/actions/`. Une seule route `POST` : le webhook Resend.
- Les seules routes `GET` sont générées au build : `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (l'image de partage des pages du site, avec le portrait), un `opengraph-image.tsx` par fiche dans `projets/[slug]` et `veille/[slug]` (une image par projet ou article, générée sans rien faire à chaque nouvelle fiche MDX). `public/llms.txt` est un fichier statique, à tenir à jour à chaque nouvelle fiche.

## Resources

- `sendContact` (`src/actions/contact.ts`) : reçoit le formulaire de contact, revalide les champs, vérifie Turnstile et envoie le mail via Resend. Sa signature suit `useActionState` : `(état précédent, FormData) => ContactResult`.

- `POST /api/resend-webhook` (`src/app/api/resend-webhook/route.ts`) : reçoit les événements Resend, vérifie leur signature (`RESEND_WEBHOOK_SECRET`) et alerte Yanis par mail quand un mail du formulaire (étiquette `contact`) est rejeté, échoue, est bloqué ou signalé comme spam. Répond 404 sans secret, 400 si la signature est fausse, 200 sinon, même si l'alerte échoue (pas de renvoi en boucle).

## Contracts

- Une Server Action renvoie un objet de résultat typé (succès ou erreur avec un message générique) et ne lève jamais d'exception vers le client. `ContactResult` porte en plus les erreurs par champ et la saisie à réafficher.
- Chaque entrée est revalidée côté serveur, même si le client a déjà validé.
