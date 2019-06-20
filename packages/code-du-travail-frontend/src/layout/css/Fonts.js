import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: "Muli";
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url("/static/assets/fonts/muli-latin-400.woff2") format("woff2"),
      url("/static/assets/fonts/muli-latin-400.woff") format("woff");
  }

  @font-face {
    font-family: "Muli";
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: url("/static/assets/fonts/muli-latin-700.woff2") format("woff2"),
      url("/static/assets/fonts/muli-latin-700.woff") format("woff");
  }
`;
