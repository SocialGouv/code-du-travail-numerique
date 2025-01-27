"use client";
import React, { useState } from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { getLabelBySource } from "@socialgouv/cdtn-utils";
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
import { A11yLink } from "../../common/A11yLink";
import { useLocalStorageForAgreement } from "../common/useLocalStorage";

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
  const { date, title, slug, isGeneric, isNoCDT, isFicheSP, relatedItems } =
    contribution;

  const [displayGeneric, setDisplayGeneric] = useState(false);
  const [selectedAgreement, setSelectedAgreement] =
    useLocalStorageForAgreement();
  const {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGeneralContent,
    emitDisplayGenericContent,
    emitClickP1,
    emitClickP2,
    emitClickP3,
  } = useContributionTracking();
  const updateDetail = isFicheSP ? (
    <p className={fr.cx("fr-mt-6w")}>
      {contribution.url && (
        <span>
          Source&nbsp;:{" "}
          <A11yLink
            href={contribution.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Fiche: ${getLabelBySource("fiches_service_public")}`}
          </A11yLink>
        </span>
      )}
      {contribution.url && contribution.date && (
        <span aria-hidden="true">&nbsp;-&nbsp;</span>
      )}
      {contribution.date && (
        <span>Mis à jour le&nbsp;: {contribution.date}</span>
      )}
    </p>
  ) : (
    <p className={fr.cx("fr-mt-6w")}>Mis à jour le&nbsp;: {date}</p>
  );
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
          {updateDetail}
          <ContributionGenericAgreementSearch
            contribution={contribution}
            onAgreementSelect={(agreement, mode) => {
              setSelectedAgreement(agreement);
              setDisplayGeneric(false);
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
                if (selectedAgreement) {
                  emitDisplayGenericContent(getTitle());
                } else {
                  emitDisplayGeneralContent(getTitle());
                }
              } else {
                emitDisplayAgreementContent(getTitle());
              }
            }}
            defaultAgreement={selectedAgreement}
          />
        </>
      ) : (
        <>
          {updateDetail}
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
          contribution={contribution}
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
  lineHeight: "normal",
});
