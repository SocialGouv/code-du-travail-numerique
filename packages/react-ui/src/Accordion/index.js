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
import { box, spacings } from "../theme";
import { Heading } from "../Titles";
import { VerticalArrow } from "../VerticalArrow";
import { fadeIn } from "../keyframes";

export const Accordion = ({ items, ...props }) => (
  <RootAccordion allowZeroExpanded allowMultipleExpanded {...props}>
    {items.map(({ body, id, title, as }, index) => (
      <StyledAccordionItem uuid={id} key={index}>
        <AccordionItemHeading>
          <StyledAccordionItemButton>
            <StyledVerticalArrow />
            <StyledHeading as={as}>{title}</StyledHeading>
          </StyledAccordionItemButton>
        </AccordionItemHeading>
        <StyledAccordionItemPanel>{body}</StyledAccordionItemPanel>
      </StyledAccordionItem>
    ))}
  </RootAccordion>
);

Accordion.propTypes = {
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

const StyledHeading = styled(Heading)`
  margin: ${spacings.medium} 0;
  padding: 0;
`;
const StyledVerticalArrow = styled(VerticalArrow)`
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.base};
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
