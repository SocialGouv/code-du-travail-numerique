"use client";
import React, { useState } from "react";
import { useContributionTracking } from "./tracking";
import { isAgreementSupported, isAgreementValid } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import { useLocalStorageForAgreementOnPageLoad } from "../common/useLocalStorage";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";

type Props = {
  contribution: Contribution;
};

export function ContributionGeneric({ contribution }: Props) {
  const getTitle = () => `/contribution/${slug}`;
  const { slug, isNoCDT, relatedItems } = contribution;

  const [displayGeneric, setDisplayGeneric] = useState(false);
  const [selectedAgreement, setSelectedAgreement] =
    useLocalStorageForAgreementOnPageLoad();
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
        trackingActionName={getTitle()}
      />

      {!isNoCDT && !isAgreementValid(contribution, selectedAgreement) && (
        <ContributionGenericContent
          contribution={contribution}
          onDisplayClick={() => {
            emitClickP3(getTitle());
          }}
          relatedItems={relatedItems}
          displayGeneric={displayGeneric}
          alertText={
            selectedAgreement &&
            !isAgreementSupported(contribution, selectedAgreement) && (
              <p>
                <strong>
                  Cette réponse correspond à ce que prévoit le code du travail,
                  elle ne tient pas compte des spécificités de la{" "}
                  {selectedAgreement.shortTitle}
                </strong>
              </p>
            )
          }
        />
      )}
    </>
  );
}
