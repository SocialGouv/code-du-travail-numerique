import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui-old";

const { colors } = theme;

export default createGlobalStyle`
  hr {
    width: 100%;
    border: 1px solid ${colors.elementBorder};
    border-width: 1px 0 0 0;
  }
`;
