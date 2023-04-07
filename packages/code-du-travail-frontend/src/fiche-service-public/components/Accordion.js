import { Accordion, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { getText } from "../utils.js";
import { ElementBuilder } from "./ElementBuilder.js";

const { spacings } = theme;

const isItemOfAccordion = (element) =>
  (element.name === "Chapitre" || element.name === "Cas") &&
  element.children &&
  element.children.find((child) => child.name === "Titre");

class AccordionWrapper extends React.PureComponent {
  render() {
    const { data, headingLevel } = this.props;
    const firstIndexOfAccordionItem =
      data.children.findIndex(isItemOfAccordion);
    const accordionItems = data.children
      .filter(isItemOfAccordion)
      .map((accordionItem) => {
        const title = getText(
          accordionItem.children.find((child) => child.name === "Titre")
        );
        const body = (
          <ElementBuilder
            data={accordionItem.children.filter(
              (child) => child.name !== "Titre"
            )}
            headingLevel={headingLevel + 1}
          />
        );
        return {
          body,
          title,
        };
      });

    const beforeAccordionElements = data.children
      .slice(0, firstIndexOfAccordionItem)
      .map((element, index) => (
        <ElementBuilder
          key={index}
          data={element}
          headingLevel={headingLevel}
        />
      ));

    const afterAccordionElements = data.children
      .slice(firstIndexOfAccordionItem + accordionItems.length)
      .map((element, index) => (
        <ElementBuilder
          key={index}
          data={element}
          headingLevel={headingLevel}
        />
      ));
    return (
      <>
        {beforeAccordionElements}
        {accordionItems.length > 0 && (
          <StyledAccordion
            items={accordionItems}
            titleLevel={headingLevel + 2}
          />
        )}
        {afterAccordionElements}
      </>
    );
  }
}

AccordionWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired,
};

export default AccordionWrapper;

const StyledAccordion = styled(Accordion)`
  margin-bottom: ${spacings.large};
`;
