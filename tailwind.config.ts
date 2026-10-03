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
        sans: ["var(--font-assistant)", "sans-serif"],
        display: ["var(--font-frank)", "serif"],
      },
      fontSize: {
        display: [
          "clamp(2.4rem, 7.5vw, 4.6rem)",
          { lineHeight: "1.12", letterSpacing: "0.01em", fontWeight: "300" },
        ],
        h2: [
          "clamp(1.7rem, 4vw, 2.6rem)",
          { lineHeight: "1.25", letterSpacing: "0.01em", fontWeight: "300" },
        ],
        lead: ["1.3125rem", { lineHeight: "1.5", fontWeight: "400" }],
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
        shell: "28px",
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
