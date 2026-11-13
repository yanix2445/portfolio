# Forms

Comment les formulaires sont construits et validés. Le site n'en a qu'un : le formulaire de contact.

## Approach

- Composant client : `src/components/contact-form.tsx`, avec le widget Turnstile (`@marsidev/react-turnstile`) et les composants shadcn/ui.
- Soumission : la Server Action `src/actions/contact.ts` revalide toujours les champs côté serveur, sans jamais faire confiance au client.

## Conventions

- Ordre de traitement côté serveur : valider les champs, vérifier le token Turnstile, puis envoyer le mail via Resend. Aucune donnée n'est persistée.
- Le token Turnstile est à usage unique et expire après 300 s : réinitialiser le widget après chaque envoi, réussi ou non, sinon l'erreur `timeout-or-duplicate` apparaît.
- Le retour à l'utilisateur passe par un toast `sonner`, en succès comme en erreur. Le message d'erreur est générique : on n'expose jamais la réponse brute de Resend ou de Turnstile.
- Le formulaire renvoie vers la page mentions légales pour l'information RGPD.
