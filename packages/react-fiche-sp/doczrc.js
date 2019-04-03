import { css } from "docz-plugin-css";

export default {
  codeSandbox: false,
  description: "Fiche Service Public en React",
  files: "./src/**/*.{md,markdown,mdx}",
  indexHtml: "src/index.html",
  plugins: [css()],
  port: "6969",
  title: "react-fiche-sp",
  themeConfig: {
    mode: "light"
  }
};
