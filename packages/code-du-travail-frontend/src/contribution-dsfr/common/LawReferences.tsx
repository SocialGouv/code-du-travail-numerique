import { ElasticSearchContribution, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";

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

  if (refs.length > 3) {
    return (
      <section className="fr-accordion  fr-mt-4w fr-mb-4w" style={{
        boxShadow: "inset 1px 1px 1px 1px var(--border-default-grey), 1px 1px 1px 1px var(--border-default-grey)"
      }}>
        <h3 className="fr-accordion__title">
          <button
            className="fr-accordion__btn"
            style={{border: 1}}
            aria-expanded="false"
            aria-controls="accordion-106"
          >
            Références
          </button>
        </h3>
        <div className="fr-collapse" id="accordion-106">
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
        </div>
      </section>
    );
  }
  return (
    <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-4w fr-mb-4w">
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
