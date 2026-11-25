/** Balisage schema.org d'une page (`src/lib/structured-data.ts`). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Échappe "<" pour empêcher toute fermeture prématurée de la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
