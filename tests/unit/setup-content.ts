import path from "node:path";

import { vi } from "vitest";

// Hors runtime Next, cacheLife n'a pas de portée "use cache" : on le neutralise.
vi.mock("next/cache", () => ({ cacheLife: () => {} }));

// content.ts résout les fichiers depuis process.cwd()/src/content : on pointe sur les fixtures.
vi.spyOn(process, "cwd").mockReturnValue(path.join(import.meta.dirname, "../fixtures"));
