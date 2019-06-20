import styled from "styled-components";

import { theme } from "@cdt/ui";

const { box, colors, fonts, spacing } = theme;

export default styled.div`
  display: inline-block;
  margin: ${spacing.tiny};
  padding: ${spacing.tiny} ${spacing.small};
  color: ${colors.white};
  font-size: ${fonts.sizeXsmall};
  background-color: ${colors.blue};
  border-radius: ${box.borderRadius};
`;
