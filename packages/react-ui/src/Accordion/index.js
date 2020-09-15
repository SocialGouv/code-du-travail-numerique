import PropTypes from "prop-types";
import React from "react";
import { AccordionItemHeading } from "react-accessible-accordion";
import styled from "styled-components";

import { ScreenReaderOnly } from "../ScreenReaderOnly";
import { breakpoints } from "../theme";
import { getTextFromComponent } from "../utils/getTextFromComponent";
import * as variants from "./components/variants";

export const Accordion = ({ items, noTitle, variant, ...props }) => {
  /* eslint-disable import/namespace */
  const AccordionVariant = variants[variant].Accordion;
  const AccordionItem = variants[variant].Item;
  const AccordionItemButton = variants[variant].ItemButton;
  const AccordionItemPanel = variants[variant].ItemPanel;
  /* eslint-enable */
  return (
    <AccordionVariant allowZeroExpanded allowMultipleExpanded {...props}>
      {items.map(({ body, icon, id, title }, index) => (
        <div id={id} key={`${id}-${index}`}>
          {typeof id !== "undefined" &&
            props.preExpanded.find((element) => element === id) && (
              <PushBelowHeader />
            )}
          <AccordionItem index={index} isLast={index === items.length - 1}>
            <AccordionItemHeading>
              <AccordionItemButton
                icon={icon}
                index={index}
                isLast={index === items.length - 1}
                noTitle={noTitle}
              >
                {getTextFromComponent(title)}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ScreenReaderOnly>{title}</ScreenReaderOnly>
              <AccordionItemPanelContent>{body}</AccordionItemPanelContent>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
      ))}
    </AccordionVariant>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      icon: PropTypes.elementType,
      id: PropTypes.string,
      title: PropTypes.node.isRequired,
    })
  ).isRequired,
  noTitle: PropTypes.bool,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["base", "tile", "hierarchy"]),
};

Accordion.defaultProps = {
  noTitle: false,
  preExpanded: [],
  variant: "base",
};

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

const AccordionItemPanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
