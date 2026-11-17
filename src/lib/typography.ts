// Typographie française : une espace insécable avant « : ; ! ? » et à l'intérieur des
// guillemets, pour qu'un titre ne commence jamais une ligne par un signe isolé. Le trait
// d'union d'un mot composé (SD-WAN, Wi-Fi) devient insécable : le mot ne se coupe pas dessus.
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;!?»])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/(?<=[\p{L}\d])-(?=[\p{L}\d])/gu, "\u2011");
}
