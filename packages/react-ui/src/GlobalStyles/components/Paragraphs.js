import { createGlobalStyle } from "styled-components";

import { spacings } from "../../theme";

export default createGlobalStyle`
  p {
    margin: ${spacings.base} 0;
  }
`;
