"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { push as matopush } from "@socialgouv/matomo-next";
import React from "react";
import { ListWithArrow } from "./ListWithArrow";

const matoSelectRelated = (selection) => {
  matopush([
    "trackEvent",
    "selectRelated",
    JSON.stringify({
      selection,
    }),
  ]);
};

export const RelatedItems = ({
  items = [],
}: {
  items: { slug?: string; source; title: string; url?: string }[];
}) => {
  if (items.length === 0) {
    return <></>;
  }

  const isArticleSource = (source) =>
    ![SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].includes(source);

  const relatedOtherItems = items
    .filter(({ source }) => !isArticleSource(source))
    .slice(0, 2);
  const relatedArticleItems = items
    .filter(({ source }) => isArticleSource(source))
    .slice(0, 6);

  const relatedGroups = [
    { items: relatedOtherItems, title: "Modèles et outils liés" },
    { items: relatedArticleItems, title: "Articles liés" },
  ];

  return (
    <div className={fr.cx("fr-mb-5w")}>
      {relatedGroups.map(
        ({ title, items }) =>
          items.length > 0 && (
            <div key={title}>
              <p className={fr.cx("fr-text--lead")}>
                <strong>{title}&nbsp;:</strong>
              </p>
              <ListWithArrow
                items={items.map(({ source, title, url }) => {
                  return (
                    <a
                      key={url}
                      href={url}
                      onClick={() =>
                        matoSelectRelated(
                          // legacy : we do not include the leading '/' in the selection
                          source != SOURCES.EXTERNALS ? url!.slice(1) : url
                        )
                      }
                    >
                      {title}
                    </a>
                  );
                })}
              />
            </div>
          )
      )}
    </div>
  );
};
