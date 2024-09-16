"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { push as matopush } from "@socialgouv/matomo-next";
import React from "react";
import { css } from "../../../styled-system/css";
import { RelatedItem } from "../../api/modules/related-items/type";

const matoSelectRelated = (reco, selection) => {
  matopush([
    "trackEvent",
    "selectRelated",
    JSON.stringify({
      reco,
      selection,
    }),
  ]);
};

type Props = {
  items: RelatedItem[];
};
export const RelatedItems = ({ items }: Props) => {
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
              <p className="fr-text--lead">{title}&nbsp;:</p>
              <ul className="list-style-none">
                {items.map(({ source, title, url }) => {
                  return (
                    <li key={url} className="fr-pb-2w">
                      <span
                        className={`${fr.cx("ri-arrow-right-line")} ${css({
                          color: "var(--artwork-minor-blue-cumulus)",
                        })}`}
                      />
                      <a
                        href={url}
                        onClick={() =>
                          matoSelectRelated(
                            "search",
                            // legacy : we do not include the leading '/' in the selection
                            source != SOURCES.EXTERNALS ? url!.slice(1) : url
                          )
                        }
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
      )}
    </div>
  );
};
