"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import { ListWithArrow } from "./ListWithArrow";
import { useCommonTracking } from "./tracking";
import { RelatedItem } from "../documents";

export const RelatedItems = ({
  relatedItems = [],
}: {
  relatedItems: { items: RelatedItem[]; title: string }[];
}) => {
  const { emitSelectRelated } = useCommonTracking();
  if (relatedItems.length === 0) {
    return <></>;
  }

  return (
    <div className={fr.cx("fr-mb-5w")}>
      {relatedItems.map(
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
                        emitSelectRelated(
                          // legacy : we do not include the leading '/' in the selection
                          source != SOURCES.EXTERNALS ? url!.slice(1) : url,
                        )
                      }
                    >
                      {title}
                    </a>
                  );
                })}
              />
            </div>
          ),
      )}
    </div>
  );
};
