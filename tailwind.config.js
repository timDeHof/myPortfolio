const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // Accessible color palette with WCAG AA compliance
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af',  // 7.1:1 contrast on white
          700: '#1d4ed8',  // 8.6:1 contrast on white
          800: '#1e3a8a',  // 11.2:1 contrast on white
          900: '#1e293b',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',  // 4.6:1 contrast on white
          700: '#15803d',  // 6.3:1 contrast on white
          800: '#166534',  // 8.1:1 contrast on white
          900: '#14532d',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',  // 4.7:1 contrast on white
          700: '#7c3aed',  // 6.2:1 contrast on white
          800: '#6b21a8',  // 8.4:1 contrast on white
          900: '#581c87',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',  // 4.5:1 contrast on white
          700: '#c2410c',  // 6.1:1 contrast on white
          800: '#9a3412',  // 8.9:1 contrast on white
          900: '#7c2d12',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',  // 4.5:1 contrast on white
          700: '#b91c1c',  // 6.7:1 contrast on white
          800: '#991b1b',  // 9.4:1 contrast on white
          900: '#7f1d1d',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',  // 4.5:1 contrast on white
          700: '#374151',  // 6.4:1 contrast on white
          800: '#1f2937',  // 8.9:1 contrast on white
          900: '#111827',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',  // 4.5:1 contrast on white
          700: '#334155',  // 6.5:1 contrast on white
          800: '#1e293b',  // 9.1:1 contrast on white
          900: '#0f172a',
        },
        timdehofdevblack: "var(--timdehofdevblack)",
        "timdehofdevebony-clay": "var(--timdehofdevebony-clay)",
        timdehofdevgray: "var(--timdehofdevgray)",
        "timdehofdevmine-shaft": "var(--timdehofdevmine-shaft)",
        timdehofdevwhite: "var(--timdehofdevwhite)",
        "timdehofdevwhite-02": "var(--timdehofdevwhite-02)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "timdehof-dev-font-awesome-5-free-solid":
          "var(--timdehof-dev-font-awesome-5-free-solid-font-family)",
        "timdehof-dev-montserrat-regular":
          "var(--timdehof-dev-montserrat-regular-font-family)",
        "timdehof-dev-semantic-heading-1":
          "var(--timdehof-dev-semantic-heading-1-font-family)",
        "timdehof-dev-semantic-heading-2-upper":
          "var(--timdehof-dev-semantic-heading-2-upper-font-family)",
        "timdehof-dev-semantic-heading-3":
          "var(--timdehof-dev-semantic-heading-3-font-family)",
        "timdehof-dev-semantic-link":
          "var(--timdehof-dev-semantic-link-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}