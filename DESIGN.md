---
name: Yanis HARRAT · Portfolio
description: A film-title world for a systems and network technician looking for an apprenticeship.
colors:
  background: "#0b0a09"
  foreground: "#f2ebdd"
  soft: "#cfc6b6"
  muted-foreground: "#9a9082"
  card: "#151310"
  secondary: "#1c1916"
  primary: "#ff5b2e"
  primary-foreground: "#170a04"
  border: "rgb(242 235 221 / 0.18)"
  input: "rgb(242 235 221 / 0.24)"
typography:
  display:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "min(21.5vw, 34.5svh)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "11.5vw"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "clamp(0.9375rem, 2.1vw, 2.125rem)"
    fontWeight: 500
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, sans-serif"
    fontSize: "clamp(0.8125rem, 1.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "clamp(0.625rem, 0.8vw, 0.8125rem)"
    fontWeight: 400
    letterSpacing: "0.16em"
rounded:
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  2xl: "1.125rem"
spacing:
  gutter: "3.4vw"
  gutter-phone: "1rem"
  poster: "clamp(1.25rem, 2.2vw, 2.5rem)"
  control-xl: "clamp(3.5rem, 5.25vw, 5.25rem)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.xl}"
    height: "{spacing.control-xl}"
    padding: "0 2.25rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    height: "{spacing.control-xl}"
    padding: "0 2.25rem"
  button-outline-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
  button-label:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  input:
    backgroundColor: "rgb(242 235 221 / 0.07)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    height: "3rem"
    padding: "0.25rem 0.875rem"
  poster-hot:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.poster}"
---

# Design System: Yanis HARRAT · Portfolio

## Overview

**Creative North Star: « Générique »**, the opening credits of a film. The site introduces Yanis the way a title sequence introduces a cast: a full-frame portrait, a name in giant condensed capitals, then acts, posters and laurels.

The mood is warm, dark and confident: a near-black ground lit by the amber light of the portrait, cream type, one ember-orange accent. Mono captions carry facts (dates, roles, domains) the way a slate carries a take number.

Validated by Yanis on a rendered mockup (`aidd_docs/tasks/2026_11/2026_11_13_home-generique/mockup/index.html`). Two earlier directions were rejected and must not return: an amber SaaS-like dark theme and an editorial « Opérationnel dès lundi » page.

**Key characteristics**

- One accent. Orange marks the current act, a featured poster, the last line of the finale and the primary action. Never decoration.
- Two voices. Poster lettering shouts names and titles; a quiet grotesque says everything else.
- Fluid scale. Display sizes follow the viewport width and are capped by its height, so the composition holds from a phone to an ultra-wide screen.
- Content first. Everything is readable without JavaScript and without motion.

## Colors

All colors are CSS variables in `src/app/globals.css`, exposed to Tailwind through `@theme inline`. Use the semantic classes (`bg-background`, `text-soft`, `border-border`); never a raw value.

- **Ground** `background` `#0b0a09`: warm near-black. `card` and `secondary` are one and two steps lighter for surfaces.
- **Ink** `foreground` `#f2ebdd`: cream, for titles and primary text. `soft` for running text, `muted-foreground` for captions and labels.
- **Ember** `primary` `#ff5b2e`: the single accent. `primary-foreground` is the near-black ink used on it.
- **Lines** `border`: cream at 18 %, for every rule and outline.

The site is dark only. On a cream poster the ink is `background`.

## Typography

Fonts are local variable files (`src/app/fonts/`).

- **Big Shoulders**, weight 900, uppercase: poster lettering, through `type-poster` plus a `text-display-*` size.
- **Hanken Grotesk**: all running text and interface titles.
- **Geist Mono**, uppercase, wide tracking: captions and labels, through `type-label`.

Every size is a named token (`--text-*`). Each role carries its own size, line height, tracking and weight, and resolves to a phone value or a wide-screen value, so components never write a breakpoint for type. A fluid size never drops below its phone value: a tablet reads at least as large as a phone.

| Role | Class | Used for |
| ---- | ----- | -------- |
| Name | `text-display-name` | The hero name |
| Numeral | `text-display-numeral` | Act numbers |
| Headline | `text-display-xl`, `-lg`, `-md` | Section, page and act titles |
| Poster | `text-display-poster` | Project poster titles |
| Title | `text-display-title` | Article and project-page titles (smaller on phones, so long words fit) |
| Intertitle | `text-display-sm` | Section headings inside an article |
| Finale | `text-display-finale` | The closing sentence |
| Synopsis | `text-synopsis` | The pitch under the hero |
| Subtitle | `text-subtitle` | Roles |
| Lead, body | `text-lead`, `text-body`, `text-body-sm` | Running text |
| Meta, caption | `text-meta`, `text-caption` | Small facts |
| Action, button | `text-action`, `text-button` | Links and controls |
| Label | `type-label` | Mono captions |

Outlined letters use `type-outline` (cream hairline) and `type-outline-accent` (orange, act numbers).

New text sizes and spacing tokens are added to `globals.css` and to `TEXT_SIZES` or `SPACINGS` in `src/lib/utils.ts`, or `cn()` would not merge them correctly.

## Layout

- **Gutter**: `px-gutter`, 3.4vw on wide screens and 1rem on phones.
- **Rhythm**: sections are separated by a top rule (`border-t border-border`) and screen-relative padding. Scene-specific measures (a title pinned 16vh from the top) stay as viewport units in the classes; they are composition, not tokens.
- **Breakpoints**: `md:` (48 rem) is the one that reshapes pages; below it everything stacks in a column. `lg:` only adds a third column to the catalog grid, and `max-sm:` hides the header call button.
- **Pinned scenes**: the hero and the acts are pinned and scrubbed on screens at least 48 rem wide and 35 rem tall. Elsewhere, and with reduced motion, nothing is pinned.
- **Reading pages** (project and tech-watch pages, legal notice): a poster title, then a two-column grid matching the « Fiche technique » (`0.78fr 1.22fr`): facts on the left (date, status, domain, topics, sticky on wide screens), text on the right at 68ch through `Prose`.
- **Portrait**: the head is never cropped. `--portrait-y` lowers the vertical framing as the screen gets wider.

## Elevation & Depth

Flat. Depth comes from the portrait, veils (background-colored gradients over the photo) and tone steps (`background`, `card`, `secondary`). No shadows. The only lift is motion: a control rises 3 px on hover, a poster tilts and rises.

## Shapes

- Corners come from `--radius` (0.625 rem): `rounded-md` for badges, `rounded-lg` for controls and fields, `rounded-xl` for large buttons, `rounded-2xl` for posters. No pills.
- Rules are 1 px in `border`. Posters and badges may use `border-current`.
- The one round shape is the accent dot before the hero caption.

## Components

All interactive primitives are shadcn/ui components in `src/components/ui/`, themed in their `cva` variants. Pass `className` for layout only.

- **Button**: `default` (ember) and `outline` (inverts to cream on hover). Sizes `xl` for calls to action, `label` for mono-caption buttons, the shadcn sizes for the rest.
- **Badge**: mono caption in a rounded rectangle. `outline` on the dark ground (keywords, topics), `ink` on a colored poster and for a project's status.
- **ToggleGroup**: catalog filters, single choice, the active one filled with cream.
- **Prose** (`components/mdx/prose.tsx`): MDX bodies and the legal notice. Intertitles in poster lettering, ember bullets and link underlines, colors from `prose-theme` in `globals.css`.
- **Navigation**: the current page's link is ember and carries `aria-current="page"`.
- **Field, Input, Textarea**: the contact form. Errors sit under the field and are linked to it.
- **Sonner**: form feedback.
- **Poster** (`components/projects/poster.tsx`): a project as a film poster, in three inks assigned in order: ember, cream, dark with an ember title.
- **Laurel** (`components/home/laurel.tsx`): one wreath per certification; the text scales with the wreath.

Keyboard focus is a 2 px ember outline everywhere; form fields use the shadcn ring in the same color.

Motion is GSAP only, in `src/components/animations/`, wrapping server-rendered sections and targeting `data-*` attributes. Start states are set by GSAP at hydration, never in CSS.

## Do's and Don'ts

**Do**

- Use tokens: semantic colors, `text-*` roles, `rounded-*`, `px-gutter`.
- Reach for a shadcn primitive before writing markup for a control.
- Keep accented capitals clear of the line above (« ÉQUIPE », « À L'AFFICHE »).
- Check new layouts at 1440 × 900, 1366 × 650, 768 × 1024 and 375 × 812.

**Don't**

- Don't write a color, a radius or a font size in a component.
- Don't use pill-shaped buttons or badges.
- Don't add a second accent color, shadows, glass or gradient text.
- Don't hide content in CSS for an animation to reveal.
- Don't redraw a brand logo for a certification: show the official badge file or plain text.
