import { ImageResponse } from "next/og";

import { imageFonts } from "@/lib/image-fonts";
import { COLOR } from "@/lib/palette";
import { OPENING } from "@/lib/profile";
import { SHARE_IMAGE, SITE_HOST } from "@/lib/site";

// L'image d'un lien partagé (LinkedIn, messageries), pour toutes les pages sans image propre.
// Générée au build, dans la direction « Générique » : le nom en lettres d'affiche, la phrase
// de l'accueil, la légende en mono.
export const alt = SHARE_IMAGE.alt;
export const size = { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: COLOR.background,
          color: COLOR.foreground,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: COLOR.primary }}>BTS SIO SISR · Alternance · Sept. 2027</span>
          <span style={{ color: COLOR.muted }}>{SITE_HOST}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Big Shoulders",
            fontSize: 190,
            lineHeight: 0.86,
            textTransform: "uppercase",
          }}
        >
          <span>Yanis</span>
          <span style={{ color: COLOR.primary }}>Harrat</span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            fontFamily: "Hanken Grotesk",
            fontSize: 34,
            lineHeight: 1.3,
            color: COLOR.soft,
          }}
        >
          {OPENING.statement}
        </div>
      </div>
    ),
    { ...size, fonts: await imageFonts() },
  );
}
