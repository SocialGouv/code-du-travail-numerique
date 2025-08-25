"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { ContributionContent } from "./ContributionContent";
import Html from "../common/Html";
import Link from "../common/Link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { ListWithArrow } from "../common/ListWithArrow";
import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Share } from "../common/Share";
import { Contribution } from "./type";

type Props = {
  contribution: Contribution;
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
};

export function ContributionAgreementContent({
  contribution,
  relatedItems,
}: Props) {
  const { title, metas } = contribution;
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-6w")}>
      <div
        className={fr.cx("fr-col-12", "fr-col-md-8", "fr-mb-6w", "fr-mb-md-0")}
      >
        <ContributionContent contribution={contribution} titleLevel={2} />
        {contribution.references.length > 0 && (
          <Accordion
            label="Références"
            titleAs="h2"
            className={fr.cx("fr-mt-6w")}
          >
            <ListWithArrow
              items={contribution.references.map(({ title, url }) => {
                if (!url) return <></>;
                return (
                  <Link key={title} href={url} target="_blank">
                    {title}
                  </Link>
                );
              })}
            />
          </Accordion>
        )}
        <p className={fr.cx("fr-my-2w")}>
          Consultez les questions-réponses fréquentes pour la convention
          collective{" "}
          <Link href={`/convention-collective/${contribution.ccnSlug}`}>
            {contribution.ccnShortTitle}
          </Link>
        </p>
        {contribution.messageBlock && (
          <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-6w")}>
            <>
              <h3 className={fr.cx("fr-h5")}>Attention</h3>
              <Html>{contribution.messageBlock}</Html>
            </>
          </div>
        )}
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4", "fr-p-md-3w")}>
        {relatedItems && <RelatedItems relatedItems={relatedItems} />}
        <Share title={title} metaDescription={metas.description} />
      </div>
    </div>
  );
}
