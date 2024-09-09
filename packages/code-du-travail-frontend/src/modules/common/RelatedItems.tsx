"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { push as matopush } from "@socialgouv/matomo-next";
import React from "react";
import { css } from "../../../styled-system/css";

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

export const RelatedItems = ({
  items = [],
}: {
  items: { slug?: string; source; title: string; reco; url?: string }[];
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
              <p className="fr-text--lead">{title}&nbsp;:</p>
              <ul className="list-style-none">
                {items.map(({ slug, source, title, reco, url }) => {
                  // if source is external we use url otherwise we assemble the route
                  const href =
                    source === SOURCES.EXTERNALS
                      ? url
                      : `/${getRouteBySource(source)}/${slug}`;
                  return (
                    <li key={href} className="fr-pb-2w">
                      <i
                        className={`${fr.cx("ri-arrow-right-line")} ${css({
                          color: "var(--artwork-minor-blue-cumulus)",
                        })}`}
                      />
                      <a
                        href={href}
                        onClick={() =>
                          matoSelectRelated(
                            reco,
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
