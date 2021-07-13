import PropTypes from "prop-types";
import React from "react";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styled, { css } from "styled-components";

import { box, breakpoints, fonts, spacings } from "../../../theme.js";
import { VerticalArrow } from "../VerticalArrow/index.js";

const ITEM_SPACING = spacings.base;
const ITEM_SPACING_MOBILE = spacings.tiny;
const COUNTER_WIDTH = "8rem";
const COUNTER_WIDTH_MOBILE = "4.6rem";
const NUMBER_WIDTH = "4rem";
const STROKE_DISTANCE = "0.4rem"; // NUMBER_WIDTH / 10
const NUMBER_WIDTH_MOBILE = "3rem";
const STROKE_DISTANCE_MOBILE = "0.3rem"; // NUMBER_WIDTH_MOBILE / 10
const STROKE_WIDTH = "0.3rem";
const NARROW_STROKE_WIDTH = "0.1rem";

export const Accordion = RootAccordion;

// eslint-disable-next-line
export const Item = styled(({ index, isLast, ...rest }) => (
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
    left: calc(50% + ${COUNTER_WIDTH} / 2);
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
      left: calc(50% + ${COUNTER_WIDTH_MOBILE} / 2);
    }
  }
`;

export const ItemPanel = styled(AccordionItemPanel)`
  margin-left: ${COUNTER_WIDTH};
  padding: ${spacings.base};
  background-color: ${({ theme }) => theme.bgSecondary};
  border: ${({ theme }) =>
    box.border(theme.noColors ? theme.border : theme.bgSecondary)};
  border-top: transparent;
  border-radius: 0 0 ${box.borderRadius} ${box.borderRadius};
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: ${COUNTER_WIDTH_MOBILE};
  }
`;

export const ItemButton = ({ children, icon: Icon, index, isLast }) => (
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
      <VerticalArrow aria-hidden="true" />
    </ArrowBox>
  </StyledAccordionItemButton>
);

ItemButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
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
    left: calc(${NUMBER_WIDTH} / 2 - ${STROKE_WIDTH} / 2);
    z-index: -1;
    width: ${STROKE_WIDTH};
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
    left: calc(${NUMBER_WIDTH} / 2 - ${STROKE_WIDTH} / 2);
    z-index: -1;
    width: ${STROKE_WIDTH};
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
    &:before {
      top: -${ITEM_SPACING_MOBILE};
      height: calc(${ITEM_SPACING_MOBILE} + 5rem);
    }
    ,
    &:before,
    &:after {
      left: calc(${NUMBER_WIDTH_MOBILE} / 2 - ${STROKE_WIDTH} / 2);
    }
  }
`;

const Number = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: ${NUMBER_WIDTH};
  height: ${NUMBER_WIDTH};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  @media (max-width: ${breakpoints.mobile}) {
    width: ${NUMBER_WIDTH_MOBILE};
    height: ${NUMBER_WIDTH_MOBILE};
  }
`;

const decorationHelper = (COUNTER_WIDTH, NUMBER_WIDTH, STROKE_DISTANCE) => css`
  width: calc(${COUNTER_WIDTH} - ${NUMBER_WIDTH} - ${STROKE_DISTANCE});
  margin-left: ${STROKE_DISTANCE};
  &:before {
    top: calc(
      (${STROKE_DISTANCE} + ${NUMBER_WIDTH}) / -2 - 1.5 * ${NARROW_STROKE_WIDTH}
    );
    left: calc(-1 * ${STROKE_DISTANCE} - ${NUMBER_WIDTH} / 2);
    width: calc(${STROKE_DISTANCE} + ${NUMBER_WIDTH} / 2);
    height: calc((${STROKE_DISTANCE}) * 2 + ${NUMBER_WIDTH});
    border-top-right-radius: ${NUMBER_WIDTH};
    border-bottom-right-radius: ${NUMBER_WIDTH};
  }
`;

const Decoration = styled.div`
  position: relative;
  height: ${NARROW_STROKE_WIDTH};
  background-color: ${({ theme }) => theme.secondary};
  ${decorationHelper(COUNTER_WIDTH, NUMBER_WIDTH, STROKE_DISTANCE)}
  &:before {
    position: absolute;
    z-index: -1;
    background-color: transparent;
    border: ${NARROW_STROKE_WIDTH} solid ${({ theme }) => theme.secondary};
    content: "";
  }
  @media (max-width: ${breakpoints.mobile}) {
    ${decorationHelper(
      COUNTER_WIDTH_MOBILE,
      NUMBER_WIDTH_MOBILE,
      STROKE_DISTANCE_MOBILE
    )}
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
  width: 5.2rem;
  height: 5.2rem;
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
