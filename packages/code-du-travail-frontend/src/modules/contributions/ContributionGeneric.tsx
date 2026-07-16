"use client";
import React, { useRef, useState, useEffect } from "react";
import { useContributionTracking } from "./tracking";
import {
  GENERIC_CONTENT_HASH,
  isAgreementSupported,
  isAgreementValid,
} from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import {
  useLocalStorageForAgreementOnPageLoad,
  getAgreementFromLocalStorage,
} from "../utils/useLocalStorage";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";

type Props = {
  contribution: Contribution;
};

export function ContributionGeneric({ contribution }: Props) {
  const [hash, setHash] = useState("");
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  const getTitle = () => `/contribution/${slug}`;
  const { slug, isNoCDT, relatedItems } = contribution;

  const [displayGeneric, setDisplayGeneric] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState<AgreementRoute>();

  const [selectedAgreement, setSelectedAgreement] =
    useLocalStorageForAgreementOnPageLoad();
  const {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGenericContent,
    emitDisplayGeneralContent,
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
    if (window.location.hash !== GENERIC_CONTENT_HASH) return;
    // Arrivée depuis une page CC (option « je ne souhaite pas renseigner » ou
    // CC non traitée) : on affiche directement la réponse Code du travail en
    // conservant le choix de l'usager coché. Avec une CC en stockage (non
    // traitée), l'effet defaultAgreement du formulaire pré-coche la première
    // option et préremplit la CC ; sans CC, on pré-coche la dernière option.

    setDisplayGeneric(true);
    if (!getAgreementFromLocalStorage()) {
      setDefaultRoute("no-agreement");
    }
    scrollToTitle();
  }, []);

  useEffect(() => {
    if (hash === "#retour") {
      setTimeout(() => {
        personalizeTitleRef?.current?.scrollIntoView({ behavior: "smooth" });
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
          // Sélectionner une CC masque le Code du travail ; il est réaffiché au
          // besoin via « Afficher les informations ».
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
              // Aucune CC sélectionnée : l'usager affiche le Code du travail
              // (dernière option « Je ne souhaite pas renseigner… » ou entreprise
              // sans convention).
              emitDisplayGenericContent(getTitle());
            }
          } else {
            emitDisplayAgreementContent(getTitle());
          }
        }}
        selectedAgreement={selectedAgreement}
        trackingActionName={getTitle()}
        defaultRoute={defaultRoute}
      />

      {!isNoCDT && !isAgreementValid(contribution, selectedAgreement) && (
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
