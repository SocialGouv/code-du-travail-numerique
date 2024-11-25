import React from "react";

import { filterOutTitle, getInChildrenByName, getText } from "../utils";
import { AccordionWithAnchor } from "../../modules/common/AccordionWithAnchor";
import { ElementBuilder } from "./ElementBuilder";
import { getTitleLevel } from "./Title";
import { FicheSPDataCas, FicheSPDataChapitre } from "../type";

export const AccordionWrapper = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataChapitre | FicheSPDataCas;
  headingLevel: number;
}) => {
  const title = getInChildrenByName(data, "Titre");
  if (!title) return <></>;
  return (
    <AccordionWithAnchor
      items={[
        {
          title: getText(title),
          content: (
            <ElementBuilder
              data={filterOutTitle(data)}
              headingLevel={headingLevel + 1}
            />
          ),
        },
      ]}
      titleAs={getTitleLevel(headingLevel)}
    />
  );
};

export default AccordionWrapper;
