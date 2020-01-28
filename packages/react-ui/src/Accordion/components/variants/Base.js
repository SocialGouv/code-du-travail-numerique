import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { AccordionItem, AccordionItemButton } from "react-accessible-accordion";

import { box, breakpoints, fonts, spacings } from "../../../theme";
import { VerticalArrow } from "../VerticalArrow";

// eslint-disable-next-line
export const BaseItem = styled(({ isLast, ...rest }) => (
  <AccordionItem {...rest} />
))`
  position: relative;
  z-index: 1;
  ${({ index, theme }) =>
    index > 0 &&
    css`
      border-top: ${box.border(theme.border)};
    `}
`;

export const BaseButton = ({ children }) => (
  <StyledAccordionItemButton>
    <VerticalArrow />
    <ButtonText>{children}</ButtonText>
  </StyledAccordionItemButton>
);

BaseButton.propTypes = {
  children: PropTypes.node.isRequired
};

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;

const ButtonText = styled.div`
  margin: ${spacings.medium} 0 ${spacings.medium} ${spacings.small};
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
