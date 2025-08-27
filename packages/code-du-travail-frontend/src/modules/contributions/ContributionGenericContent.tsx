"use client";
import React, { forwardRef, ReactNode } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Share } from "../common/Share";
import { ContributionContent } from "./ContributionContent";
import Html from "../common/Html";
import Link from "../common/Link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { ListWithArrow } from "../common/ListWithArrow";
import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Contribution } from "./type";

type Props = {
  contribution: Contribution;
  alertText?: ReactNode;
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  displayGeneric: boolean;
};

export const ContributionGenericContent = forwardRef<
  HTMLParagraphElement,
  Props
>(({ contribution, alertText, relatedItems, displayGeneric }, ref) => {
  const { title, metas } = contribution;

  return (
    <>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-px-3v")}>
        <div
          tabIndex={-1}
          ref={ref}
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-8",
            "fr-mb-md-0",
            "fr-mt-2w",
            "fr-p-0",
            !displayGeneric && "fr-hidden"
          )}
          id="cdt"
        >
          {alertText}
          <ContributionContent contribution={contribution} titleLevel={2} />
          {contribution.references.length > 0 && (
            <Accordion
              label="Références"
              titleAs="h2"
              className={fr.cx("fr-mt-6w")}
            >
              <ListWithArrow
                items={contribution.references.map(({ title, url }) => {
                  return (
                    <Link key={title} href={url} target="_blank">
                      {title}
                    </Link>
                  );
                })}
              />
            </Accordion>
          )}
          {contribution.messageBlock && (
            <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mt-6w")}>
              <h2 className={fr.cx("fr-h5")}>Attention</h2>
              <Html>{contribution.messageBlock}</Html>
            </div>
          )}
        </div>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-4",
            "fr-mt-6w",
            "fr-p-md-3w",
            !displayGeneric && "fr-hidden"
          )}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metas.description} />
        </div>
      </div>
    </>
  );
});

ContributionGenericContent.displayName = "ContributionGenericContent";
