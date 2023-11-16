import { ElasticSearchContribution, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import References from "../common/References";

type Props = {
  references: ElasticSearchContribution["references"];
};

export const ReferencesJuridiques = (props: Props) => {
  if (props.references.length === 0) {
    return null;
  }
  const refs = props.references.flatMap(({ title, url }) => {
    return { title, type: SOURCES.EXTERNALS, url };
  });

  return <References label="Références" references={refs} accordionList="3" />;
};
