import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { box, spacing } from "../theme";
import { VerticalArrow } from "../VerticalArrow";
import { fadeIn } from "../keyframes";

export const Accordion = ({ items, ...props }) => (
  <RootAccordion allowZeroExpanded allowMultipleExpanded {...props}>
    {items.map((item, index) => (
      <StyledAccordionItem key={index}>
        <AccordionItemHeading>
          <StyledAccordionItemButton>
            {item.title}
            <VerticalArrow />
          </StyledAccordionItemButton>
        </AccordionItemHeading>
        <StyledAccordionItemPanel>{item.body}</StyledAccordionItemPanel>
      </StyledAccordionItem>
    ))}
  </RootAccordion>
);

Accordion.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      body: PropTypes.node.isRequired
    })
  ).isRequired
};

const StyledAccordionItem = styled(AccordionItem)`
  & + & {
    border-top: ${box.border};
  }
`;

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.blueDark};
  }
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: ${spacing.base};
  animation: ${fadeIn} 0.35s ease-in;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  /* This might not work anymore */
  &.accordion__body--hidden {
    display: none;
  }
`;
