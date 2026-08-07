---
sketch: 002
name: mobile-nav-pattern
question: "How should mobile navigation feel?"
winner: "C"
tags: [nav, mobile, motion]
---

# Sketch 002: Mobile Nav Pattern

## Design Question

How should the mobile navigation open, present links, and close — what's the spatial and motion feel?

## How to View

```bash
open .planning/sketches/002-mobile-nav-pattern/index.html
```

## Variants

- **A: Full-Screen Overlay** — Takes over the entire viewport. Links appear with staggered slide-up animation (50ms delay each). Large typography (28px). Footer has theme toggle + resume. Immersive, confident.
- **B: Bottom Sheet** — Slides up from bottom, partially covering content. Drag handle at top. Dimmed backdrop taps to dismiss. Numbered links with icon containers. Feels native, like iOS share sheet.
- **C: Side Drawer** — Slides in from right. Content behind pushes left and scales down (parallax depth). Monospace `// navigation` subtitle. Numbered links with techy prefix. Structured, engineered feel.

## What to Look For

- **Motion feel** — Does the stagger (A) feel alive? Does the sheet slide (B) feel natural? Does the push (C) feel spatial?
- **Dismissal** — How easy is it to close? Overlay needs X button, sheet needs backdrop tap, drawer needs backdrop tap.
- **Information density** — Overlay shows 5 large links. Sheet shows 5 links with icons. Drawer shows 5 links with numbers. Which has the right density?
- **Brand consistency** — Which mobile pattern best matches the desktop variants from Sketch 001?
