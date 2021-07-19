import { createGlobalStyle } from "styled-components";

import { spacings } from "../../theme.js";

export default createGlobalStyle`
  ul, ol {
    display: block;
    margin: ${spacings.small} 0;
    padding: 0 0 0 2rem;
  }
  ul {
    list-style-type: disc;
    ul {
      list-style-type: circle;
    }
  }
  ol {
    list-style-type: decimal;
    ol {
      list-style-type: upper-latin;
    }
  }
`;
