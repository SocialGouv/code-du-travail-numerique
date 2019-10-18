import styled from "styled-components";
import { colors, fonts, spacing } from "../theme";

export const PageTitle = styled.h1`
  margin: ${spacing.large} 0 ${spacing.large} 0;
  color: ${colors.blueDark};
  font-weight: normal;
  font-size: ${fonts.sizeH1};
  font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Arial, sans-serif;
  line-height: ${fonts.lineHeight};
`;
