import PropTypes from "prop-types";
import React from "react";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styled, { css } from "styled-components";

import { fadeIn } from "../../../keyframes.js";
import {
  animations,
  box,
  breakpoints,
  fonts,
  spacings,
} from "../../../theme.js";
import { VerticalArrow } from "../VerticalArrow/index.js";

export const Accordion = RootAccordion;

// eslint-disable-next-line
export const Item = styled(({ isLast, ...rest }) => {
  return <AccordionItem {...rest} />;
})`
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

export const ItemButton = ({ children, noTitle = false }) => (
  <StyledAccordionItemButton>
    <VerticalArrow aria-hidden="true" />
    <ButtonText noTitle={noTitle}>{children}</ButtonText>
  </StyledAccordionItemButton>
);

ItemButton.propTypes = {
  children: PropTypes.node.isRequired,
  noTitle: PropTypes.bool,
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

// eslint-disable-next-line no-unused-vars
const ButtonText = styled(({ noTitle, ...props }) => <div {...props} />)`
  margin: ${spacings.medium} 0 ${spacings.medium} ${spacings.small};
  color: ${({ theme }) => theme.title};
  ${({ noTitle }) =>
    !noTitle &&
    `
      font-weight: 600;
      font-size: ${fonts.sizes.headings.small};
  `}
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
