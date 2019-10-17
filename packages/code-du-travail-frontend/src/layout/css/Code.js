import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { box, colors } = theme;

export default createGlobalStyle`
  code {
    padding: 2px;
    font-family: "Consolas", "Monaco", "Menlo", monospace;
    word-wrap: break-word;
    background: ${colors.lightBackground};
    border: ${box.border};
    border-radius: 2px;
  }
`;
