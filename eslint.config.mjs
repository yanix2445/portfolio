import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Worktrees des sessions Claude, résultats de tests et maquettes : pas du code du site.
    ".claude/**",
    "playwright-report/**",
    "test-results/**",
    "aidd_docs/**",
  ]),
]);

export default eslintConfig;
