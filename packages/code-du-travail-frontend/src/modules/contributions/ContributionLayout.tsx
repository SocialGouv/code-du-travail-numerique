"use client";
import React, { useState } from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { sources } from "../documents";
import { Feedback } from "../layout/feedback";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { useContributionTracking } from "./tracking";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { isAgreementSupported, isAgreementValid } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { ContributionAgreementSelect } from "./ContributionAgreemeentSelect";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";
import { useLocalStorageForAgreement } from "../common/useLocalStorage";
import { SourceData } from "../layout/SourceData";

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

  return (
    <>
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
        {!isGeneric && (
          <span className={`fr-mt-4w ${h1Agreement}`}>
            {" "}
            {contribution.ccnShortTitle}
          </span>
        )}
      </h1>
      <p className={fr.cx("fr-mt-6w")}>
        {isFicheSP ? (
          <SourceData
            source={{ url: contribution.url, name: "Fiche service-public.fr" }}
            updatedAt={date}
          />
        ) : (
          <>Mis à jour le&nbsp;: {contribution.date}</>
        )}
      </p>
      {isGeneric ? (
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
            if (isAgreementSupported(contribution, agreement)) {
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
      ) : (
        <ContributionAgreementSelect contribution={contribution} />
      )}
      {isGeneric &&
        !isNoCDT &&
        !isAgreementValid(contribution, selectedAgreement) && (
          <ContributionGenericContent
            contribution={contribution}
            onDisplayClick={() => {
              emitClickP3(getTitle());
            }}
            relatedItems={relatedItems}
            displayGeneric={displayGeneric}
            alertText={
              !isAgreementSupported(contribution, selectedAgreement) && (
                <p>
                  <strong>
                    Cette réponse correspond à ce que prévoit le code du
                    travail, elle ne tient pas compte des spécificités de la{" "}
                    {selectedAgreement.shortTitle}
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
    </>
  );
}

const h1Agreement = css({
  display: "block",
  fontSize: "1rem",
  fontWeight: "normal",
  lineHeight: "normal",
});
