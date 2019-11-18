import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { colors, fonts } = theme;

export default createGlobalStyle`
  html {
    font-size: 62.5%;
    /* http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/ */
    line-height: ${fonts.lineHeight};
    text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom. */
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    color: ${colors.paragraph};
    font-size: ${fonts.sizes.default};
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    @media print {
      font-size: 10pt;
    }
  }

  main {
    /* https://stackoverflow.com/questions/35820429/main-element-not-working-in-internet-explorer-11 */
    display: block;
  }
`;
