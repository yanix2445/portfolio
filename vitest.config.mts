import path from "node:path";

import mdx from "@mdx-js/rollup";
import { defineConfig } from "vitest/config";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [mdx()],
  resolve: {
    alias: [
      // Les tests de contenu lisent des fixtures, jamais le vrai contenu éditorial.
      { find: /^@\/content\//, replacement: `${path.join(root, "tests/fixtures/src/content")}/` },
      { find: /^@\//, replacement: `${path.join(root, "src")}/` },
    ],
  },
  test: {
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
