export default {
  indexHtml: "doc/index.html",
  base: "https://socialgouv.github.io/code-du-travail-ui",
  dest: "./doc-build",
  //wrapper: "doc/wrapper.js",
  themeConfig: {
    mode: "light",
    codemirrorTheme: "docz-light",
    // logo: {
    //   src: null,
    //   width: null
    // },
    colors: {
      white: "#FFFFFF",
      grayExtraLight: "#EEF1F5",
      grayLight: "#CED4DE",
      gray: "#7D899C",
      grayDark: "#2D3747",
      grayExtraDark: "#1D2330",
      dark: "#13161F",
      blue: "#0B5FFF",
      skyBlue: "#1FB6FF"
      /** properties bellow depends on mode select */
      /*primary: colors.blue,
      text: colors.dark,
      link: colors.blue,
      footerText: colors.grayDark,
      sidebarBg: colors.grayExtraLight,
      sidebarText: colors.dark,
      background: colors.white,
      border: colors.grayLight,
      theadColor: colors.gray,
      theadBg: colors.grayExtraLight,
      tableColor: colors.dark,
      tooltipBg: colors.dark,
      tooltipColor: colors.grayExtraLight,
      codeBg: colors.grayExtraLight,
      codeColor: colors.gray,
      preBg: colors.grayExtraLight,
      blockquoteBg: colors.grayExtraLight,
      blockquoteBorder: colors.grayLight,
      blockquoteColor: colors.gray*/
    },
    styles: {
      // body: {
      //   // fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
      //   // fontSize: 16,
      //   // lineHeight: 1.6
      // },
      container: {
        width: 920,
        padding: ["20px 30px", "0 40px 40px"]
      }
    }
  }
};
