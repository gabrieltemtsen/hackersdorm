import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // Mature, distinguished palette: Auric Cognac & Bronze Amber
        primary: {
          DEFAULT: "#D9822B", // Warm Cognac Bronze
          foreground: "#0B0C10",
          50: "#FCF8F2",
          100: "#F7EDDF",
          200: "#EDD3B5",
          300: "#E2B786",
          400: "#D9822B",
          500: "#C9701A",
          600: "#B05C11",
          700: "#8A450A",
        },
        bronze: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#F59E0B",
          500: "#D97706",
          600: "#B45309",
          700: "#92400E",
          800: "#78350F",
        },
        secondary: {
          DEFAULT: "#2DD4BF", // Mineral Sage Teal
          foreground: "#0B0C10",
        },
        accent: {
          DEFAULT: "#E5A93C", // Warm Auric Gold
          foreground: "#0B0C10",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#0B0C10",
        },
        // Warm Obsidian & Slate Titanium
        dark: {
          950: "#0A0B0E", // Obsidian Canvas
          900: "#111318", // Deep Surface
          850: "#161920", // Card Surface
          800: "#1E222B", // Elevated Surface
          750: "#262C38", // Subtle Dividers
          700: "#323A4A", // Visible Borders
          600: "#4B5568", // Muted elements
          500: "#6B7280", // Secondary text
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        heading: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 16s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
