"use client";
import React, { useState } from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { sources } from "../documents";
import { Feedback } from "../layout/feedback";
import { EnterpriseAgreement } from "../enterprise";
import {
  ContributionElasticDocument,
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { useContributionTracking } from "./tracking";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { isAgreementValid, isCCSupported } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { ContributionAgreementSelect } from "./ContributionAgreemeentSelect";
import { ContributionAgreementContent } from "./ContributionAgreementContent";

type Props = {
  contribution: ContributionElasticDocument;
};

export type RelatedItem = {
  title: string;
  items: {
    title: string;
    url: string;
    source: (typeof sources)[number];
  }[];
};

export function ContributionLayout({ contribution }: Props) {
  const getTitle = () => `/contribution/${slug}`;
  const { date, title, slug, idcc } = contribution;
  const isGeneric = idcc === "0000";
  const isNoCDT = contribution?.type === "generic-no-cdt";
  const relatedItems = [
    {
      title: "Articles liés",
      items: contribution.linkedContent.map((linked) => ({
        title: linked.title,
        url: linked.slug,
        source: linked.source as (typeof sources)[number],
      })),
    },
  ];

  const [displayGeneric, setDisplayGeneric] = useState(false);
  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  const {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGeneralContent,
    emitClickP1,
    emitClickP2,
    emitClickP3,
  } = useContributionTracking();
  return (
    <div>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={contribution.breadcrumbs.map((breadcrumb) => ({
          label: breadcrumb.label,
          linkProps: { href: breadcrumb.slug },
        }))}
      />
      <h1 className={fr.cx("fr-mb-0")}>
        {title}
        {!isGeneric && " "}
        {!isGeneric && (
          <span className={`fr-mt-4w ${h1Agreement}`}>
            {
              (contribution as ElasticSearchContributionConventionnelle)
                .ccnShortTitle
            }
          </span>
        )}
      </h1>

      {isGeneric ? (
        <>
          <p className={fr.cx("fr-mt-6w")}>Mis à jour le&nbsp;: {date}</p>
          <ContributionGenericAgreementSearch
            contribution={contribution as ElasticSearchContributionGeneric}
            onAgreementSelect={(agreement, mode) => {
              setSelectedAgreement(agreement);
              if (!agreement) return;
              switch (mode) {
                case "p1":
                  emitClickP1(getTitle());
                  break;
                case "p2":
                  emitClickP2(getTitle());
                  break;
              }
              if (
                isCCSupported(
                  contribution as ElasticSearchContributionGeneric,
                  agreement
                )
              ) {
                emitAgreementTreatedEvent(agreement?.id);
              } else {
                emitAgreementUntreatedEvent(agreement?.id);
              }
            }}
            onDisplayClick={(ev) => {
              setDisplayGeneric(!displayGeneric);
              if (
                !isAgreementValid(
                  contribution as ElasticSearchContributionGeneric,
                  selectedAgreement
                ) ||
                !selectedAgreement
              ) {
                ev.preventDefault();
                setDisplayGeneric(true);
                emitDisplayGeneralContent(getTitle());
              } else {
                emitDisplayAgreementContent(getTitle());
              }
            }}
          />
        </>
      ) : (
        <>
          <p className={fr.cx("fr-mt-2v")}>Mis à jour le&nbsp;: {date}</p>
          <ContributionAgreementSelect
            contribution={
              contribution as ElasticSearchContributionConventionnelle
            }
          />
        </>
      )}
      {isGeneric &&
        !isNoCDT &&
        (!selectedAgreement ||
          !isAgreementValid(
            contribution as ElasticSearchContributionGeneric,
            selectedAgreement
          )) && (
          <ContributionGenericContent
            contribution={contribution as ElasticSearchContributionGeneric}
            onDisplayClick={() => {
              emitClickP3(getTitle());
            }}
            relatedItems={relatedItems}
            displayGeneric={displayGeneric}
          />
        )}
      {!isGeneric && (
        <ContributionAgreementContent
          contribution={
            contribution as ElasticSearchContributionConventionnelle
          }
          relatedItems={relatedItems}
        />
      )}
      <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-my-6w")}>
        <Feedback></Feedback>
      </div>
    </div>
  );
}

const h1Agreement = css({
  display: "block",
  fontSize: "1rem",
  fontWeight: "normal",
});
