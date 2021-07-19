import { createGlobalStyle } from "styled-components";

import { breakpoints, fonts, spacings } from "../../theme.js";

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${spacings.large};
    margin-bottom: ${spacings.medium};
    color: ${({ theme }) => theme.title};
    line-height: ${fonts.lineHeightTitle};
    @media (max-width: ${breakpoints.mobile}) {
      margin-top: ${spacings.medium};
      margin-bottom: ${spacings.small};
    }
  }
  h1, h2 {
    font-weight: normal;
    font-family: 'Merriweather', serif;
  }

  h1 {
    margin-top: 0;
    margin-bottom: ${spacings.xmedium};
    font-size: ${fonts.sizes.headings.large};
    @media (max-width: ${breakpoints.mobile}) {
      margin-bottom: ${spacings.base};
      font-size: ${fonts.sizes.headings.mobileMedium};
    }
  }

  h2 {
    font-size: ${fonts.sizes.headings.medium};
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.headings.xmedium};
    }
  }

  h3, h4, h5, h6 {
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
    font-family: "Open Sans", sans-serif;
    @media (max-width: ${breakpoints.mobile}) {
      font-size: ${fonts.sizes.default};
    }
  }
`;
