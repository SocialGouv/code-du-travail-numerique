import { createGlobalStyle } from "styled-components";

import { breakpoints, fonts } from "../../theme.js";

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
    color: ${({ theme }) => theme.paragraph};
    font-size: ${fonts.sizes.default};
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${({ theme }) => theme.white};
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.small};
    }
    @media print {
      font-size: 10pt;
    }
  }

  main {
    /* https://stackoverflow.com/questions/35820429/main-element-not-working-in-internet-explorer-11 */
    display: block;
  }
  :root {
    ${({ theme }) =>
      Object.entries(theme).reduce((accumulator, [key, value]) => {
        return (accumulator += `--color-${key}: ${value};
      `);
      }, "")};
  }
`;
