# Design System — Tim DeHof Portfolio

> **Creative North Star:** "The developer who ships quietly"
> **Overview voice:** Polished & professional
> **Elevation:** Layered & dimensional
> **Component feel:** Tactile

---

## 1. Color System

### Brand Colors (HSL)

| Role            | Light Mode                   | Dark Mode                    | Personality                                   |
| --------------- | ---------------------------- | ---------------------------- | --------------------------------------------- |
| **Primary**     | `262.1 83.3% 57.8%` (Purple) | `258 86% 79%` (Light Purple) | The visionary — leads with creative authority |
| **Secondary**   | `210 40% 98%` (Near White)   | `170 47% 65%` (Teal)         | The reliable one — calm, trustworthy backbone |
| **Accent**      | `210 40% 98%` (Near White)   | `35 65% 64%` (Amber)         | The warm touch — energy at key moments        |
| **Destructive** | `0 84.2% 60.2%` (Red)        | `0 62.8% 30.6%` (Dark Red)   | Errors and warnings                           |

### Surface Colors

| Token      | Light Mode                       | Dark Mode                       |
| ---------- | -------------------------------- | ------------------------------- |
| Background | `0 0% 100%` (White)              | `229 25% 34%` (Dark Blue-Gray)  |
| Foreground | `222.2 84% 4.9%` (Near Black)    | `227 34% 75%` (Light Blue-Gray) |
| Card       | `0 0% 100%` (White)              | `229 25% 34%` (Dark Blue-Gray)  |
| Muted      | `210 40% 98%` (Off White)        | `227 23% 44%` (Medium Gray)     |
| Border     | `214.3 31.8% 91.4%` (Light Gray) | `227 23% 44%` (Medium Gray)     |

### Semantic Colors (Tailwind Utilities)

| Context | Light                    | Dark       | Usage                                     |
| ------- | ------------------------ | ---------- | ----------------------------------------- |
| Teal    | `teal-800`               | `teal-300` | Navbar links, active states, footer links |
| Blue    | `blue-600`               | `blue-400` | Focus rings, text selection               |
| Gray    | `gray-900` / `slate-900` | —          | Footer gradient                           |
| Emerald | `emerald-500`            | —          | Availability badge                        |

### Color Usage Rules

- **Purple** → Primary buttons, active indicators, ring/focus states
- **Teal** → Navigation, links, interactive accents, footer CTAs
- **Amber** → Dark-mode accent only (badges, highlights)
- **Never use** → Neon colors, saturated gradients on text, red for non-destructive actions

---

## 2. Typography

### Font Stack

```css
font-family:
  "Inter",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Font Features

```css
font-feature-settings:
  "rlig" 1,
  "calt" 1;
```

### Type Scale

| Element | Tailwind Classes                             | Usage                       |
| ------- | -------------------------------------------- | --------------------------- |
| Display | `text-4xl md:text-5xl lg:text-6xl font-bold` | Hero headlines              |
| H1      | `text-3xl md:text-4xl font-bold`             | Page titles                 |
| H2      | `text-2xl md:text-3xl font-bold`             | Section headings            |
| H3      | `text-xl md:text-2xl font-semibold`          | Card titles, subsections    |
| Body    | `text-base`                                  | Paragraphs, general content |
| Small   | `text-sm`                                    | Labels, metadata, captions  |
| Micro   | `text-xs`                                    | Badges, timestamps          |

### Typography Rules

- **Headings:** Use `font-bold` or `font-semibold`. Never below `font-medium`.
- **Body text:** Use `text-foreground` for primary, `text-muted-foreground` for secondary.
- **Gradient text:** Apply `bg-gradient-to-r from-blue-300 via-teal-300 to-purple-400 bg-clip-text text-transparent` for decorative headings (footer only).
- **Line height:** Headings `leading-tight`, body `leading-relaxed`.

---

## 3. Spacing & Layout

### Container

Responsive container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

### Spacing Scale

| Context  | Value     | Tailwind          |
| -------- | --------- | ----------------- |
| Tight    | 0.25rem   | `p-1` / `gap-1`   |
| Cozy     | 0.5rem    | `p-2` / `gap-2`   |
| Normal   | 1rem      | `p-4` / `gap-4`   |
| Relaxed  | 1.5rem    | `p-6` / `gap-6`   |
| Spacious | 2rem      | `p-8` / `gap-8`   |
| Section  | 4rem–5rem | `py-16` / `py-20` |

### Grid

- **Default:** `grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16` (footer)
- **Projects:** Responsive grid, 1→2→3 columns
- **Cards:** Flex column with `space-y-1.5` in header

---

## 4. Elevation & Depth

### Philosophy: Layered & Dimensional

Elements float slightly above the surface. Depth communicates hierarchy.

| Level        | Usage                 | Light Mode                       | Dark Mode                        |
| ------------ | --------------------- | -------------------------------- | -------------------------------- |
| **Flat**     | Inline elements, text | —                                | —                                |
| **Subtle**   | Cards, dropdowns      | `shadow`                         | `shadow`                         |
| **Raised**   | Navbar, modals        | `shadow-sm` + `backdrop-blur-md` | `shadow-sm` + `backdrop-blur-md` |
| **Floating** | Tooltips, popovers    | `shadow-lg`                      | `shadow-lg`                      |

### Specific Patterns

- **Navbar:** Fixed, frosted glass (`bg-white/90 dark:bg-gray-900/90 backdrop-blur-md`), subtle bottom border + shadow
- **Cards:** `rounded-xl border bg-card shadow` — minimal shadow, border provides separation
- **Footer:** Full-bleed gradient background (`from-gray-900 via-slate-900 to-gray-900`), no shadow needed
- **Buttons:** Primary has `shadow`, others have `shadow-sm`

---

## 5. Border Radius

### Scale (Base: 0.5rem)

| Token  | Value    | Tailwind       | Usage             |
| ------ | -------- | -------------- | ----------------- |
| `sm`   | 0.25rem  | `rounded-sm`   | —                 |
| `md`   | 0.375rem | `rounded-md`   | Buttons, inputs   |
| `lg`   | 0.5rem   | `rounded-lg`   | —                 |
| `xl`   | 0.75rem  | `rounded-xl`   | Cards, containers |
| `2xl`  | 1rem     | `rounded-2xl`  | —                 |
| `3xl`  | 1.25rem  | `rounded-3xl`  | Modals            |
| `full` | 9999px   | `rounded-full` | Badges, avatars   |

### Rules

- **Cards:** Always `rounded-xl`
- **Buttons:** `rounded-md`
- **Inputs:** `rounded-md`
- **Badges:** `rounded-full`
- **Modals:** `rounded-3xl`
- **Never mix** — Keep radius consistent within a component

---

## 6. Components

### Button

**Variants:**
| Variant | Appearance | Usage |
|---------|-----------|-------|
| `default` | Purple bg, white text, shadow | Primary actions |
| `destructive` | Red bg, white text | Danger actions |
| `outline` | Border only, bg transparent | Secondary actions |
| `secondary` | Light bg, dark text | Tertiary actions |
| `ghost` | No bg, hover highlight | Navigation, inline |
| `link` | Text only, underline on hover | Inline links |

**Sizes:**
| Size | Height | Padding | Usage |
|------|--------|---------|-------|
| `sm` | 2rem | 0.75rem | Compact UI |
| `default` | 2.25rem | 1rem | Standard |
| `lg` | 2.5rem | 2rem | Prominent CTAs |
| `icon` | 2.25rem | — | Icon-only buttons |

**Tactile Feel:** Buttons should feel pressable. Use `hover:bg-primary/90` for subtle darkening, `active:` states for press feedback. Focus ring: `outline-offset-2 outline-3 outline-blue-600 dark:outline-blue-400`.

### Card

```
rounded-xl border bg-card text-card-foreground shadow
```

**Parts:** Card → CardHeader → CardTitle / CardDescription → CardContent → CardFooter

**Usage:** Projects, blog posts, testimonials, any grouped content.

### Badge

```
rounded-full px-3 py-1 text-xs font-medium
```

**Usage:** Status indicators, tags, availability.

### Navbar

- Fixed top, full width
- Frosted glass effect
- Brand: gradient text with `bg-gradient-to-r bg-clip-text text-transparent from-slate-700 via-slate-600 to-slate-700`
- Links: `text-sm font-medium`, teal on active, gray on inactive
- Mobile: Hamburger menu with slide-down panel
- Active indicator: Teal bottom border (`h-0.5 bg-teal-800 dark:bg-teal-300`)

### Footer

- Dark gradient background
- 3-column grid (brand, links, contact)
- Gradient text headings
- Teal links with hover slide effect (`hover:translate-x-2`)
- Social icons with scale effect (`hover:scale-110`)

---

## 7. Motion & Animation

### Philosophy

Motion should feel **intentional and polished** — not flashy. Every animation has a purpose.

### Framer Motion Patterns

| Pattern  | Usage                | Duration                    |
| -------- | -------------------- | --------------------------- |
| Fade in  | Page sections        | 0.5s                        |
| Slide up | Content reveal       | 0.5s                        |
| Stagger  | Lists, grids         | 0.1s delay between items    |
| Scale    | Hover interactions   | 0.2s                        |
| Spring   | Interactive elements | stiffness: 300, damping: 20 |

### Rules

- **Respect `prefers-reduced-motion`** — Already implemented in CSS (duration: 0.01ms)
- **No autoplay animations** that block content
- **Keep under 300ms** for micro-interactions
- **Use `will-change`** sparingly — only for known animated elements
- **Stagger delays:** 0.05s–0.1s between siblings for list animations

---

## 8. Accessibility

### Standard: WCAG 2.1 AA

### Focus Management

- **Focus ring:** `outline-offset-2 outline-3 outline-blue-600 dark:outline-blue-400`
- **Visible on keyboard interaction** via `focus-visible` (note: browsers may retain the ring for mouse users after prior keyboard interaction)
- **No focus ring on mouse click** (unless the element received keyboard focus earlier in the session)

### Color Contrast

| Pair                     | Ratio (Light) | Ratio (Dark) | Status             |
| ------------------------ | ------------- | ------------ | ------------------ |
| Foreground on Background | ~15:1         | ~5.5:1       | ✅ AA              |
| Primary on White         | ~4.6:1        | —            | ✅ AA              |
| Muted on White           | ~3.5:1        | —            | ⚠️ Large text only |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Semantic HTML

- Use `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>` landmarks
- Alt text on all images
- ARIA labels on icon-only buttons
- Skip-to-content link

---

## 9. Dark Mode

### Strategy

System preference with manual toggle. Uses `.dark` class on root element.

### Dark Mode Tokens

All tokens are defined in `src/styles/index.css` under `.dark` selector. Key differences:

| Token      | Light → Dark                                 |
| ---------- | -------------------------------------------- |
| Background | White → Dark Blue-Gray (`229 25% 34%`)       |
| Foreground | Near Black → Light Blue-Gray (`227 34% 75%`) |
| Primary    | Purple → Lighter Purple (`258 86% 79%`)      |
| Secondary  | Near White → Teal (`170 47% 65%`)            |
| Accent     | Near White → Amber (`35 65% 64%`)            |
| Border     | Light Gray → Medium Gray (`227 23% 44%`)     |

### Dark Mode Rules

- **Never hardcode colors** in components — always use CSS variables or Tailwind `dark:` prefix
- **Test both modes** before shipping any UI change
- **Gradient text** uses different color stops in dark mode
- **Shadows** are less visible in dark mode — rely on borders for separation

---

## 10. Do / Don't

### Do ✅

- Use semantic color tokens (`bg-primary`, `text-foreground`)
- Respect the radius scale — cards are `rounded-xl`, buttons are `rounded-md`
- Use `shadow` sparingly — borders do most of the separation work
- Test keyboard navigation on every interactive element
- Use `prefers-reduced-motion` for all animations
- Keep CTAs consistent: purple for primary, outline for secondary

### Don't ❌

- Don't use neon or saturated colors outside the palette
- Don't add shadows to elements that already have borders
- Don't use `font-weight: normal` (400) for headings
- Don't animate more than one property per element
- Don't use red for non-destructive actions
- Don't skip focus states on interactive elements
- Don't hardcode `#hex` colors — always use CSS variables

---

_Generated by Impeccable from codebase scan + brand interview._
_Last updated: 2025-01-27_
