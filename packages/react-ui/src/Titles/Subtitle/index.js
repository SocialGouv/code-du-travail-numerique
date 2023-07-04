import styled from "styled-components";

import { fonts, spacings } from "../../theme";

export const Subtitle = styled.p`
  display: block;
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.altText};

  a {
    color: ${({ theme }) => theme.altText};
  }

  font-weight: 600;
  font-size: ${fonts.sizes.tiny};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeight};
  text-transform: uppercase;
`;
