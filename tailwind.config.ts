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
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "sans-serif"],
        display: ["var(--font-rubik)", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.2rem, 6.5vw, 4rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        h2: [
          "clamp(1.6rem, 3.6vw, 2.3rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        lead: ["1.25rem", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["1.0625rem", { lineHeight: "1.65", fontWeight: "400" }],
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
