import { css } from "docz-plugin-css";

export default {
  codeSandbox: false,
  description: "Composants ReactJS du Code du travail numérique",
  files: "./src/**/*.{markdown,mdx}",
  indexHtml: "src/index.html",
  plugins: [css()],
  port: "6969",
  title: "UI Styleguide",
  themeConfig: {
    mode: "light"
  }
};
