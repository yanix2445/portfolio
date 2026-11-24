import "server-only";

import { SITE_HOST } from "@/lib/site";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 8000;

// En production, le jeton doit venir du site lui-même, quels que soient les hôtes autorisés
// sur le widget chez Cloudflare. Les previews ont une adresse par branche : leur hôte n'est
// pas vérifié.
const PRODUCTION_HOSTS = [SITE_HOST, `www.${SITE_HOST}`];

/**
 * Vérifie un jeton Turnstile auprès de Cloudflare. Un jeton ne sert qu'une fois et expire
 * après 300 s. Renvoie `false` pour tout échec : jeton refusé, clé absente, panne réseau,
 * ou, en production, jeton obtenu sur un autre hôte que le site.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean; hostname?: string };
    if (result.success !== true) return false;
    if (process.env.VERCEL_ENV !== "production") return true;
    return PRODUCTION_HOSTS.includes(result.hostname ?? "");
  } catch {
    return false;
  }
}
