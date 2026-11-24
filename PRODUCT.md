# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: the alternance recruiter.** An HR person or IT manager at a company hiring a « technicien systèmes & réseaux » apprentice (BTS SIO SISR, 3 days in company / 2 days at school, starting September 2027, Paris; Yanis is in first year). They arrive from a CV, LinkedIn or an email link, scan for about 30 seconds, and decide whether to call Yanis for an interview.
- Secondary: BTS SIO teachers and the E5/E6 jury, who read project and tech-watch pages in depth. They are served by `/projets` and `/veille`, not by the home page.

## Product Purpose

Personal portfolio of Yanis HARRAT, published at `yanis-harrat.com`. It exists to get Yanis an alternance as a systems & network technician. Success: a recruiter leaves the home page knowing who he is, what he can do on day one, and how to reach him, and wants to call.

## Positioning

A systems & network technician profile with traits a typical BTS SIO SISR student cannot truthfully claim together:

- **Real production helpdesk**: N1/N2 tickets, Active Directory, Microsoft 365, Windows fleet at Secours Catholique Caritas France (June–September 2026).
- **A developer's reflex**: École 42 piscine, Python/JavaScript automation, n8n, an information-system rebuild delivered and taught to users at IUT Meaux, and a **macOS app** he built.
- **Fluent with modern and AI tooling**: Anthropic certifications (AI Fluency, Claude Code in Action, Claude 101), works with Claude Code.
- **Composure with people**: years as chef de rang (customer relationship, pressure, team coordination), which shows in user support.

## Operating Context

- Visitors read the site on desktop (recruiter at work) and on mobile (from LinkedIn or email).
- The CV PDF (`public/cv/yanis-harrat-cv.pdf`) is downloaded and forwarded internally.
- Contact happens by email, phone or the contact form on `/contact` (Turnstile + Resend, nothing stored). The form is live in production; a real send was verified on 2026-11-24.

## Capabilities and Constraints

- Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4 with design tokens, shadcn/ui primitives, MDX content, GSAP for all animation. The design system is described in `DESIGN.md`. Hosted on Vercel Hobby (non-commercial use), 0 €/month budget.
- Content is MDX in the repo (`src/content/`); profile data lives in `src/lib/profile.ts`; contact data in `src/lib/site.ts`.
- Pages: home, `/projets`, `/veille`, `/contact`, `/mentions-legales`, CV PDF.
- Must stay fast, indexable (SEO matters for the name « Yanis Harrat ») and GDPR-compliant.
- Live on `yanis-harrat.com` since 2026-11-17.

## Brand Commitments

- Name written « Yanis HARRAT ». Professional contact: `yanis@yanis-harrat.com`, `07 68 18 79 34`, LinkedIn `/in/yanis-harrat/`, GitHub `yanix2445`.
- Portrait photo provided: `public/images/yanis-harrat.jpg` (warm amber bokeh on a dark background).
- Copy in French.
- Visual direction validated by Yanis on a rendered mockup (2026-11-13): « Générique », a film-title world. Dark warm ground, cream type, ember orange accent, condensed poster lettering. Reference: `aidd_docs/tasks/2026_11/2026_11_13_home-generique/mockup/index.html`.
- Two earlier directions were rejected and must not come back: the amber SaaS-like dark theme (PR #10) and the editorial « Opérationnel dès lundi » page (PR #11).
- Palette must harmonise with the portrait's warm light (Yanis's explicit request).

## Evidence on Hand

- CV (skills, certifications, experiences, education): `public/cv/yanis-harrat-cv.pdf`.
- Real projects Yanis can document: Windows Server / Active Directory labs, a Proxmox / Docker homelab, a macOS app. They are written up as MDX project pages; a few sections are still marked « à compléter ».
- One tech-watch article: « L'IA comme copilote du technicien informatique » (`src/content/veille/ia-copilote-technicien-informatique.mdx`).
- Absent: testimonials, employer quotes, metrics, logos of companies. Do not fabricate them.

## Product Principles

1. **Thirty seconds to a call.** Role sought, rhythm, and a way to reach Yanis are obvious without scrolling.
2. **Proof over adjectives.** Show concrete environments, tools and real projects; never generic claims.
3. **Show the technician, not a template.** The site should feel like it could only be Yanis's: infra rigor plus a developer's craft.
4. **Fast and accessible is part of the pitch.** A systems technician's site that loads instantly and works for everyone is itself evidence.

## Accessibility & Inclusion

- WCAG 2.2 AA target: keyboard navigation with visible focus, readable without JavaScript, `prefers-reduced-motion` honoured with a complete static page.
