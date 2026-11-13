// Complète la déclaration de `@types/mdx` (export par défaut) avec l'export
// `metadata` que chaque fichier de `src/content/` doit définir.
declare module "*.mdx" {
  import type { ContentMeta } from "@/lib/content";

  export const metadata: ContentMeta;
}
