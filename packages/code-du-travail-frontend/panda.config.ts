import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      // Valeurs issues de la doc DSFR : https://www.systeme-de-design.gouv.fr/fondamentaux/grille-et-points-de-rupture/
      breakpoints: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1248px",
        "2xl": "1536px",
      },
      keyframes: {
        // Salut de la main du widget NPS (cf. modules/nps/NpsHand.tsx).
        "nps-hand-wiggle": {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(14deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  globalCss: {
    ".fr-table__content table, .fr-table__content table *": {
      whiteSpace: "normal",
    },
  },
  outdir: "src/styled-system",
  outExtension: "js",
  importMap: "@styled-system",
});
