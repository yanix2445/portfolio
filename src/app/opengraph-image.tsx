import { ImageResponse } from "next/og";

import { imageFonts, publicImage } from "@/lib/image-assets";
import { COLOR } from "@/lib/palette";
import { OPENING } from "@/lib/profile";
import { PORTRAIT, SITE_HOST } from "@/lib/site";

// L'image d'un lien partagé (LinkedIn, messageries) pour les pages du site ; chaque fiche a la
// sienne (`entry-share-image.tsx`). Générée au build, dans la direction « Générique » : le
// portrait entier à droite (la tête n'est jamais coupée), le nom en lettres d'affiche, la phrase
// de l'accueil.
export const alt =
  "Portrait de Yanis Harrat, technicien systèmes et réseaux : alternance de deux ans à Paris à partir de septembre 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Le portrait garde ses proportions sur toute la hauteur de l'image.
const PHOTO_WIDTH = Math.round((size.height * PORTRAIT.width) / PORTRAIT.height);

export default async function OpengraphImage() {
  const [fonts, portrait] = await Promise.all([imageFonts(), publicImage(PORTRAIT.src)]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: COLOR.background }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 56px 60px 72px",
            color: COLOR.foreground,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 21,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLOR.primary,
            }}
          >
            BTS SIO SISR · Alternance 2027
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Big Shoulders",
              fontSize: 150,
              lineHeight: 0.86,
              textTransform: "uppercase",
            }}
          >
            <span>Yanis</span>
            <span style={{ color: COLOR.primary }}>Harrat</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontFamily: "Hanken Grotesk", fontSize: 29, lineHeight: 1.3, color: COLOR.soft }}>
              {OPENING.statement}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                fontSize: 19,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: COLOR.muted,
              }}
            >
              {SITE_HOST}
            </div>
          </div>
        </div>
        <img src={portrait} alt="" width={PHOTO_WIDTH} height={size.height} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size, fonts },
  );
}
