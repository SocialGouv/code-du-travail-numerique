import React from "react";

import { filterOutTitle, getTitleInChildren } from "../utils";
import { AccordionWithAnchor } from "../../modules/common/AccordionWithAnchor";
import { ElementBuilder, FicheSPDataElement } from "./ElementBuilder";
import { getTitleLevel } from "./Title";

const isItemOfAccordion = (element: FicheSPDataElement) =>
  (element.name === "Chapitre" || element.name === "Cas") &&
  getTitleInChildren(element);

export const AccordionWrapper = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElement;
  headingLevel: number;
}) => {
  const accordionItems = data.children
    .filter(isItemOfAccordion)
    .map((accordionItem) => {
      const title = getTitleInChildren(accordionItem as FicheSPDataElement);
      const content = (
        <ElementBuilder
          data={filterOutTitle(accordionItem as FicheSPDataElement)}
          headingLevel={headingLevel + 1}
        />
      );
      return {
        content,
        title,
      };
    });

  return (
    <>
      {accordionItems.length > 0 && (
        <AccordionWithAnchor
          items={accordionItems}
          titleAs={getTitleLevel(headingLevel)}
        />
      )}
    </>
  );
};

export default AccordionWrapper;
