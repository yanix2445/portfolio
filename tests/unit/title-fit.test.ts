import "./setup-content";

import { describe, expect, it } from "vitest";

import { fitTitle, longestWordEm } from "@/lib/title-fit";

describe("longestWordEm", () => {
  it("mesure le mot le plus long, en capitales, insécables compris", () => {
    // W (0,862) est plus large que trois I (3 × 0,249).
    expect(longestWordEm("iii w")).toBeCloseTo(0.862);
    expect(longestWordEm("SD‑WAN : le réseau")).toBeGreaterThan(longestWordEm("réseau"));
    expect(longestWordEm("Durcissement")).toBeGreaterThan(longestWordEm("Durcis"));
  });
});

describe("fitTitle", () => {
  it("borne la taille du token par la largeur du conteneur", () => {
    expect(fitTitle("WW", "display-poster").fontSize).toMatch(
      /^min\(var\(--fs-display-poster\), calc\(100cqi \/ 1\.79\d\)\)$/,
    );
  });
});
