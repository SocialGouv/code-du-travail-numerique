import React from "react";

import { filterOutTitle, getInChildrenByName, getText } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { FicheSPDataChapitre, FicheSPDataWithElementChildren } from "../type";

export const SectionWithTitle = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataChapitre | FicheSPDataWithElementChildren;
  headingLevel: number;
}) => {
  const title = getInChildrenByName(data, "Titre");
  if (!title) return <></>;

  return (
    <>
      <Title level={headingLevel}>{getText(title)}</Title>
      <ElementBuilder
        data={filterOutTitle(data)}
        headingLevel={headingLevel + 1}
      />
    </>
  );
};

export default SectionWithTitle;
