# Sketch Manifest

## Design Direction

Bold, techy, and fluid developer portfolio. The navbar uses a scroll-morph code-editor aesthetic (monospace `//` prefix, sharp corners, blue accent left border, glass panel on scroll). Hero illustration should extend this language — functional interfaces that prove craft, not decorative filler. Text-first layout like craftz.dog, but the right side is a window into what the developer actually builds.

## Reference Points

- **Brittany Chiang** — Clean horizontal nav, minimal, confident. Name left, links right.
- **Tamal Sen** — Techy `//` prefix on nav links, code-aesthetic.
- **Craftz.dog (Takuya Matsuyama)** — Horizontal tabs, understated, content-first.

## Current Implementation

- React 19 + TanStack Router + Framer Motion + Tailwind CSS v4 + Radix UI + Lucide icons
- Current nav: brand left (CodeXml + name), links center with `layoutId="activeTab"` animated pill, theme toggle + resume right, hamburger → slide-down mobile menu with staggered Framer Motion animation

## Sketches

| #   | Name                 | Design Question                           | Winner           | Tags                 |
| --- | -------------------- | ----------------------------------------- | ---------------- | -------------------- |
| 001 | nav-link-personality | How should the nav links feel on desktop? | E (Scroll Morph) | nav, desktop, motion |
| 002 | mobile-nav-pattern   | How should mobile navigation feel?        | C (Side Drawer)  | nav, mobile, motion  |
| 003 | hero-illustration    | What functional interface should the hero illustration be? | — | hero, illustration, motion |
| 004 | hero-animation       | How should the hero illustration breathe? | — | hero, animation, motion |
