---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/home"]
---

# Accueil — yanis-harrat.com

## Scope and mode

Route `/` (home). Mode: **Persuade**. Primary visitor: the alternance recruiter (see PRODUCT.md). Action: call or email Yanis, or download the CV.

## Strategy

- Belief to create in 10 seconds: « opérationnel dès lundi ».
- Proof: real environments he has worked in (N1/N2 helpdesk in production, AD DS, Microsoft 365), the dev reflex (42, automation, macOS app), modern tooling (Anthropic certs), people skills (chef de rang).
- Refused by Yanis (any of these = failure): template SaaS look (dark + glowing cards + gradients), hacker cliché (green terminal, matrix, fake code), flat online CV, gratuitous animation, heavy metaphors (rack, metro, photocopy were all rejected).
- Craft bar: dovetail.com (quality, type mixing, wit, product demo as proof), never its layout or copy.

## Direction contract

THESIS: A recruiter's 30-second read, typeset like a confident product launch: the person is the headline, his day-one work is the demo. Refuses the category default of hero + skill-badge grid + timeline cards.

OWN-WORLD: Near-black taken from the portrait's background (#121114 ground, #1C1A1A raised), bone white type (#EFE9E1), warm grey for secondary (#9C948B), and ONE flat action colour taken from the portrait's bokeh, tungsten #F5B66A, used only for actions and live state. No gradients, no glows, no glass. Three type voices in one system: a tight display grotesque for headlines, an italic serif for the human words, a pixel/bitmap face only for figures and ticket IDs. Hairline rules, square-ish 6px corners, generous negative space.

STORY: The recruiter reads « Opérationnel [portrait pill] dès lundi. », sees the role and rhythm, watches a support queue get worked, scans the figures, skills, path and projects, and calls.

FIRST VIEWPORT: Top: slim nav (name left, Projets / Veille / Contact, "CV" right). Left two-thirds: kicker line (role · BTS SIO SISR · 3 j / 2 j), then the giant headline on two to three lines, « Opérationnel » in grotesque, the portrait as an inline rounded pill at cap height, « dès lundi. » in italic serif. Below: one sentence of proof and two actions: tungsten « Appeler · 07 68 18 79 34 » and outline « CV (PDF) ». Right of the fold edge: the start of the live ticket queue panel peeking up.

FORM: Pinned by Yanis after rejecting the rolled hand. seed: none (pinned) — « Fond graphite quasi noir, blanc, une couleur d'action… Titre géant serré qui mélange grotesque + serif italique + police pixel : « Opérationnel [ta photo en pastille] dès lundi. »… une vraie démo animée d'une file de tickets N1/N2 qui passent à « Résolu »… chiffres clés en police pixel » + « ajuste la palette pour que ça passe bien avec ma photo ».

SIGNATURE INTERACTION / MOTION GRAMMAR: Headline lines rise from a mask line by line once, the portrait pill widens open. The ticket queue demo (labelled « exemple ») plays a real loop: tickets arrive, get a category, move to « Résolu » with a timestamp, paused when off-screen or on hover/focus, static under reduced motion. Figures tick once in the pixel face when they enter. Nothing else moves.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- Real project write-ups (AD lab, Proxmox homelab, macOS app) are being authored separately; the home shows the 3 latest MDX entries.
