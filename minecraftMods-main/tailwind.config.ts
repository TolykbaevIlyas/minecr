import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        accent: "var(--accent)",
        border: "var(--border)",
        blockbg: "var(--block-bg)",
        starring: "var(--starring)",
        inputfill: "var(--inputfill)",
        download: "var(--download)",
      },
    },
  },
  plugins: [],
} satisfies Config;
