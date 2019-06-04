import { css } from "docz-plugin-css";

export default {
  base: "/code-du-travail-numerique/",
  codeSandbox: false,
  description: "Composants ReactJS du Code du travail numérique",
  src: "./src",
  files: "**/*.{markdown,mdx}",
  indexHtml: "src/index.html",
  plugins: [css()],
  port: "6969",
  title: "UI Styleguide",
  themeConfig: {
    mode: "light"
  },
  public: "./public"
};
