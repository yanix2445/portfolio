// Faits affichés sur l'accueil, tous tirés du CV (src/lib/profile.ts, src/lib/site.ts).
// Les durées sont calculées depuis les périodes du parcours, jamais saisies à la main.
import { CERTIFICATIONS, TIMELINE, type TimelineStep } from "@/lib/profile";

function step(title: string): TimelineStep {
  const found = TIMELINE.find((entry) => entry.title === title);
  if (!found) throw new Error(`Étape de parcours introuvable : ${title}`);
  return found;
}

/** Mois écoulés entre deux mois `YYYY-MM` (fin exclue). */
function monthsBetween(start: string, end: string): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

export const HELPDESK = step("Technicien helpdesk N1/N2");
export const SERVICE = step("Chef de rang");
export const PISCINE = step("Piscine École 42");
export const IUT = step("Consultant IT junior & développeur");

// Fins lues dans le libellé `period` du parcours : « Juin – sept. 2026 » se termine fin septembre,
// « Sept. 2023 – janv. 2025 » début janvier. À corriger ici si une date du CV change.
export const HELPDESK_MONTHS = monthsBetween(HELPDESK.start, "2026-10");
export const SERVICE_MONTHS = monthsBetween(SERVICE.start, "2025-01");

const ISSUERS = [...new Set(CERTIFICATIONS.map(({ issuer }) => issuer))];

export const CERTIFICATION_COUNT = CERTIFICATIONS.length;
export const CERTIFICATION_ISSUERS = `${ISSUERS.slice(0, -1).join(", ")} et ${ISSUERS.at(-1)}`;

const WRITTEN_NUMBERS: Record<number, string> = { 3: "Trois", 4: "Quatre", 5: "Cinq", 6: "Six" };
export const HELPDESK_MONTHS_WORD = WRITTEN_NUMBERS[HELPDESK_MONTHS] ?? String(HELPDESK_MONTHS);
