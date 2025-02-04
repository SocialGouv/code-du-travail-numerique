"use client";
import React, { useState } from "react";
import { useContributionTracking } from "./tracking";
import { isAgreementSupported, isAgreementValid } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import { useLocalStorageForAgreementOnPageLoad } from "../common/useLocalStorage";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

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
    emitClickP3,
  } = useContributionTracking();

  return (
    <>
      <ContributionGenericAgreementSearch
        contribution={contribution}
        onAgreementSelect={(agreement) => {
          setSelectedAgreement(agreement);
          setDisplayGeneric(false);
          if (!agreement) return;

          if (isAgreementSupported(contribution, agreement)) {
            emitAgreementTreatedEvent(agreement.num);
          } else {
            emitAgreementUntreatedEvent(agreement.num);
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
              emitDisplayGeneralContent(getTitle());
            } else {
              emitDisplayGenericContent(getTitle());
            }
          } else {
            emitDisplayAgreementContent(getTitle());
          }
        }}
        defaultAgreement={selectedAgreement}
        trackingActionName={getTitle()}
      />
      {!displayGeneric && (
        <Button
          className={fr.cx("fr-mb-6w")}
          priority="tertiary no outline"
          onClick={() => {
            setDisplayGeneric(true);
            emitClickP3(getTitle());
          }}
        >
          Afficher les informations sans sélectionner une convention collective
        </Button>
      )}
      {!isNoCDT && !isAgreementValid(contribution, selectedAgreement) && (
        <ContributionGenericContent
          contribution={contribution}
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
