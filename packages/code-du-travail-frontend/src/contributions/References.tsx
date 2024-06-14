import { SOURCES } from "@socialgouv/cdtn-utils";
import { ElasticSearchContribution } from "@socialgouv/cdtn-types";
import React from "react";
import References from "../common/References";

type Props = {
  references: ElasticSearchContribution["references"];
};

export const ReferencesJuridiques = (props: Props) => {
  if (!props.references || props.references.length === 0) {
    return null;
  }
  const refs = props.references
    .map(({ title, url }) => {
      return { title, type: SOURCES.EXTERNALS, url };
    })
    .sort((a, b) => (a.url && !b.url ? -1 : !a.url && b.url ? 1 : 0));

  return <References label="Références" references={refs} accordionList="3" />;
};
