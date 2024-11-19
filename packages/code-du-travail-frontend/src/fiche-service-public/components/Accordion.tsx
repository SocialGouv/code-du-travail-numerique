import React from "react";

import {
  filterOutTitle,
  getInChildrenByName,
  getTitleInChildren,
} from "../utils";
import { AccordionWithAnchor } from "../../modules/common/AccordionWithAnchor";
import { ElementBuilder } from "./ElementBuilder";
import { getTitleLevel } from "./Title";
import {
  FicheSPDataBlocCas,
  FicheSPDataCas,
  FicheSPDataChapitre,
  FicheSPDataTexteChapitre,
} from "../type";

const isItemOfAccordion = (element: FicheSPDataChapitre | FicheSPDataCas) =>
  !!getInChildrenByName(element, "Titre");

export const AccordionWrapper = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataBlocCas | FicheSPDataTexteChapitre;
  headingLevel: number;
}) => {
  const accordionItems = data.children
    .filter(isItemOfAccordion)
    .map((accordionItem: FicheSPDataChapitre | FicheSPDataCas) => {
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
          titleAs={getTitleLevel(headingLevel)}
        />
      )}
    </>
  );
};

export default AccordionWrapper;
