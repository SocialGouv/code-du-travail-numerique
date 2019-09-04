import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui-old";

const { colors } = theme;

export default createGlobalStyle`
  code {
    padding: 2px;
    border-radius: 2px;
    font-family: "Consolas", "Monaco", "Menlo", monospace;
    background: ${colors.elementBackground};
    border: 1px solid ${colors.elementBorder};
    word-wrap: break-word;
  }
`;
