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
    },
  },
  outdir: "styled-system",
  outExtension: "js",
});
