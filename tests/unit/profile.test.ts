import { describe, expect, it } from "vitest";

import { ACTS, CERTIFICATIONS, OPENING, SHEET } from "@/lib/profile";

function expectNoEmptyString(value: unknown) {
  for (const field of Object.values(value as Record<string, unknown>)) {
    if (typeof field === "string") expect(field.trim()).not.toBe("");
  }
}

describe("profil", () => {
  it("liste les 7 certifications du CV, sans champ vide", () => {
    expect(CERTIFICATIONS).toHaveLength(7);
    CERTIFICATIONS.forEach(expectNoEmptyString);
  });

  it("déroule 5 actes dans l'ordre chronologique, la formation en cours en dernier", () => {
    const starts = ACTS.map((act) => act.start);

    expect(ACTS).toHaveLength(5);
    expect(starts).toEqual([...starts].sort((a, b) => a.localeCompare(b)));
    expect(ACTS.filter((act) => act.current)).toEqual([ACTS[4]]);
    for (const act of ACTS) {
      expectNoEmptyString(act);
      expect(act.keywords.length).toBeGreaterThan(0);
    }
  });

  it("renseigne la fiche technique et le premier écran, sans champ vide", () => {
    expect(SHEET.length).toBeGreaterThanOrEqual(7);
    SHEET.forEach(expectNoEmptyString);
    expect(OPENING.slate).toHaveLength(4);
    OPENING.slate.forEach(expectNoEmptyString);
    expectNoEmptyString(OPENING);
  });
});
