export default {
  // base: "/socialgouv/react-ui/",
  codeSandbox: false,
  description: "Composants ReactJS",
  files: "**/*.{markdown,mdx}",
  indexHtml: "src/index.html",
  plugins: [],
  port: "6969",
  title: "React UI",
  themeConfig: {
    mode: "light"
  },
  public: "./public",
  notUseSpecifiers: true,
  filterComponents: files =>
    files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath))
};
