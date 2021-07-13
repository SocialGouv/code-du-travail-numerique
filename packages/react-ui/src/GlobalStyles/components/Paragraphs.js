import { createGlobalStyle } from "styled-components";

import { spacings } from "../../theme.js";

export default createGlobalStyle`
  p {
    margin: ${spacings.base} 0;
  }
`;
