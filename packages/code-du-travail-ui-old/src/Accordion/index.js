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
import { colors, spacing } from "../theme";
import VerticalArrow from "../VerticalArrow";
import { fadeIn } from "../keyframes";

class Accordion extends React.PureComponent {
  render() {
    const { items, ...props } = this.props;

    return (
      <RootAccordion allowZeroExpanded allowMultipleExpanded {...props}>
        {items.map((item, index) => (
          <StyledMultipleAccordionItem key={index}>
            <AccordionItemHeading>
              <StyledAccordionItemButton>
                {item.title}
                <VerticalArrow />
              </StyledAccordionItemButton>
            </AccordionItemHeading>
            <StyledAccordionItemPanel>{item.body}</StyledAccordionItemPanel>
          </StyledMultipleAccordionItem>
        ))}
      </RootAccordion>
    );
  }
}

Accordion.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      body: PropTypes.node.isRequired
    })
  ).isRequired
};

export default Accordion;

const StyledMultipleAccordionItem = styled(AccordionItem)`
  & + & {
    border-top: 1px solid ${colors.elementBorder};
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
    color: ${colors.title};
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
