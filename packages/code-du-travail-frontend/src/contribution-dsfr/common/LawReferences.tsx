import { ElasticSearchContribution, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import Card from "@codegouvfr/react-dsfr/Card";
import { fr } from "@codegouvfr/react-dsfr";

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
    <div className="fr-card fr-card--horizontal fr-card--grey" style={{marginBottom: fr.spacing("2w")}}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">Références</h3>
          <p className="fr-card__desc">
            <ul style={{ listStyle: "none" }}>
              {refs.flatMap((reference, index) => {
                if (
                  [SOURCES.CCN, SOURCES.CDT, SOURCES.EXTERNALS].includes(
                    reference.type
                  )
                ) {
                  return [
                    <li key={`ref-${index}`}>
                      <a
                        className="fr-link fr-icon-arrow-right-line fr-link--icon-left"
                        href={reference.url}
                        target="_blank"
                      >
                        {reference.title}
                      </a>
                    </li>,
                  ];
                }
                return [];
              })}
            </ul>
          </p>
        </div>
      </div>
    </div>
  ); // <References label="Références" references={refs} accordionList="3" />;
};
