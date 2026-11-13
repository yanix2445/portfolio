---
name: Yanis Harrat
description: A recruiter's 30-second read, typeset like a confident product launch on the portrait's own dark.
colors:
  tungsten: "#F5B66A"
  tungsten-hover: "#F8C88C"
  tungsten-ink: "#121114"
  ground: "#121114"
  raised: "#1C1A1A"
  bone: "#EFE9E1"
  ash: "#9C948B"
  rule: "rgb(239 233 225 / 0.1)"
  rule-strong: "rgb(239 233 225 / 0.22)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, min(14vw, 18.5svh), 10.5rem)"
    fontWeight: 760
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 80"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 5vw, 3.75rem)"
    fontWeight: 720
    lineHeight: 0.98
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 84"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 680
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 88"
  voice:
    fontFamily: "Bodoni Moda, ui-serif, Georgia, serif"
    fontWeight: 500
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  figure:
    fontFamily: "Departure Mono, ui-monospace, monospace"
    fontSize: "9.625rem"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "0"
    fontFeature: "'tnum'"
rounded:
  sm: "4.5px"
  md: "6px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "40px"
  container-max: "1344px"
  section-mobile: "96px"
  section-tablet: "128px"
  section-desktop: "160px"
  grid-gap: "48px"
components:
  button-call:
    backgroundColor: "{colors.tungsten}"
    textColor: "{colors.tungsten-ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "52px"
  button-call-hover:
    backgroundColor: "{colors.tungsten-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "52px"
  nav-link:
    textColor: "{colors.ash}"
    rounded: "{rounded.sm}"
    padding: "8px 8px"
  nav-link-hover:
    textColor: "{colors.bone}"
  tag:
    textColor: "{colors.ash}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  queue-panel:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
---

# Design System: Yanis Harrat

## Overview

**Creative North Star: "The Monday Launch"**

The site reads like a product launch whose product is a person ready for day one. The palette is lifted from the portrait itself: the graphite of its background becomes the ground, its skin-and-shirt highlights become bone type, and the one warm bokeh light becomes the only colour that acts. Everything else is typography, hairlines and space.

Three type voices share one system: a tight variable grotesque carries the claims, an italic didone speaks the human words, and a pixel face carries numbers and identifiers as if they came off a console. Density is low at the top and rises as the proof arrives: the giant headline, then a working ticket queue, then figures, skills, path and projects as ruled lists, never as tiles.

The world is flat and quiet. Depth comes from two dark tones and hairline rules, not from shadow. Motion is a scarce resource spent on three moments and switched off entirely under reduced motion.

**Key Characteristics:**
- One dark theme, taken from the portrait; no light mode.
- One flat action colour (tungsten) for actions and live state only.
- Three type voices with fixed jobs; never a fourth.
- Hairline-ruled lists instead of cards.
- Square-ish corners; full round only for the portrait pill and status dots.
- Three motion moments, one expo-out curve, static under reduced motion.

## Colors

Warm near-black and bone, with a single tungsten light.

### Primary
- **Tungsten Bokeh** (tungsten): the portrait's out-of-focus lamp. Fill of the call action, the keyboard focus outline, text selection, the caret, and the "live" status dot in the queue. Nothing decorative ever uses it.
- **Tungsten Warmed** (tungsten-hover): hover fill of the call action only.
- **Tungsten Ink** (tungsten-ink): text and icons placed on tungsten; same value as the ground.

### Neutral
- **Portrait Graphite** (ground): the page background, `theme-color`, scrollbar track.
- **Raised Graphite** (raised): the one raised surface (the ticket queue panel), the pill's placeholder, and a 60% wash on hovered project rows.
- **Bone** (bone): headlines, body emphasis, primary text.
- **Warm Ash** (ash): secondary text, metadata, labels, icons beside bone text, inactive nav.
- **Hairline** (rule): bone at 10%. Section dividers, list rules, header and footer borders, panel borders.
- **Hairline Strong** (rule-strong): bone at 22%. Outline buttons, the "exemple" tag, link underlines, input borders, scrollbar thumb.

### Named Rules
**The One Light Rule.** Tungsten is used only for an action someone can take or a state that is live right now. If it is neither, it is bone, ash or a rule.

**The Flat Fill Rule.** Every colour is a flat fill or a flat line. No gradients, no glows, no translucent glass.

## Typography

**Display Font:** Archivo variable (wdth 62–125, wght 100–900), with ui-sans-serif fallback
**Voice Font:** Bodoni Moda italic variable (opsz, wght 400–900), with Georgia fallback
**Figure Font:** Departure Mono, with ui-monospace fallback

**Character:** A condensed, heavy grotesque does the talking; a high-contrast italic didone interrupts it with the human words; a bitmap mono stamps the numbers. The contrast between the three is the identity.

### Hierarchy
- **Display** (760, wdth 80%, lh 0.9, -0.04em): the home H1 and the closing H2 (closing scale `clamp(2.75rem, 10vw, 7rem)`, lh 0.92). One per screen at most.
- **Headline** (720, wdth 84%, lh 0.98, -0.032em, balanced): every section title, one shared scale.
- **Title** (680, wdth 88%, -0.02em, 24px to 28px): project titles in lists. Path entries use 600 at 20–24px, -0.01em.
- **Voice** (Bodoni Moda italic 500, -0.015em, wdth reset to 100%): inherits size from its context.
- **Body** (400, 16–20px, relaxed leading): lead paragraphs in ash, max 34–46rem. The skills block runs as one dense paragraph at 22/28/32px, max 68rem.
- **Label** (400, 13–14px): dates, sources, tags, nav (13px mobile, 14px desktop), always ash.
- **Figure** (Departure Mono 400, tabular, tracking 0, lh 0.8): 110px / 132px / 154px by breakpoint.

### Named Rules
**The Three Voices Rule.** Grotesque for claims, italic serif for human words, pixel for numbers and identifiers. A word never borrows another voice's job.

**The Double-Voice Headline Rule.** A headline that switches into the italic voice mid-line exists only at three moments: the hero ("dès lundi."), the queue demo ("je prends la file.") and the close ("lundi ?"). Other section titles stay single-voice. Below headline scale, the italic voice still marks human words: the noun beside a figure ("mois"), a workplace name in the path, the city in the footer.

**The Eleven Grid Rule.** Departure Mono is drawn on an 11px grid; set it at multiples of 11px with zero tracking and tabular figures.

## Layout

One container for the whole site: centred, max 84rem (1344px), side gutters 16px, 24px from 640px, 40px from 1024px. Sections stack full-width separated by a top hairline, with generous vertical padding (96 / 128 / 160px for most; the close goes to 112 / 144 / 192px; skills 80 / 112 / 128px).

The hero fills the first viewport on tablet and up (`100svh` minus header and the queue peek) and centres vertically; on mobile it flows. Desktop compositions use a 12-column grid with a 48px gutter: the demo sets the queue in 7 columns beside a 5-column title; path and project rows split 2 / 5 / 5 (or 2 / 5 / 4 / 1 with an arrow). On tablet, rows fall to an `11rem / 1fr` two-column grid; on mobile, everything stacks. Actions stack full-width on mobile and sit in a row from 640px.

## Elevation & Depth

Flat. There is no box-shadow anywhere. Depth is two tones (ground, raised) and hairlines (rule, rule-strong). A hovered list row gains a raised wash; nothing lifts.

### Named Rules
**The No-Lift Rule.** Surfaces never cast shadows or glow. Hover changes a colour, a border or an underline, never elevation.

## Shapes

Square-ish corners: 6px on buttons and the queue panel (`rounded-md`, from a 7.5px `--radius` base), 4.5px on links' focus area and the "exemple" tag (`rounded-sm`). Full round is reserved for two things: the portrait pill set inline in the H1 (1.6em wide, 0.72em tall, aligned to the baseline) and the 8px status dots in the queue. Lines are 1px hairlines; underlines are 1px with a 0.2–0.3em offset.

## Components

### Buttons
Solid, unadorned, tall enough to hit with a thumb.
- **Shape:** gently squared (6px), 52px minimum height, 24px side padding, 16px semibold, 10px gap to a leading or trailing 17px stroke icon.
- **Call (primary):** tungsten fill, tungsten-ink text, phone icon first. The only tungsten fill on the page; it may repeat in the close as the same action.
- **Outline (CV, e-mail):** transparent, rule-strong 1px border, bone text, ash icon. Hover moves the border to bone at 60%.
- **Hover / Focus:** 150ms colour transition, ease-out. Focus is a 2px tungsten outline offset by 3px.

### Navigation
- Slim header (56px), hairline bottom border. Name left in semibold, surname at wdth 88%.
- Links: ash, 13–14px, hover bone, no underline; a small outline "CV" button closes the row.
- Footer mirrors it: hairline top, ash links, name with the city in the italic voice.

### Inline links
Bone text, 1px rule-strong underline at 0.3em offset; hover turns the underline bone. Directional arrows nudge 2px on hover under `motion-safe` only.

### Ruled lists (path, projects, figures)
Rows divided by hairlines, never boxed. Date or source in ash label on the left, title in the grotesque, summary in ash body. Project rows are whole-row links with a raised wash on hover.

### Ticket Queue (signature)
The one raised panel: raised fill, 1px rule border, 6px radius. A 52px header ("File de support", an "exemple" tag, a live/paused toggle with a tungsten or hollow ash dot), five 68px rows on desktop (four 92px rows on mobile), and a footer note. IDs and timestamps in the pixel voice; statuses run hollow ash dot (to qualify), solid ash dot (in progress), tungsten dot (live work), check mark (resolved). Rows slide 700ms on the expo-out curve. It pauses off-screen, on hover, on focus, on hidden tab, and is frozen under reduced motion with a line saying so.

### Figure Counter
A pixel-voice number at display scale that counts up once (900ms, ease-out quart) when 60% visible. Server HTML carries the final value; width is reserved so nothing reflows; no motion without JS, when already visible at hydration, or under reduced motion.

### Motion
One curve, `cubic-bezier(0.16, 1, 0.3, 1)`. Three moments only: H1 lines rise from a mask (900ms, 90ms stagger) and the portrait pill opens (1100ms, 380ms delay), both pure CSS; the queue; the figures. UI feedback (colour, border) is 150ms. Under `prefers-reduced-motion: reduce` the page is static.

## Do's and Don'ts

### Do:
- **Do** keep tungsten (#F5B66A) for the call action, focus, selection and live state; everything else is bone, ash or a rule.
- **Do** set every section title with the shared headline scale (720, wdth 84%, -0.032em).
- **Do** put human words in the italic voice and numbers and ticket IDs in the pixel voice at multiples of 11px.
- **Do** separate content with 1px hairlines (bone at 10%) and present lists as ruled rows.
- **Do** keep the H1 fully rendered in server HTML; entrance motion is CSS and is removed under reduced motion.
- **Do** use the one container (max 1344px, gutters 16 / 24 / 40px).

### Don't:
- **Don't** use gradients, glows, glass or box-shadows.
- **Don't** wrap content in cards or tile grids; the queue panel is the single raised surface.
- **Don't** add a second accent colour or use tungsten as decoration.
- **Don't** round anything fully except the portrait pill and status dots.
- **Don't** add a fourth typeface or set prose in the pixel face.
- **Don't** animate beyond the three motion moments.
