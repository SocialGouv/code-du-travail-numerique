import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { colors } = theme;

export default createGlobalStyle`
  :focus {
    outline: 1px solid ${colors.focus};
    box-shadow: 0 0 0.15rem 0.15rem va${colors.focusShadow};
  }
`;
