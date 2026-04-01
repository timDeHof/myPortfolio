# Portfolio Design Document

## Table of Contents
1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Components](#components)
6. [Spacing & Layout](#spacing--layout)
7. [Animations](#animations)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)
10. [Stitch Design System](#stitch-design-system)

---

## Overview

This design document defines the visual language for Timothy DeHof's software developer portfolio. The portfolio showcases technical expertise, projects, and services for potential clients and employers.

### Brand Attributes
- **Professional**: Clean, polished, production-ready
- **Technical**: Demonstrates coding proficiency through attention to detail
- **Approachable**: Welcoming to all visitors, from recruiters to fellow developers
- **Modern**: Up-to-date with current design trends and best practices

---

## Design Principles

### 1. Content-First
The design serves the content, not the reverse. Information should be easy to scan and digest.

### 2. Consistency
Every page uses the same visual language - colors, typography, spacing, and interaction patterns.

### 3. Performance
Design choices consider load times. Optimized images, minimal animations, efficient CSS.

### 4. Accessibility
WCAG 2.2 AA compliance. Sufficient contrast, keyboard navigable, screen reader friendly.

### 5. Dark Mode Default
Dark theme as primary, with light mode option. Reduces eye strain for developers working in dark environments.

---

## Color System

### Color Palette

#### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#3b82f6` | CTAs, links, active states, highlights |
| Primary Light | `#60a5fa` | Hover states, secondary highlights |
| Primary Dark | `#2563eb` | Active/pressed states |

#### Secondary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Teal | `#14b8a6` | Success states, secondary CTAs, accents |
| Teal Light | `#2dd4bf` | Hover states |
| Teal Dark | `#0d9488` | Active states |

#### Neutral Colors (Dark Mode)
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#0f172a` | Page background |
| Surface | `#1e293b` | Cards, elevated surfaces |
| Surface Light | `#334155` | Hover backgrounds, borders |
| Text Primary | `#f1f5f9` | Headlines, important text |
| Text Secondary | `#94a3b8` | Body text, descriptions |
| Text Muted | `#64748b` | Captions, metadata |

#### Neutral Colors (Light Mode)
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#ffffff` | Page background |
| Surface | `#f8fafc` | Cards, elevated surfaces |
| Surface Light | `#e2e8f0` | Hover backgrounds, borders |
| Text Primary | `#0f172a` | Headlines, important text |
| Text Secondary | `#475569` | Body text, descriptions |
| Text Muted | `#94a3b8` | Captions, metadata |

#### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#22c55e` | Success messages, online indicators |
| Warning | `#f59e0b` | Warnings, pending states |
| Error | `#ef4444` | Error messages, destructive actions |

### CSS Variables

```css
:root {
  /* Primary */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  
  /* Secondary */
  --color-secondary: #14b8a6;
  --color-secondary-light: #2dd4bf;
  --color-secondary-dark: #0d9488;
  
  /* Background (Light) */
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-elevated: #ffffff;
  
  /* Text (Light) */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
  
  /* Borders */
  --color-border: #e2e8f0;
  --color-border-focus: #3b82f6;
}

.dark {
  /* Background (Dark) */
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-surface-elevated: #334155;
  
  /* Text (Dark) */
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  
  /* Borders */
  --color-border: #334155;
  --color-border-focus: #60a5fa;
}
```

---

## Typography

### Font Family
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Labels, UI elements |
| Semi-Bold | 600 | Subheadlines |
| Bold | 700 | Headlines, emphasis |

### Font Sizes
| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Captions, badges |
| `text-sm` | 0.875rem (14px) | 1.25rem | Secondary text, labels |
| `text-base` | 1rem (16px) | 1.5rem | Body text |
| `text-lg` | 1.125rem (18px) | 1.75rem | Large body text |
| `text-xl` | 1.25rem (20px) | 1.75rem | Small headlines |
| `text-2xl` | 1.5rem (24px) | 2rem | Section headlines |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Page headlines |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Hero headlines |
| `text-5xl` | 3rem (48px) | 1 | Large hero text |

### Font Features
```css
font-feature-settings: "rlig" 1, "calt" 1;
```

### Heading Styles
```css
h1 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 2.5rem;
  letter-spacing: -0.025em;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
}
```

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-light);
}
```

#### Outline Button
```css
.btn-outline {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
}

.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
```

#### Button Sizes
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 2rem | 0.5rem 1rem | 0.875rem |
| `md` | 2.5rem | 0.625rem 1.25rem | 1rem |
| `lg` | 3rem | 0.75rem 1.5rem | 1.125rem |

### Cards

#### Base Card
```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
```

#### Project Card
- Thumbnail image (16:9 aspect ratio)
- Project title
- Tech stack badges
- Short description
- Links to live demo / GitHub

### Badges / Chips
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-surface-elevated);
  border-radius: 9999px; /* Full rounded */
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}
```

### Form Inputs
```css
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  color: var(--color-text-primary);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Navigation

#### Navbar
- Fixed position at top
- Semi-transparent background with blur
- Logo on left
- Navigation links centered or right-aligned
- Mobile: hamburger menu with slide-out drawer

#### Footer
- Multi-column layout
- Social links with icons
- Copyright notice
- Back to top button

---

## Spacing & Layout

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight spacing |
| `space-2` | 0.5rem (8px) | Component internal |
| `space-3` | 0.75rem (12px) | Between elements |
| `space-4` | 1rem (16px) | Standard spacing |
| `space-6` | 1.5rem (24px) | Section padding |
| `space-8` | 2rem (32px) | Between sections |
| `space-12` | 3rem (48px) | Large gaps |
| `space-16` | 4rem (64px) | Hero sections |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 0.25rem (4px) | Small elements |
| `radius-md` | 0.5rem (8px) | Default, cards |
| `radius-lg` | 0.75rem (12px) | Large cards |
| `radius-xl` | 1rem (16px) | Modals |
| `radius-full` | 9999px | Pills, avatars |

### Layout Max Widths
| Container | Max Width | Usage |
|-----------|-----------|-------|
| `sm` | 640px | Narrow content |
| `md` | 768px | Standard content |
| `lg` | 1024px | Wide content |
| `xl` | 1280px | Full width |
| `2xl` | 1536px | Extra large |

---

## Animations

### Transitions
```css
/* Default transition */
transition: all 0.2s ease;

/* Slower for larger elements */
transition: all 0.3s ease;

/* Color transitions */
transition: color 0.2s ease, background-color 0.2s ease;
```

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Slide In from Left
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Animation Utilities
- `animate-fade-in` - Fade in on load
- `animate-slide-up` - Slide up on load
- `animate-pulse` - Subtle pulse for loading states
- `animate-spin` - Rotation for spinners

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Responsive Patterns

#### Stack to Grid
```css
/* Mobile: stacked */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet+: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop+: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Hide/Show Patterns
```css
/* Mobile only */
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  .desktop-only {
    display: block;
  }
}
```

#### Responsive Typography
```css
/* Fluid typography using clamp */
h1 {
  font-size: clamp(1.875rem, 5vw, 2.25rem);
}
```

---

## Accessibility

### Color Contrast
- **Text on background**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio

### Focus States
```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip Links
```html
<a href="#main" class="skip-link">Skip to main content</a>
```

### ARIA Guidelines
- Proper heading hierarchy (h1 → h6)
- Form labels associated with inputs
- Button names that describe action
- Image alt text
- Landmark roles (nav, main, footer)

---

## Stitch Design System

### Creating the Design System
1. Go to: **https://studio.stitch.google.com/project/7432142644876282971**
2. Click **"Design Systems"** in left sidebar
3. Click **"Create Design System"**
4. Use the values below:

### Design System Values
| Property | Value |
|----------|-------|
| Display Name | Developer Portfolio |
| Color Mode | Dark |
| Primary Color | `#3b82f6` |
| Secondary Color | `#14b8a6` |
| Background | `#0f172a` |
| Font | Inter |
| Roundness | ROUND_EIGHT (8px) |

### Applying to Screens
1. Select all screens in the project
2. Click **"Apply Design System"**
3. Choose "Developer Portfolio"

### Generated Screens (10 total)
1. Software Developer Portfolio Landing Page
2. Projects Showcase
3. Get In Touch (Contact)
4. Services I Offer
5. About Me - Timothy DeHof (multiple versions)
6. Blog - The Kinetic Architect

---

## Implementation Notes

### Tailwind CSS
This design system uses Tailwind CSS v4 with CSS-first configuration. See `src/styles/index.css` for the complete theme configuration.

### Dark/Light Mode
- Theme persists in localStorage
- Respects system preference by default
- Toggle available in navbar

### Performance Considerations
- Inter font loaded from Google Fonts (subset: latin)
- Images optimized and lazy-loaded
- Animations disabled for `prefers-reduced-motion`

---

## File Structure
```
src/
├── styles/
│   └── index.css          # Theme configuration
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Home page sections
│   └── ...
└── ...
```

---

## Design History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-01 | Initial design document | Timothy DeHof |
| 2026-04-01 | Added Stitch design system section | OpenCode |

---

*Last updated: April 1, 2026*