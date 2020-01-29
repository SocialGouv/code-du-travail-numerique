import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItemButton,
  AccordionItem,
  AccordionItemPanel
} from "react-accessible-accordion";

import { animations, box, breakpoints, fonts, spacings } from "../../../theme";
import { fadeIn } from "../../../keyframes";
import { VerticalArrow } from "../VerticalArrow";

export const Accordion = RootAccordion;

// eslint-disable-next-line
export const Item = styled(({ isLast, ...rest }) => (
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

export const ItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.base};
  animation: ${fadeIn} ${animations.transitionTiming} ease-in;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} 0;
  }
`;

export const ItemButton = ({ children }) => (
  <StyledAccordionItemButton>
    <VerticalArrow />
    <ButtonText>{children}</ButtonText>
  </StyledAccordionItemButton>
);

ItemButton.propTypes = {
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
