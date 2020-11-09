import { theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

const { fonts, spacings } = theme;

export const Question = styled.div`
  margin-bottom: ${spacings.base};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;
