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
import { ContributionRating } from "./rating";
import { css } from "@styled-system/css";

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
        className={fr.cx("fr-col-12", "fr-col-lg-8", "fr-mb-6w", "fr-mb-md-0")}
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
                  <Link
                    key={title}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </Link>
                );
              })}
            />
          </Accordion>
        )}
        {contribution.messageBlock && (
          <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-6w")}>
            <>
              <h2 className={fr.cx("fr-h5")}>Attention</h2>
              <Html>{contribution.messageBlock}</Html>
            </>
          </div>
        )}
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4", "fr-p-md-3w")}>
        <p className={`${fr.cx("fr-mb-6w")} ${p}`}>
          <span
            className={`${fr.cx("ri-arrow-right-line")} ${css({
              color: "var(--artwork-minor-blue-cumulus)",
            })}`}
          />
          <span>
            Consultez les questions-réponses fréquentes pour la convention
            collective{" "}
            <Link href={`/convention-collective/${contribution.ccnSlug}`}>
              {contribution.ccnShortTitle}
            </Link>
          </span>
        </p>
        <ContributionRating contributionSlug={contribution.slug} />
        {relatedItems && <RelatedItems relatedItems={relatedItems} />}
        <Share title={title} metaDescription={metas.description} />
      </div>
    </div>
  );
}

const p = css({
  display: "flex",
  columnGap: ".5rem",
});
