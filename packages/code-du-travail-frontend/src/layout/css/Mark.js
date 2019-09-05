import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui-old";

const { colors } = theme;

export default createGlobalStyle`
  mark {
    background: ${colors.markBackground};
  }
`;
