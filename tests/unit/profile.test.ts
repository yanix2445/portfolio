import { describe, expect, it } from "vitest";

import { CERTIFICATIONS, HERO, SKILL_GROUPS, TIMELINE } from "@/lib/profile";

function expectNoEmptyString(value: unknown) {
  for (const field of Object.values(value as Record<string, unknown>)) {
    if (typeof field === "string") expect(field.trim()).not.toBe("");
  }
}

describe("profil", () => {
  it("reprend les 6 groupes de compétences du CV, chacun non vide", () => {
    expect(SKILL_GROUPS).toHaveLength(6);
    for (const group of SKILL_GROUPS) {
      expect(group.title.trim()).not.toBe("");
      expect(group.items.length).toBeGreaterThan(0);
      for (const item of group.items) expect(item.trim()).not.toBe("");
    }
  });

  it("liste les 7 certifications du CV, sans champ vide", () => {
    expect(CERTIFICATIONS).toHaveLength(7);
    CERTIFICATIONS.forEach(expectNoEmptyString);
  });

  it("présente 6 étapes de parcours, de la plus ancienne à la plus récente", () => {
    const starts = TIMELINE.map((step) => step.start);

    expect(TIMELINE).toHaveLength(6);
    expect(starts).toEqual([...starts].sort((a, b) => a.localeCompare(b)));
    TIMELINE.forEach(expectNoEmptyString);
  });

  it("renseigne toute l'accroche du hero", () => {
    expectNoEmptyString(HERO);
  });
});
