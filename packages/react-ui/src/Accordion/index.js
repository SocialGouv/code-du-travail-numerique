import { AccordionItemHeading } from "@maxgfr/react-accessible-accordion";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Heading } from "../Titles/Heading";
import * as variants from "./components/variants/index.js";
import { VerticalArrow as AccordionArrow } from "./components/VerticalArrow";

export const Accordion = ({
  items,
  disableStyles,
  variant,
  titleLevel,
  ...props
}) => {
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
                disableStyles={disableStyles}
              >
                {titleLevel ? (
                  <Heading
                    as={"h" + titleLevel}
                    stripe="none"
                    style={{ margin: 0 }}
                  >
                    {title}
                  </Heading>
                ) : (
                  <p>{title}</p>
                )}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <AccordionItemPanelContent>{body}</AccordionItemPanelContent>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
      ))}
    </AccordionVariant>
  );
};

Accordion.propTypes = {
  disableStyles: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.node.isRequired,
      icon: PropTypes.elementType,
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  preExpanded: PropTypes.arrayOf(PropTypes.string),
  titleLevel: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["base", "tile", "hierarchy"]),
};

Accordion.defaultProps = {
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

export { AccordionArrow };
