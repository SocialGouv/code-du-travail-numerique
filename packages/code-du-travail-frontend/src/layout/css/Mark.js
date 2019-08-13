import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { colors } = theme;

export default createGlobalStyle`
  mark {
    background: ${colors.markBackground};
  }
`;
