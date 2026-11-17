import "./setup-content";

import { describe, expect, it } from "vitest";

import { extractHeadings, headingId, readingMinutes } from "@/lib/headings";

const SOURCE = `export const metadata = {
  title: "Titre",
  tags: ["a"],
};

## Contexte

Du texte.

### Sous-partie ignorée

## Ce que disent les **références**

\`\`\`bash
## pas un intertitre
\`\`\`

## Voir le [homelab](/projets/homelab)
`;

describe("headingId", () => {
  it("donne une ancre sans accents ni ponctuation", () => {
    expect(headingId("Difficultés rencontrées")).toBe("difficultes-rencontrees");
    expect(headingId("ANSSI : pas d'action critique !")).toBe("anssi-pas-d-action-critique");
  });
});

describe("extractHeadings", () => {
  it("ne garde que les intertitres de niveau 2, en texte brut", () => {
    expect(extractHeadings(SOURCE)).toEqual([
      { id: "contexte", text: "Contexte" },
      { id: "ce-que-disent-les-references", text: "Ce que disent les références" },
      { id: "voir-le-homelab", text: "Voir le homelab" },
    ]);
  });
});

describe("readingMinutes", () => {
  it("compte au moins une minute, sans les métadonnées", () => {
    expect(readingMinutes(SOURCE)).toBe(1);
    expect(readingMinutes(`## Titre\n\n${"mot ".repeat(1000)}`)).toBe(5);
  });
});
