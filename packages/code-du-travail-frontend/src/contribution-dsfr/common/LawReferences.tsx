import { ElasticSearchContribution, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import Card from "@codegouvfr/react-dsfr/Card";

type Props = {
  references: ElasticSearchContribution["references"];
};

export const LawReferences = ({ references }: Props) => {
  if (!references || references.length === 0) {
    return null;
  }
  const refs = references
    .map(({ title, url }) => {
      return { title, type: SOURCES.EXTERNALS, url };
    })
    .sort((a, b) => (a.url && !b.url ? -1 : !a.url && b.url ? 1 : 0));

  return (
    <Card
      border
      desc={
        <ul>
          {refs.flatMap((reference, index) => {
            if (
              [SOURCES.CCN, SOURCES.CDT, SOURCES.EXTERNALS].includes(
                reference.type
              )
            ) {
              return [<li key={`ref-${index}`}>{reference.title}</li>];
            }
            return [];
          })}
        </ul>
      }
      horizontal
      size="large"
      title="Références"
      titleAs="h3"
    />
  ); // <References label="Références" references={refs} accordionList="3" />;
};
