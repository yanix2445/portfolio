import type { MDXComponents } from "mdx/types";
import { isValidElement, type ReactNode } from "react";

import { headingId } from "@/lib/headings";

/** Texte d'un nœud React (intertitre avec emphase ou lien compris). */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

const components: MDXComponents = {
  // L'ancre des intertitres suit `extractHeadings` : le sommaire de la fiche pointe dessus.
  h2: ({ children, ...props }) => (
    <h2 id={headingId(textOf(children))} {...props}>
      {children}
    </h2>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
