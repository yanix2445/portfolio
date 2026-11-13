// Faits affichés sur l'accueil, tous tirés du CV (src/lib/profile.ts, src/lib/site.ts).
// Les durées sont calculées depuis les périodes du parcours, jamais saisies à la main.
import { CERTIFICATIONS, TIMELINE, type TimelineStep } from "@/lib/profile";

function step(title: string): TimelineStep {
  const found = TIMELINE.find((entry) => entry.title === title);
  if (!found) throw new Error(`Étape de parcours introuvable : ${title}`);
  return found;
}

/** Mois calendaires couverts par une période `YYYY-MM` → `YYYY-MM`, bornes incluses (« juin – sept. » = 4). */
function monthsCovered(start: string, end: string): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

export const HELPDESK = step("Technicien helpdesk N1/N2");
export const SERVICE = step("Chef de rang");
export const PISCINE = step("Piscine École 42");
export const IUT = step("Consultant IT junior & développeur");

// Une seule règle pour toutes les durées : mois calendaires couverts, bornes incluses.
// Fins lues dans le libellé `period` du parcours (« Juin – sept. 2026 », « Sept. 2023 – janv. 2025 »).
export const HELPDESK_MONTHS = monthsCovered(HELPDESK.start, "2026-09");
export const SERVICE_MONTHS = monthsCovered(SERVICE.start, "2025-01");

const ISSUERS = [...new Set(CERTIFICATIONS.map(({ issuer }) => issuer))];

export const CERTIFICATION_COUNT = CERTIFICATIONS.length;
export const CERTIFICATION_ISSUERS = `${ISSUERS.slice(0, -1).join(", ")} et ${ISSUERS.at(-1)}`;

const WRITTEN_NUMBERS: Record<number, string> = { 3: "Trois", 4: "Quatre", 5: "Cinq", 6: "Six" };
export const HELPDESK_MONTHS_WORD = WRITTEN_NUMBERS[HELPDESK_MONTHS] ?? String(HELPDESK_MONTHS);
