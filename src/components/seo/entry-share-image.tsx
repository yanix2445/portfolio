import { ImageResponse } from "next/og";

import { formatDate, getEntries, getOutline, type Collection } from "@/lib/content";
import { imageFonts, publicImage } from "@/lib/image-assets";
import { COLOR } from "@/lib/palette";
import { DOMAIN_LABEL, STATUS_LABEL, toProject } from "@/lib/projects";
import { PORTRAIT, SITE_HOST, SITE_NAME } from "@/lib/site";
import { frenchSpacing } from "@/lib/typography";

// L'image de partage d'une fiche, générée au build pour chaque projet et article de veille :
// une nouvelle fiche MDX a la sienne sans rien faire. Même direction que l'image du site :
// ce qu'est la fiche en légende, son titre en lettres d'affiche, sa description, l'auteur.
// Avec une `cover`, l'image de la fiche s'affiche à droite.

export const SHARE_SIZE = { width: 1200, height: 630 };

const KIND: Record<Collection, string> = { projets: "Fiche projet", veille: "Veille technologique" };

type Params = Promise<{ slug: string }>;

async function findEntry(collection: Collection, params: Params) {
  const { slug } = await params;
  const entry = (await getEntries(collection)).find((candidate) => candidate.slug === slug);
  if (!entry) throw new Error(`Image de partage : fiche introuvable (${collection}/${slug}).`);
  return entry;
}

/**
 * Texte alternatif des images de fiche. Il ne peut pas reprendre le titre : `alt` est une
 * constante du fichier `opengraph-image`, et la variante par fiche (`generateImageMetadata`)
 * ne reçoit pas le slug au build.
 */
export const SHARE_ALT: Record<Collection, string> = {
  projets: `Fiche projet de ${SITE_NAME} : titre, description, domaine et statut du projet`,
  veille: `Article de veille technologique de ${SITE_NAME} : titre, description et date`,
};

/** Taille du titre : la plus grande qui le tient en trois lignes environ dans sa colonne. */
function titleSize(title: string, width: number) {
  // Big Shoulders 900 en capitales : environ 0,5 em par caractère.
  return Math.round(Math.min(104, Math.max(56, (width * 2.8) / (title.length * 0.5))));
}

export async function entryShareImage(collection: Collection, params: Params) {
  const entry = await findEntry(collection, params);
  const { metadata } = entry;
  const [fonts, portrait, cover, outline] = await Promise.all([
    imageFonts(),
    publicImage(PORTRAIT.src),
    metadata.cover ? publicImage(metadata.cover) : null,
    getOutline(collection, entry.slug),
  ]);

  const project = collection === "projets" ? toProject(entry) : null;
  const facts = project
    ? [KIND.projets, DOMAIN_LABEL[project.domain], STATUS_LABEL[project.status]]
    : [KIND.veille, formatDate(metadata.date), `${outline.minutes} min`];
  const title = frenchSpacing(metadata.title);
  const titleWidth = cover ? 560 : 1056;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          backgroundColor: COLOR.background,
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
          {facts.join(" · ")}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, width: titleWidth }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Big Shoulders",
                fontSize: titleSize(title, titleWidth),
                // Interligne de 1, comme les titres du site : les accents ne touchent pas la ligne voisine.
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Hanken Grotesk",
                fontSize: 26,
                lineHeight: 1.35,
                color: COLOR.soft,
              }}
            >
              {frenchSpacing(metadata.description ?? metadata.summary)}
            </div>
          </div>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- rendu par next/og, pas par le navigateur
            <img src={cover} alt="" width={448} height={252} style={{ borderRadius: 16, objectFit: "cover" }} />
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* Le portrait en médaillon, cadré sur le visage : la tête reste entière. */}
            <div style={{ display: "flex", width: 60, height: 60, borderRadius: 30, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- rendu par next/og, pas par le navigateur */}
              <img src={portrait} alt="" width={60} height={75} style={{ marginTop: -2 }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "Hanken Grotesk", fontSize: 24 }}>{SITE_NAME}</span>
              <span
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 16,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: COLOR.muted,
                }}
              >
                Technicien systèmes & réseaux · Alternance 2027
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "Geist Mono",
              fontSize: 19,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLOR.muted,
            }}
          >
            {SITE_HOST}
          </span>
        </div>
      </div>
    ),
    { ...SHARE_SIZE, fonts },
  );
}
