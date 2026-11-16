import "./setup-content";

import { describe, expect, it } from "vitest";

import { frenchSpacing } from "@/lib/typography";

describe("frenchSpacing", () => {
  it("lie la ponctuation haute et les guillemets au mot voisin", () => {
    expect(frenchSpacing("NIS 2 : ce que la directive impose ?")).toBe(
      "NIS 2 : ce que la directive impose ?",
    );
    expect(frenchSpacing("« Opérationnel » dès lundi !")).toBe(
      "« Opérationnel » dès lundi !",
    );
  });

  it("rend insécable le trait d'union des mots composés", () => {
    expect(frenchSpacing("SD-WAN et Wi-Fi 7")).toBe("SD\u2011WAN et Wi\u2011Fi 7");
  });

  it("laisse un texte sans ponctuation haute intact", () => {
    expect(frenchSpacing("Homelab Proxmox et Docker")).toBe("Homelab Proxmox et Docker");
  });
});
