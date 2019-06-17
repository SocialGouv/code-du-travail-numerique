import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { spacing } = theme;

export default createGlobalStyle`
  ul,
  ol {
    padding-left: ${spacing.medium};
  }
`;
