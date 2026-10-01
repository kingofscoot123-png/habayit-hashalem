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
        sans: ["var(--font-plex)", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 8vw, 4.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "500" },
        ],
        h2: [
          "clamp(1.75rem, 4.5vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" },
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
        shell: "32px",
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
