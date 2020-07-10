import { theme } from "@socialgouv/cdtn-react-ui";
import styled from "styled-components";

const { breakpoints, fonts, colors, spacings } = theme;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: 2em;
  padding: 0;
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction === "row" ? "row" : "column")};
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: ${spacings.medium};
`;

export const SectionTitle = styled.h2`
  margin-top: ${spacings.large};
  margin-bottom: ${spacings.medium};
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
`;

export const Highlight = styled.strong`
  color: ${colors.primary};
  font-weight: 700;
  font-size: ${fonts.sizes.headings.small};
  white-space: pre-line;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;

export const SmallText = styled.p`
  color: ${colors.paragraph};
  font-size: ${fonts.sizes.small};
  font-style: italic;
`;
