import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :focus {
    outline: 1px solid var(--color-outline);
    box-shadow: 0 0 0.15rem 0.15rem var(--color-focus-shadow);
  }
`;
