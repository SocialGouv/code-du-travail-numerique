import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import { theme, VerticalArrow, keyframes } from "@cdt/ui";

const { colors, spacing } = theme;
const { fadeIn } = keyframes;

class Accordion extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node.isRequired,
        body: PropTypes.node.isRequired
      })
    ).isRequired
  };
  render() {
    const { items, className } = this.props;

    return (
      <StyledAccordion className={className} accordion={false}>
        {items.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemTitle>
              <>
                {item.title}
                <VerticalArrow />
              </>
            </AccordionItemTitle>
            <AccordionItemBody>{item.body}</AccordionItemBody>
          </AccordionItem>
        ))}
      </StyledAccordion>
    );
  }
}

export default Accordion;

const StyledAccordion = styled(RootAccordion)`
  .accordion__item + .accordion__item {
    border-top: 1px solid ${colors.elementBorder};
  }

  .accordion__title {
    position: relative;
    padding-right: ${spacing.large};
    cursor: pointer;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: currentColor;
      font-weight: normal;
    }
  }

  .accordion__title:hover,
  .accordion__title:focus,
  .accordion__title:focus-within,
  .accordion__title[aria-expanded="true"] {
    color: ${colors.title};
  }

  .accordion__body {
    padding: ${spacing.base};
    animation: ${fadeIn} 0.35s ease-in;
  }

  .accordion__body--hidden {
    display: none;
  }
`;
