import { ImageResponse } from "next/og";

import { imageFonts } from "@/lib/image-assets";
import { COLOR } from "@/lib/palette";

// Le monogramme du site, « YH » en lettres d'affiche orange sur fond noir. `favicon.ico` en est
// une réduction (16, 32 et 48 px) : à refaire si le monogramme change.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLOR.background,
          color: COLOR.primary,
          fontFamily: "Big Shoulders",
          fontSize: 130,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        YH
      </div>
    ),
    { ...size, fonts: await imageFonts() },
  );
}
