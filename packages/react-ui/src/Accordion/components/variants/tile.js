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
import { box, breakpoints, fonts, spacings } from "../../../theme.js";
import { VerticalArrow } from "../VerticalArrow/index.js";

export const Accordion = styled(RootAccordion)`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: calc(50% - (${spacings.medium} / 2));
    &:nth-child(odd) {
      margin-right: ${spacings.medium};
    }
  }
  @media (max-width: ${breakpoints.tablet}) {
    & > div {
      width: 100%;
      &:nth-child(odd) {
        margin-right: 0;
      }
    }
  }
`;

// eslint-disable-next-line
export const Item = styled(({ index, isLast, ...rest }) => (
  <AccordionItem {...rest} />
))`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.white};
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  ${({ index }) =>
    index > 1 &&
    css`
      margin-top: ${spacings.medium};
    `}
  @media (max-width: ${breakpoints.tablet}) {
    ${({ index }) =>
      index > 0 &&
      css`
        margin-top: ${spacings.medium};
      `}
  }
  @media (max-width: ${breakpoints.mobile}) {
    ${({ index }) =>
      index > 0 &&
      css`
        margin-top: ${spacings.small};
      `}
  }
`;

export const ItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.base};
  animation: ${fadeIn} 0.35s ease-in;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small};
  }
`;

export const ItemButton = ({ children, icon: Icon }) => (
  <StyledAccordionItemButton>
    <FlexContainer>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <ButtonText>{children}</ButtonText>
    </FlexContainer>
    <VerticalArrow aria-hidden="true" />
  </StyledAccordionItemButton>
);

ItemButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
};

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacings.xmedium};
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.base};
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  margin-right: ${spacings.medium};
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 50%;
`;

const ButtonText = styled.div`
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
