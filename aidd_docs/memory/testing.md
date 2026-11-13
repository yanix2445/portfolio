# Testing

Comment le projet est vérifié. Pour l'instant, il n'y a pas de suite de tests automatisés : la qualité repose sur le typage, le lint, le build et une vérification dans le navigateur.

## Strategy

- Statique : `pnpm typecheck`, `pnpm lint` et `pnpm build` (voir `coding-assertions.md`).
- Navigateur : vérification manuelle des pages, du responsive mobile, des animations (y compris avec `prefers-reduced-motion`) et du formulaire de contact.
- Performance : Lighthouse sur l'accueil, où les animations pèsent le plus.

## Browser QA

- Entry : `pnpm dev`, lancé via Portly, puis `http://localhost:3000`.
- Auth : aucune, le site est entièrement public.
- State : le contenu vient des fichiers MDX du repo. Pour le formulaire en local, utiliser les clés de test Turnstile de Cloudflare (une clé qui valide toujours, une qui échoue toujours) et une clé Resend dédiée au développement.
