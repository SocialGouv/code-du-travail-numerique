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
    {items.map(({ body, id, title }, index) => (
      <StyledAccordionItem uuid={id} key={index}>
        <AccordionItemHeading>
          <StyledAccordionItemButton>
            {title}
            <VerticalArrow />
          </StyledAccordionItemButton>
        </AccordionItemHeading>
        <StyledAccordionItemPanel>{body}</StyledAccordionItemPanel>
      </StyledAccordionItem>
    ))}
  </RootAccordion>
);

Accordion.propTypes = {
  className: PropTypes.string,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      id: PropTypes.string,
      title: PropTypes.node.isRequired
    })
  ).isRequired
};

Accordion.defaultProps = {
  preExpanded: []
};

const StyledAccordionItem = styled(AccordionItem)`
  & + & {
    border-top: ${box.border};
  }
`;

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
