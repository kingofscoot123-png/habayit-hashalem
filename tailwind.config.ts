import type { Config } from "tailwindcss";

const hebrewSans = [
  "Satoshi",
  "var(--font-assistant)",
  "Assistant",
  "General Sans",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
] as const;

const hebrewDisplay = [
  "Clash Display",
  "var(--font-heebo)",
  "Heebo",
  "Arial",
  "sans-serif",
] as const;

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
        champagne: "#D4B483",
        espresso: "#1F1714",
        stone: "#6E5846",
        bronze: "#B38038",
        olive: "#4A5D4E",
        "brand-cream": "var(--brand-cream)",
        "brand-light": "var(--brand-light)",
        "brand-dark": "var(--brand-dark)",
        "brand-green": "var(--brand-green)",
      },
      fontFamily: {
        sans: [...hebrewSans],
        "helvetica-neue": [...hebrewSans],
        playfair: [...hebrewDisplay],
        oswald: [...hebrewDisplay],
        montserrat: [...hebrewDisplay],
        "roboto-slab": [...hebrewDisplay],
        raleway: [...hebrewDisplay],
        display: [...hebrewDisplay],
      },
      fontSize: {
        display: [
          "clamp(2.55rem, 7vw, 4.4rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        h2: [
          "clamp(2.15rem, 5.2vw, 3.45rem)",
          { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        lead: ["1.4rem", { lineHeight: "1.55", fontWeight: "600" }],
        body: ["1.2rem", { lineHeight: "1.75", fontWeight: "500" }],
        caption: ["1.05rem", { lineHeight: "1.45", fontWeight: "600" }],
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
      animation: {
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
