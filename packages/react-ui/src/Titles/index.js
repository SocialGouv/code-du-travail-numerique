import styled from "styled-components";
import { fonts, spacings } from "../theme";

export const PageTitle = styled.h1`
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.large};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
`;
export const Title = styled.h2`
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
`;

export const Heading = styled.h3`
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
`;
