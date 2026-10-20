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
          dark: "#2d3a2e",
          green: "#3d5a3e",
          light: "#f5f3ef",
          cream: "#faf8f5",
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
          "var(--font-rubik)",
          "Helvetica Neue Light",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        "helvetica-neue": [
          "Helvetica Neue Light",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        oswald: ["var(--font-oswald)", "Oswald", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        "roboto-slab": ["var(--font-roboto-slab)", "Roboto Slab", "serif"],
        raleway: ["var(--font-raleway)", "Raleway", "sans-serif"],
        display: ["var(--font-frank)", "var(--font-playfair)", "Frank Ruhl Libre", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(2.2rem, 6.5vw, 4rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.7rem, 3.6vw, 2.5rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "700" },
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
