"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource, SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
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

  const isArticleSource = (source: string) =>
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
                {items.map(({ slug, source, title, url }) => {
                  // if source is external we use url otherwise we assemble the route
                  const href =
                    source === SOURCES.EXTERNALS
                      ? url!! // There is always an url on an external content
                      : `/${getRouteBySource(source)}/${slug}`;
                  return (
                    <li key={href} className="fr-pb-2w">
                      <span
                        className={`${fr.cx("ri-arrow-right-line")} ${css({
                          color: "var(--artwork-minor-blue-cumulus)",
                        })}`}
                      />
                      <a
                        href={href}
                        onClick={() =>
                          matoSelectRelated(
                            "search",
                            // legacy : we do not include the leading '/' in the selection
                            source != SOURCES.EXTERNALS ? href!.slice(1) : href
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
