"use client";
import React, { useRef, useState, useEffect } from "react";
import { useContributionTracking } from "./tracking";
import {
  buildContributionAgreementPath,
  hasVisitedCcPage,
  isAgreementSupported,
  isAgreementValid,
} from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import {
  useLocalStorageForAgreementOnPageLoad,
  getAgreementFromLocalStorage,
} from "../utils/useLocalStorage";
import { useRouter } from "next/navigation";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";

type Props = {
  contribution: Contribution;
};

export function ContributionGeneric({ contribution }: Props) {
  const router = useRouter();
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
    if (hash === "#retour") {
      setTimeout(() => {
        personalizeTitleRef?.current?.scrollIntoView({ behavior: "smooth" });
        personalizeTitleRef?.current?.focus();
      }, 100);
    }
  }, [hash]);

  useEffect(() => {
    if (window.location.hash === "#retour") return;
    // L'usager a déjà consulté la page CC de cette fiche : il est revenu
    // volontairement sur la générique (fil d'Ariane, « Modifier », lien). On ne
    // le renvoie pas vers la CC, sinon il ne peut jamais revenir en arrière.
    if (hasVisitedCcPage(slug)) return;

    const storedAgreement = getAgreementFromLocalStorage();
    if (storedAgreement && isAgreementValid(contribution, storedAgreement)) {
      router.replace(buildContributionAgreementPath(slug, storedAgreement));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
