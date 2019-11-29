import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { fonts } = theme;

export default createGlobalStyle`
  html {
    width: 100%;
    overflow-x: hidden;
    font-size: 62.5%;
    /* http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/ */
    line-height: ${fonts.lineHeight};
    text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom. */
    -webkit-font-smoothing: antialiased;
  }

  body {
    width: 100%;
    margin: 0;
    overflow-x: hidden;
    color: ${({ theme }) => theme.paragraph};
    font-size: ${fonts.sizes.default};
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${({ theme }) => theme.white};
    @media print {
      font-size: 10pt;
    }
  }

  main {
    /* https://stackoverflow.com/questions/35820429/main-element-not-working-in-internet-explorer-11 */
    display: block;
  }
`;
