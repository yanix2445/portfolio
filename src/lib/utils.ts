import { createCn } from "cn/config";

// Les tailles de texte du thème (`--text-*` de `globals.css`). Sans cette liste, la fusion
// de classes les prendrait pour des couleurs et supprimerait l'une des deux (`text-button`
// face à `text-primary-foreground`, par exemple).
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
  "display-poster",
  "display-md",
  "display-lg",
  "display-xl",
  "display-finale",
  "display-name",
  "display-numeral",
  "display-numeral-wide",
];

export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: TEXT_SIZES }] } },
});
