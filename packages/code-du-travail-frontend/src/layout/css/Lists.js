import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { spacing } = theme;

export default createGlobalStyle`
  ul,
  ol {
    padding-left: ${spacing.medium};
  }
`;
