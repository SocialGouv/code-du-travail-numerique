import React from "react";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { FicheSPDataBlocCas, FicheSPDataListeSituations } from "../type";

export const Tabulator = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataBlocCas | FicheSPDataListeSituations;
  headingLevel: number;
}) => (
  <Tabs
    className="fr-mb-2w"
    tabs={data.children.map((tab) => {
      const title = getTitleInChildren(tab);
      return {
        label: title,
        content: (
          <>
            <Title className={"fr-sr-only"} level={headingLevel}>
              {title}
            </Title>
            <ElementBuilder
              data={filterOutTitle(tab)}
              headingLevel={headingLevel + 1}
            />
          </>
        ),
      };
    })}
  />
);
export default Tabulator;
