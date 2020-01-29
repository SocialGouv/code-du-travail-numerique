import { createGlobalStyle } from "styled-components";

import { spacings } from "../../theme";

export default createGlobalStyle`
  p {
    margin: ${spacings.xmedium} 0;
  }
`;
