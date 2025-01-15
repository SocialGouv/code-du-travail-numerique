"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { Share } from "../common/Share";
import { EnterpriseAgreement } from "../enterprise";
import { ElasticSearchContributionGeneric } from "@socialgouv/cdtn-types";
import { ContributionContent } from "./ContributionContent";
import Html from "../common/Html";
import Link from "../common/Link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { ListWithArrow } from "../common/ListWithArrow";
import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";

type Props = {
  onDisplayClick: () => void;
  contribution: ElasticSearchContributionGeneric;
  alertText?: ReactNode;
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  displayGeneric: boolean;
};

export function ContributionGenericContent({
  contribution,
  onDisplayClick,
  alertText,
  relatedItems,
  displayGeneric,
}: Props) {
  const { title, metas } = contribution;
  const [displayContent, setDisplayContent] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollToTitle = () => {
    setTimeout(() => {
      titleRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  useEffect(() => {
    setDisplayContent(displayGeneric);
  }, [displayGeneric]);
  useEffect(() => {
    if (displayContent) {
      scrollToTitle();
    }
  }, [displayContent]);
  return (
    <>
      <Button
        className={fr.cx(
          !displayContent ? "fr-unhidden" : "fr-hidden",
          "fr-mt-2w",
          "fr-mb-6w"
        )}
        priority="tertiary no outline"
        onClick={() => {
          setDisplayContent(true);
          onDisplayClick();
        }}
      >
        Afficher les informations sans sélectionner une convention collective
      </Button>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-8",
            "fr-mb-md-0",
            "fr-mt-6w",
            displayContent ? "fr-unhidden" : "fr-hidden"
          )}
        >
          <div id="cdt">
            <p className={fr.cx("fr-h5")} ref={titleRef}>
              Que dit le code du travail&nbsp;?
            </p>
            {alertText}
            <ContributionContent
              contribution={contribution as ElasticSearchContributionGeneric}
              titleLevel={2}
            />
            {contribution.references.length && (
              <Accordion label="Références">
                <ListWithArrow
                  items={contribution.references.map(({ title, url }) => {
                    return (
                      <Link key={title} href={url ?? ""}>
                        {title}
                      </Link>
                    );
                  })}
                />
              </Accordion>
            )}
            {contribution.messageBlock && (
              <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mt-6w")}>
                <>
                  <div className={fr.cx("fr-h5")}>Attention</div>
                  <Html>{contribution.messageBlock}</Html>
                </>
              </div>
            )}
          </div>
        </div>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-4",
            "fr-mt-6w",
            displayContent ? "fr-unhidden" : "fr-hidden"
          )}
        >
          <div>
            <RelatedItems relatedItems={relatedItems} />
            <Share title={title} metaDescription={metas.description} />
          </div>
        </div>
      </div>
    </>
  );
}
