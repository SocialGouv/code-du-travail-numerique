import React from "react";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { ElementBuilder, FicheSPDataElement } from "./ElementBuilder";
import Title from "./Title";

export const Tabulator = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElement;
  headingLevel: number;
}) => (
  <Tabs
    tabs={data.children.map((tab: FicheSPDataElement) => {
        const title = getTitleInChildren(tab);
        return {
        label: <Title level={headingLevel}>{title}</Title>,
        content: (
          <ElementBuilder
            data={filterOutTitle(tab)}
            headingLevel={headingLevel + 1}
          />
        ),
      };
    })}
  />
);
export default Tabulator;
