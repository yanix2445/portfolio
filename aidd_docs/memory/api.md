# API

La surface serveur du site. Il n'y a pas d'API publique, seulement des Server Actions.

## Style

- Server Actions Next.js (`"use server"`) dans `src/actions/`. Il n'y a ni route REST ni Route Handler `POST`.
- Les seules routes `GET` sont générées au build : `sitemap.ts`, `robots.ts` et `opengraph-image.tsx`.

## Resources

- `contact` (`src/actions/contact.ts`) : reçoit le formulaire de contact, vérifie Turnstile et envoie le mail via Resend.

## Contracts

- Une Server Action renvoie un objet de résultat typé (succès ou erreur avec un message générique) et ne lève jamais d'exception vers le client.
- Chaque entrée est revalidée côté serveur, même si le client a déjà validé.
