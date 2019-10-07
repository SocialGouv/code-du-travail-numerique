import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui-old";

const { box, colors } = theme;

export default createGlobalStyle`
  code {
    padding: 2px;
    border-radius: 2px;
    font-family: "Consolas", "Monaco", "Menlo", monospace;
    background: ${colors.lightBackground};
    border: ${box.border};
    word-wrap: break-word;
  }
`;
