import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { box, breakpoints, spacings } from "../theme";
import { Heading } from "../Titles/Heading";
import { VerticalArrow } from "../VerticalArrow";
import { fadeIn } from "../keyframes";

export const Accordion = ({ items, ...props }) => (
  <RootAccordion allowZeroExpanded allowMultipleExpanded {...props}>
    {items.map(({ body, id, title, as }, index) => {
      return (
        <div id={id} key={`${id}-${index}`}>
          {typeof id !== props.preExpanded && <PushBelowHeader />}
          <StyledAccordionItem uuid={id} index={index}>
            <AccordionItemHeading>
              <StyledAccordionItemButton>
                <StyledVerticalArrow />
                {typeof title === "string" ? (
                  <StyledHeading as={as}>{title}</StyledHeading>
                ) : (
                  <>{title}</>
                )}
              </StyledAccordionItemButton>
            </AccordionItemHeading>
            <StyledAccordionItemPanel>{body}</StyledAccordionItemPanel>
          </StyledAccordionItem>
        </div>
      );
    })}
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
  ${({ index, theme }) =>
    index > 0 &&
    css`
      border-top: ${box.border(theme.border)};
    `}
`;

// This prevents preOpened item to be hidden behind header
const PushBelowHeader = styled.div`
  margin-top: -11rem; /* Fixed header's negative height */
  padding-top: 11rem; /* Fixed header's height */
  visibility: hidden;
  pointer-events: none;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: -6rem;
    padding-top: 6rem;
  }
`;

const StyledHeading = styled(Heading)`
  margin: ${spacings.medium} 0;
  padding: 0;
`;
const StyledVerticalArrow = styled(VerticalArrow)`
  flex: 0 0 auto;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

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
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} 0;
  }
`;
