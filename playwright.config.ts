import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Les tests Turnstile dépendent du réseau : une relance en CI absorbe une lenteur de
  // Cloudflare. Un test qui ne passe qu'à la relance est signalé « flaky » dans le rapport.
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Teste le build de production : c'est lui qui décide des statuts 404 et du prérendu.
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
    // Le formulaire de contact n'est rendu que si ses quatre variables existent. Les clés
    // Turnstile sont celles de test, publiques et documentées par Cloudflare ; la clé secrète
    // choisie refuse toujours le jeton, donc aucun test ne peut aller jusqu'à l'envoi.
    env: {
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      TURNSTILE_SECRET_KEY: "2x0000000000000000000000000000000AA",
      RESEND_API_KEY: "re_test_cle_factice",
      CONTACT_TO_EMAIL: "test@example.com",
    },
  },
});
