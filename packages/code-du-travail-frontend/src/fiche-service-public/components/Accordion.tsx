import React from "react";

import { filterOutTitle, getInChildrenByName, getText } from "../utils";
import { AccordionWithAnchor } from "../../modules/common/AccordionWithAnchor";
import { ElementBuilder } from "./ElementBuilder";
import { getTitleLevel } from "./Title";
import { FicheSPDataChapitre } from "../type";
import SectionWithTitle from "./SectionWithTitle";

export const AccordionWrapper = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataChapitre;
  headingLevel: number;
}) => {
  if (headingLevel >= 2) {
    return <SectionWithTitle data={data} headingLevel={headingLevel} />;
  }

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
