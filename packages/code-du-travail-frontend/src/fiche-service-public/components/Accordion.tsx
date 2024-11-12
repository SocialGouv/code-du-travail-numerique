import React from "react";

import { filterOutTitle, getTitleInChildren } from "../utils";
import { AccordionWithAnchor } from "../../modules/common/AccordionWithAnchor";
import {ElementBuilder, FicheSPData, FicheSPDataElement} from "./ElementBuilder";

const isItemOfAccordion = (element: FicheSPDataElement ) =>
  (element.name === "Chapitre" || element.name === "Cas") &&
  element.children &&
  element.children.find((child) => child.name === "Titre");

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
      const title = getTitleInChildren(accordionItem);
      const content = (
        <ElementBuilder
          data={filterOutTitle(accordionItem)}
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
          titleAs={("h" + (headingLevel + 2)) as "h2" |"h3" |"h4" |"h5" |"h6"}
        />
      )}
    </>
  );
};

export default AccordionWrapper;
