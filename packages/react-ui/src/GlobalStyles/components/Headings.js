import { createGlobalStyle } from "styled-components";

import { breakpoints, fonts, spacings } from "../../theme";

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 ${spacings.small} 0;
    color: ${({ theme }) => theme.title};
    line-height: ${fonts.lineHeightTitle};
  }
  h1 {
    font-weight: normal;
    font-size: ${fonts.sizes.headings.large};
    font-family: 'Merriweather', serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.headings.medium};
    }
  }

  h2 {
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.headings.xmedium};
    }
  }

  h2, h3 {
    font-weight: normal;
    font-size: ${fonts.sizes.headings.medium};
    font-family: 'Merriweather', serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.headings.small};
    }
  }
  h4, h5, h6 {
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
    font-family: "Open Sans", sans-serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.headings.default};
    }
  }
`;
