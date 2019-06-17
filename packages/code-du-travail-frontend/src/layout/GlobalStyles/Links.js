import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { colors } = theme;
export default createGlobalStyle`
  a,
  a:visited {
    text-decoration: underline;
    color: ${colors.blue};
  }

  a:focus,
  a:hover,
  a:active {
    text-decoration: none;
  }
`;
