import { createGlobalStyle } from "styled-components";

import { spacings } from "../../theme";

export default createGlobalStyle`
  figure {
    margin: 0;
  }
  figcaption {
    margin-top: ${spacings.base}
  }
`;
