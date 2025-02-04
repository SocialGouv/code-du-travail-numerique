"use client";
import React, { ReactNode, useEffect, useRef } from "react";
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

export function ContributionGenericContent({
  contribution,
  alertText,
  relatedItems,
  displayGeneric,
}: Props) {
  const { title, metas } = contribution;
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollToTitle = () => {
    setTimeout(() => {
      titleRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (displayGeneric) {
      scrollToTitle();
    }
  }, [displayGeneric]);
  return (
    <>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-8",
            "fr-mb-md-0",
            "fr-mt-6w",
            "fr-p-0",
            !displayGeneric && "fr-hidden"
          )}
          id="cdt"
        >
          <p className={fr.cx("fr-h5")} ref={titleRef}>
            Que dit le code du travail&nbsp;?
          </p>
          {alertText}
          <ContributionContent contribution={contribution} titleLevel={2} />
          {contribution.references.length > 0 && (
            <Accordion label="Références" className={fr.cx("fr-mt-6w")}>
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
              <div className={fr.cx("fr-h5")}>Attention</div>
              <Html>{contribution.messageBlock}</Html>
            </div>
          )}
        </div>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-4",
            "fr-mt-6w",
            !displayGeneric && "fr-hidden"
          )}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metas.description} />
        </div>
      </div>
    </>
  );
}
