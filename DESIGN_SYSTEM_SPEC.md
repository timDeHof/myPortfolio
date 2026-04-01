# Developer Portfolio Design System Specification

## Overview
This design system is tailored for a software developer portfolio website featuring a dark mode aesthetic with purple/teal accents.

---

## Theme Configuration

| Property | Value |
|----------|-------|
| Display Name | Developer Portfolio |
| Color Mode | Dark |
| Primary Color | `#3b82f6` (Blue 500) |
| Body Font | Inter |
| Headline Font | Inter |
| Label Font | Inter |
| Roundness | ROUND_EIGHT (8px) |
| Saturation | 3 (default) |

---

## Color Palette

### Light Mode
| Role | Color | HSL |
|------|-------|-----|
| Background | White | `0 0% 100%` |
| Foreground | Slate 900 | `222.2 84% 4.9%` |
| Muted | Slate 50 | `210 40% 98%` |
| Muted Foreground | Slate 500 | `215.4 16.3% 46.9%` |
| Primary | Purple 500 | `262.1 83.3% 57.8%` |
| Primary Foreground | White | `210 40% 98%` |
| Secondary | Teal 500 | `170 47% 65%` |
| Accent | Orange 400 | `35 65% 64%` |
| Border | Slate 200 | `214.3 31.8% 91.4%` |
| Ring | Purple 500 | `262.1 83.3% 57.8%` |
| Destructive | Red 500 | `0 84.2% 60.2%` |

### Dark Mode
| Role | Color | HSL |
|------|-------|-----|
| Background | Slate 700 | `229 25% 34%` |
| Foreground | Slate 300 | `227 34% 75%` |
| Muted | Slate 600 | `227 23% 44%` |
| Muted Foreground | Slate 400 | `227 31% 71%` |
| Primary | Purple 300 | `258 86% 79%` |
| Primary Foreground | Slate 700 | `229 25% 34%` |
| Secondary | Teal 400 | `170 47% 65%` |
| Accent | Orange 300 | `35 65% 64%` |
| Border | Slate 600 | `227 23% 44%` |
| Ring | Purple 300 | `258 86% 79%` |
| Destructive | Red 600 | `0 62.8% 30.6%` |

---

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI"

### Font Usage
- **Headlines**: Inter Bold (700)
- **Body**: Inter Regular (400)
- **Labels**: Inter Medium (500)

### Font Features
- `rlig` (Required Ligatures): 1
- `calt` (Contextual Alternates): 1

---

## Spacing Scale

| Token | Value |
|-------|-------|
| `--radius` | 0.5rem (8px) |
| `--radius-sm` | calc(var(--radius) - 4px) = 4px |
| `--radius-md` | calc(var(--radius) - 2px) = 6px |
| `--radius-lg` | var(--radius) = 8px |
| `--radius-xl` | calc(var(--radius) + 4px) = 12px |
| `--radius-2xl` | calc(var(--radius) + 8px) = 16px |
| `--radius-3xl` | calc(var(--radius) + 12px) = 20px |
| `--radius-4xl` | calc(var(--radius) + 16px) = 24px |

---

## Component Specifications

### Buttons
- **Base**: Flex, inline-flex, gap-2, rounded-md
- **Primary**: bg-primary, text-primary-foreground, shadow, hover:bg-primary/90
- **Sizes**: sm (h-8), default (h-9), lg (h-10), icon (h-9 w-9)

### Cards
- **Background**: hsl(var(--card))
- **Foreground**: hsl(var(--card-foreground))
- **Border**: 1px solid hsl(var(--border))
- **Radius**: var(--radius)

### Navbar
- **Position**: Fixed, top-0, left-0, right-0
- **Background**: bg-white/90 (light) / bg-gray-900/90 (dark)
- **Backdrop**: blur-md
- **Border**: bottom border
- **Height**: h-16 (64px)

### Footer
- **Background**: Gradient from-gray-900 via-slate-900 to-gray-900
- **Text**: White
- **Padding**: pt-16 pb-8

---

## Animations

### Transitions
- **Default**: `transition-colors duration-300`
- **Hover**: Various scale/translate transforms

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## How to Apply This Design System in Stitch

### Step 1: Create the Design System
1. Go to: **https://studio.stitch.google.com/project/7432142644876282971**
2. In the left sidebar, click **"Design Systems"**
3. Click **"Create Design System"**
4. Fill in the following values:
   - **Display Name**: `Developer Portfolio`
   - **Theme Settings**:
     - Color Mode: `Dark`
     - Primary Color: `#3b82f6` (Blue 500)
     - Secondary Color: `#14b8a6` (Teal 500)
     - Font: `Inter`
     - Roundness: `ROUND_EIGHT` (8px)

### Step 2: Apply to All Screens
Once created, you can apply the design system to all screens:

1. Select all 10 screens in the project:
   - Software Developer Portfolio Landing Page
   - Projects Showcase
   - Get In Touch
   - Services I Offer
   - About Me - Timothy DeHof (4 versions)
   - About Timothy DeHof
   - Blog - The Kinetic Architect

2. With screens selected, click **"Apply Design System"** in the toolbar
3. Select "Developer Portfolio" from the dropdown
4. Confirm to apply to all selected screens

### Step 3: Verify Consistency
After applying, check each screen for:
- Consistent blue (#3b82f6) primary buttons and accents
- Consistent teal (#14b8a6) secondary elements
- Inter font throughout
- 8px border radius on cards and buttons
- Dark background (#0f172a)

---

## File Reference

1. Open Google Stitch dashboard
2. Navigate to your project: **Software Developer Portfolio Landing Page**
3. Create new Design System with:
   - Display Name: `Developer Portfolio`
   - Theme Settings:
     - Color Mode: Dark
     - Primary Color: `#3b82f6`
     - Font: Inter
     - Roundness: 8px
4. Apply to screens for consistent styling

---

## File Reference
This specification is derived from:
- `src/styles/index.css` - Tailwind CSS theme configuration
- `package.json` - Dependencies (Inter font via Tailwind)

Last Updated: 2026-04-01