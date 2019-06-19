import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { box, colors, spacing } from "../theme";
import VerticalArrow from "../VerticalArrow";
import { fadeIn } from "../keyframes";

class Accordion extends React.PureComponent {
  render() {
    const { items, ...props } = this.props;

    const StyledAccordionItem =
      items.length > 1
        ? StyledMultipleAccordionItem
        : StyledSingleAccordionItem;

    return (
      <RootAccordion accordion={false} {...props}>
        {items.map((item, index) => (
          <StyledAccordionItem key={index}>
            <StyledAccordionItemTitle>
              <>
                {item.title}
                <VerticalArrow />
              </>
            </StyledAccordionItemTitle>
            <StyledAccordionItemBody>{item.body}</StyledAccordionItemBody>
          </StyledAccordionItem>
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

const StyledAccordionItemTitle = styled(AccordionItemTitle)`
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

const StyledSingleAccordionItem = styled(StyledMultipleAccordionItem)`
  background-color: ${colors.lightBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  overflow: hidden;
  & ${StyledAccordionItemTitle} {
    padding-right: ${spacing.base};
  }
`;

const StyledAccordionItemBody = styled(AccordionItemBody)`
  padding: ${spacing.base};
  animation: ${fadeIn} 0.35s ease-in;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  &.accordion__body--hidden {
    display: none;
  }
`;
