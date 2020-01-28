import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { AccordionItem, AccordionItemButton } from "react-accessible-accordion";

import { box, breakpoints, fonts, spacings } from "../../../theme";
import { VerticalArrow } from "../VerticalArrow";

const ITEM_SPACING = spacings.base;
const ITEM_SPACING_MOBILE = spacings.tiny;
export const NUMBER_WIDTH = "8.8rem";
export const MOBILE_NUMBER_WIDTH = "4.6rem";

// eslint-disable-next-line
export const HierarchyItem = styled(({ index, isLast, ...rest }) => (
  <AccordionItem {...rest} />
))`
  position: relative;
  ${({ index }) =>
    index > 0 &&
    css`
      margin-top: ${ITEM_SPACING};
    `}
  &:after {
    position: absolute;
    bottom: -1.4rem;
    left: calc(50% + ${NUMBER_WIDTH} / 2);
    z-index: 1;
    display: ${({ theme }) => (theme.noColors ? "none" : "block")};
    width: 0;
    height: 0;
    border-top: 1.5rem solid ${({ theme }) => theme.bgSecondary};
    border-right: 2.5rem solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 2.5rem solid transparent;
    transform: translateX(-1.5rem);
    content: "";
    user-select: none;
    ${({ isLast }) =>
      isLast &&
      css`
        display: none;
      `}
  }
  @media (max-width: ${breakpoints.mobile}) {
    ${({ index }) =>
      index > 0 &&
      css`
        margin-top: ${ITEM_SPACING_MOBILE};
      `}
    &:after {
      left: calc(50% + ${MOBILE_NUMBER_WIDTH} / 2);
    }
  }
`;

export const HierarchyButton = ({ children, icon: Icon, index, isLast }) => (
  <StyledAccordionItemButton>
    <NumberWrapper index={index} isLast={isLast}>
      <Number>{index + 1}</Number>
      <Decoration />
    </NumberWrapper>
    <ArrowBox index={index}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <ButtonText>{children}</ButtonText>
      <VerticalArrow />
    </ArrowBox>
  </StyledAccordionItemButton>
);

HierarchyButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired
};

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  cursor: pointer;
`;

const NumberWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  &:before {
    position: absolute;
    top: -${ITEM_SPACING};
    left: 2.3rem;
    z-index: -1;
    width: 3px;
    height: calc(${ITEM_SPACING} + 4.5rem);
    background-color: ${({ theme }) => theme.secondary};
    content: "";
    ${({ index }) =>
      index === 0 &&
      css`
        display: none;
      `}
  }
  &:after {
    position: absolute;
    top: 4rem;
    left: 2.3rem;
    z-index: -1;
    width: 3px;
    height: calc(100% - 4rem);
    background-color: ${({ theme }) => theme.secondary};
    content: "";
    ${({ isLast }) =>
      isLast &&
      css`
        display: none;
      `}
  }
  @media (max-width: ${breakpoints.mobile}) {
    &:before,
    &:after {
      left: 1.4rem;
    }
  }
`;

const Number = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  @media (max-width: ${breakpoints.mobile}) {
    width: 3rem;
    height: 3rem;
  }
`;

const Decoration = styled.div`
  position: relative;
  left: ${spacings.tiny};
  flex: 1 0 4rem;
  width: 4rem;
  height: 1px;
  background-color: ${({ theme }) => theme.secondary};
  &:before {
    position: absolute;
    top: -2.75rem;
    left: -2.8rem;
    z-index: -1;
    width: 2.8rem;
    height: 5.6rem;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-top-right-radius: 2.8rem;
    border-bottom-right-radius: 2.8rem;
    content: "";
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 1.6rem;
    width: 1.6rem;
    &:before {
      top: -1.9rem;
      left: -2rem;
      width: 2rem;
      height: 3.8rem;
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
  }
`;

const ArrowBox = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: ${spacings.xmedium};
  background-color: ${({ theme }) => theme.bgSecondary};
  border: ${({ theme }) =>
    box.border(theme.noColors ? theme.border : theme.bgSecondary)};
  border-radius: ${box.borderRadius};
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    border-bottom: 1px solid transparent;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.base};
  }
  &:before {
    position: absolute;
    top: -1px;
    left: 50%;
    z-index: 1;
    display: ${({ theme }) => (theme.noColors ? "none" : "block")};
    width: 0;
    height: 0;
    border-top: 1.5rem solid ${({ theme }) => theme.white};
    border-right: 2.5rem solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 2.5rem solid transparent;
    transform: translateX(-1.5rem);
    content: "";
    ${({ index }) =>
      index === 0 &&
      css`
        display: none;
      `}
  }
`;

const IconWrapper = styled.div`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  margin-right: ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    width: 3rem;
    height: 3rem;
    margin-right: ${spacings.small};
  }
`;

const ButtonText = styled.div`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
