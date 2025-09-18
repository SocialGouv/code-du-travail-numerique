"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import { ListWithArrow } from "./ListWithArrow";
import { useCommonTracking } from "./tracking";
import { RelatedItem } from "../documents";
import { css } from "@styled-system/css";
import Link from "./Link";

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
    <div className={`${hideOnPrint}`}>
      {relatedItems.map(
        ({ title, items }) =>
          items.length > 0 && (
            <div key={title} className={fr.cx("fr-mb-5w")}>
              <div
                className={fr.cx("fr-mb-2w", "fr-text--lead")}
                role="heading"
                aria-level={2}
              >
                <strong>{title}&nbsp;:</strong>
              </div>
              <ListWithArrow
                items={items.map(({ source, title, url }) => {
                  return (
                    <Link
                      key={url}
                      href={url}
                      onClick={() =>
                        emitSelectRelated(
                          // legacy : we do not include the leading '/' in the selection
                          source != SOURCES.EXTERNALS ? url!.slice(1) : url
                        )
                      }
                    >
                      {title}
                    </Link>
                  );
                })}
              />
            </div>
          )
      )}
    </div>
  );
};

const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
});
