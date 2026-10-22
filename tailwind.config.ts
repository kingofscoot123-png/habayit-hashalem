import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        "surface-deep": "var(--surface-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-inv": "var(--ink-inv)",
        accent: "var(--accent)",
        mint: "var(--mint)",
        brand: {
          dark: "#82152B",
          green: "#9E1B32",
          light: "#F5EBE0",
          cream: "#FAF3EA",
        },
        burgundy: {
          DEFAULT: "#82152B",
          deep: "#82152B",
          bright: "#9E1B32",
          wine: "#8B1E2B",
        },
        gold: "#C5A059",
        "brand-cream": "var(--brand-cream)",
        "brand-light": "var(--brand-light)",
        "brand-dark": "var(--brand-dark)",
        "brand-green": "var(--brand-green)",
      },
      fontFamily: {
        sans: [
          "General Sans",
          "Satoshi",
          "var(--font-assistant)",
          "Assistant",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        "helvetica-neue": [
          "General Sans",
          "var(--font-assistant)",
          "Assistant",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        playfair: ["Clash Display", "var(--font-heebo)", "Heebo", "sans-serif"],
        oswald: ["Clash Display", "var(--font-heebo)", "Heebo", "sans-serif"],
        montserrat: ["Clash Display", "var(--font-heebo)", "Heebo", "sans-serif"],
        "roboto-slab": ["Clash Display", "var(--font-heebo)", "Heebo", "sans-serif"],
        raleway: ["Clash Display", "var(--font-heebo)", "Heebo", "sans-serif"],
        display: ["Clash Display", "var(--font-heebo)", "Heebo", "Arial", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.4rem, 7vw, 4.2rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        h2: [
          "clamp(2rem, 5vw, 3.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        lead: ["1.3rem", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
      maxWidth: {
        measure: "68ch",
      },
      borderRadius: {
        button: "10px",
        media: "24px",
        frame: "28px",
        shell: "22px",
      },
      spacing: {
        section: "140px",
        "section-m": "88px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        io: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
