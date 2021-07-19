import PropTypes from "prop-types";
import React from "react";
import { AccordionItemHeading } from "react-accessible-accordion";
import styled from "styled-components";

import { ScreenReaderOnly } from "../ScreenReaderOnly/index.js";
import { getTextFromComponent } from "../utils/getTextFromComponent.js";
import * as variants from "./components/variants/index.js";

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
          <AccordionItem
            index={index}
            uuid={id}
            isLast={index === items.length - 1}
          >
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

const AccordionItemPanelContent = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
