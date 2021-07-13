import styled from "styled-components";

import { breakpoints, fonts, spacings } from "../../theme.js";

export const InsertTitle = styled.div`
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeight};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
