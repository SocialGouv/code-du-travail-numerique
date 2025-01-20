"use client";
import React, { useState } from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { sources } from "../documents";
import { Feedback } from "../layout/feedback";
import { EnterpriseAgreement } from "../enterprise";
import { ElasticSearchContributionConventionnelle } from "@socialgouv/cdtn-types";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { useContributionTracking } from "./tracking";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { isAgreementValid, isCCSupported } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { ContributionAgreementSelect } from "./ContributionAgreemeentSelect";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";

type Props = {
  contribution: Contribution;
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
  const { date, title, slug, isGeneric, isNoCDT, relatedItems } = contribution;

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
            {contribution.ccnShortTitle}
          </span>
        )}
      </h1>

      {isGeneric ? (
        <>
          <p className={fr.cx("fr-mt-6w")}>Mis à jour le&nbsp;: {date}</p>
          <ContributionGenericAgreementSearch
            contribution={contribution}
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
              if (isCCSupported(contribution, agreement)) {
                emitAgreementTreatedEvent(agreement?.id);
              } else {
                emitAgreementUntreatedEvent(agreement?.id);
              }
            }}
            onDisplayClick={(ev) => {
              setDisplayGeneric(!displayGeneric);
              if (
                !isAgreementValid(contribution, selectedAgreement) ||
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
          <ContributionAgreementSelect contribution={contribution} />
        </>
      )}
      {isGeneric &&
        !isNoCDT &&
        (!selectedAgreement ||
          !isAgreementValid(contribution, selectedAgreement)) && (
          <ContributionGenericContent
            contribution={contribution}
            onDisplayClick={() => {
              emitClickP3(getTitle());
            }}
            relatedItems={relatedItems}
            displayGeneric={displayGeneric}
            alertText={
              selectedAgreement &&
              !isCCSupported(contribution, selectedAgreement) && (
                <p>
                  <strong>
                    Cette réponse correspond à ce que prévoit le code du
                    travail, elle ne tient pas compte des spécificités de la
                    convention collective Industrie du pétrole convention
                    collective {selectedAgreement.shortTitle}
                  </strong>
                </p>
              )
            }
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
        <Feedback />
      </div>
    </div>
  );
}

const h1Agreement = css({
  display: "block",
  fontSize: "1rem",
  fontWeight: "normal",
});
