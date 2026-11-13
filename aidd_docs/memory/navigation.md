# Navigation

Comment le visiteur se déplace sur le site : le routage et la structure des pages.

## Routing

- Next.js App Router : les routes correspondent aux dossiers de `src/app/`.
- Les pages `[slug]` (projets, veille) sont générées au build via `generateStaticParams` à partir des fichiers MDX de `src/content/`.
- Cache Components est actif : `dynamicParams` est interdit. Un slug inconnu passe par `notFound()`, et `ensureStatic = 'navigation'` garantit un vrai statut 404 (sinon le shell partiel part en 200).
- Toutes les routes sont publiques. Il n'y a ni auth ni route protégée.

## Structure

```mermaid
flowchart LR
  Home["Accueil /"]
  Projets["/projets"]
  Projet["/projets/[slug]"]
  Veille["/veille"]
  Article["/veille/[slug]"]
  Contact["/contact"]
  Legal["/mentions-legales"]
  CV["CV PDF"]

  Home --> Projets --> Projet
  Home --> Veille --> Article
  Home --> Contact --> Legal
  Home --> CV
```
