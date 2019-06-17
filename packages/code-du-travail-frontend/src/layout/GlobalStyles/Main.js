import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { colors, fonts } = theme;

export default createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  html {
    font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    /* http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/ */
    line-height: ${fonts.lineHeight}
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom. */
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    color: ${colors.lightText};
    font-size: ${fonts.sizeBase};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background: ${colors.darkBackground};
    border-top: 5px solid ${colors.blue};
  }

  main {
    background: ${colors.lightBackground};
  }
`;
