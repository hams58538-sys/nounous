import type { Config } from "tailwindcss";

// Design tokens — derived from the Eden Agency flyer.
// Swap exact hex values here once real logo files are supplied; these are close reads of the source flyer.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eden: {
          green: "#0B3B2E",     // primary — headers, nav, footer, CTAs
          "green-light": "#12523F",
          gold: "#C9A227",      // accents, dividers, badge
          cream: "#FBF6EC",     // page background
          pink: "#E0447B",      // Nounous track
          blue: "#1D5FA8",      // Ménagères track
          ink: "#1A2420",       // body text
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        seal: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
