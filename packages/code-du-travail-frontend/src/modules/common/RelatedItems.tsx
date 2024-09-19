"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import { ListWithArrow } from "./ListWithArrow";
import { useCommonTracking } from "./tracking";

export const RelatedItems = ({
  items = [],
}: {
  items: { slug?: string; source; title: string; url?: string }[];
}) => {
  const { emitSelectRelated } = useCommonTracking();
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
                items={items.map(({ slug, source, title, url }) => {
                  // if source is external we use url otherwise we assemble the route
                  const href =
                    source === SOURCES.EXTERNALS
                      ? url
                      : `/${getRouteBySource(source)}/${slug}`;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={() =>
                        emitSelectRelated(
                          // legacy : we do not include the leading '/' in the selection
                          source != SOURCES.EXTERNALS ? href!.slice(1) : href
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
