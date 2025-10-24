"use client";
import React, { useRef, useState, useEffect } from "react";
import { useContributionTracking } from "./tracking";
import { isAgreementSupported, isAgreementValid } from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import { useLocalStorageForAgreementOnPageLoad } from "../utils/useLocalStorage";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  contribution: Contribution;
};

export function ContributionGeneric({ contribution }: Props) {
  const [hash, setHash] = useState("");
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
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
  const genericTitleRef = useRef<HTMLDivElement>(null);

  const scrollToTitle = () => {
    setTimeout(() => {
      genericTitleRef?.current?.scrollIntoView({ behavior: "smooth" });
      genericTitleRef?.current?.focus();
    }, 100);
  };

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (hash === "#retour") {
      setTimeout(() => {
        personalizeTitleRef?.current?.focus();
      }, 100);
    }
  }, [hash]);

  return (
    <>
      <ContributionGenericAgreementSearch
        personalizeTitleRef={personalizeTitleRef}
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
        onDisplayClick={(isAgreementSelected) => {
          setDisplayGeneric(!displayGeneric);
          if (!isAgreementSelected) {
            setDisplayGeneric(true);
            scrollToTitle();
            if (selectedAgreement) {
              emitDisplayGeneralContent(getTitle());
            } else {
              emitDisplayGenericContent(getTitle());
            }
          } else {
            emitDisplayAgreementContent(getTitle());
          }
        }}
        selectedAgreement={selectedAgreement}
        trackingActionName={getTitle()}
      />

      {!isNoCDT && !isAgreementValid(contribution, selectedAgreement) && (
        <>
          {!displayGeneric && (
            <Button
              className={fr.cx("fr-mb-6w")}
              priority="tertiary no outline"
              onClick={() => {
                setDisplayGeneric(true);
                scrollToTitle();
                emitClickP3(getTitle());
              }}
            >
              Afficher les informations sans sélectionner une convention
              collective
            </Button>
          )}
          <ContributionGenericContent
            ref={genericTitleRef}
            contribution={contribution}
            relatedItems={relatedItems}
            displayGeneric={displayGeneric}
            alertText={
              selectedAgreement &&
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
        </>
      )}
    </>
  );
}
