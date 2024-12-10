import React from "react";

import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import { getTitleLevel } from "./Title";
import { FicheSPDataChapitre, FicheSPDataTextWithChapitre } from "../type";
import SectionWithTitle from "./SectionWithTitle";
import { AccordionWithAnchor } from "../../../common/AccordionWithAnchor";

const formatAccordionItem = (
  data: FicheSPDataChapitre,
  headingLevel: number
) => {
  return {
    title: getTitleInChildren(data),
    content: (
      <ElementBuilder
        data={filterOutTitle(data)}
        headingLevel={headingLevel + 1}
      />
    ),
  };
};

const isItemOfAccordion = (element) =>
  element.name === "Chapitre" &&
  element.children.find((child) => child.name === "Titre");

export const AccordionWrapper = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataTextWithChapitre;
  headingLevel: number;
}) => {
  if (headingLevel >= 2) {
    return data.children.map((child) => (
      <SectionWithTitle
        data={child}
        headingLevel={headingLevel}
        key={child.name + headingLevel}
      />
    ));
  }
  const accordionItems = data.children
    .filter(isItemOfAccordion)
    .map((child) =>
      formatAccordionItem(child as FicheSPDataChapitre, headingLevel)
    );

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
