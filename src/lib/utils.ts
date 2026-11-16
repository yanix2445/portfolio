import { createCn } from "cn/config";

// Les tokens maison de `globals.css` que la fusion de classes doit connaître. Sans eux, elle
// prendrait une taille de texte pour une couleur (`text-button` face à `text-primary-foreground`)
// et ne saurait pas qu'un `h-8` passé en `className` remplace un `h-control-xl`.
const TEXT_SIZES = [
  "label",
  "caption",
  "meta",
  "action",
  "button",
  "body-sm",
  "body",
  "lead",
  "subtitle",
  "synopsis",
  "synopsis-pinned",
  "wreath",
  "display-sm",
  "display-title",
  "display-poster",
  "display-md",
  "display-lg",
  "display-xl",
  "display-fit",
  "display-finale",
  "display-name",
  "display-numeral",
  "display-numeral-wide",
];

const SPACINGS = ["gutter", "header", "poster", "control-xl"];

export const cn = createCn({
  extend: { theme: { text: TEXT_SIZES, spacing: SPACINGS } },
});
