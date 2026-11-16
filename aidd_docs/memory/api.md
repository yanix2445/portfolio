# API

La surface serveur du site. Il n'y a pas d'API publique, seulement des Server Actions.

## Style

- Server Actions Next.js (`"use server"`) dans `src/actions/`. Il n'y a ni route REST ni Route Handler `POST`.
- Les seules routes `GET` sont générées au build : `sitemap.ts` et `robots.ts`. `opengraph-image.tsx` est à venir.

## Resources

- `sendContact` (`src/actions/contact.ts`) : reçoit le formulaire de contact, revalide les champs, vérifie Turnstile et envoie le mail via Resend. Sa signature suit `useActionState` : `(état précédent, FormData) => ContactResult`.

## Contracts

- Une Server Action renvoie un objet de résultat typé (succès ou erreur avec un message générique) et ne lève jamais d'exception vers le client. `ContactResult` porte en plus les erreurs par champ et la saisie à réafficher.
- Chaque entrée est revalidée côté serveur, même si le client a déjà validé.
