"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { useContributionTracking } from "./tracking";
import {
  buildContributionAgreementPath,
  isAgreementSupported,
  isAgreementValid,
} from "./contributionUtils";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { Contribution } from "./type";
import {
  useLocalStorageForAgreementOnPageLoad,
  getAgreementFromLocalStorage,
} from "../utils/useLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import {
  ContributionAfficherInfoVariations,
  getAfficherInfoVariantFlags,
} from "../config/abTests";

type Props = {
  contribution: Contribution;
};

const ALLOWED_VARIANTS = new Set<string>(
  Object.values(ContributionAfficherInfoVariations)
);

export function ContributionGeneric({ contribution }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  const getTitle = () => `/contribution/${slug}`;
  const { slug, isNoCDT, relatedItems } = contribution;
  // TEST scenario_a (DO NOT MERGE): variante figee en dur (au lieu de useABTestVariant)
  const matomoVariant = ContributionAfficherInfoVariations.ORIGINAL;
  const variantOverride = searchParams?.get("ab") ?? null;
  const variant =
    variantOverride && ALLOWED_VARIANTS.has(variantOverride)
      ? variantOverride
      : matomoVariant;
  const {
    isOriginal: isOriginalVariant,
    isRegularButton: isRegularButtonVariant,
  } = getAfficherInfoVariantFlags(variant);

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
  } = useContributionTracking(variant);
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
    if (isRegularButtonVariant) return;

    const storedAgreement = getAgreementFromLocalStorage();
    if (storedAgreement && isAgreementValid(contribution, storedAgreement)) {
      router.replace(buildContributionAgreementPath(slug, storedAgreement));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDisplayGenericButton =
    isOriginalVariant &&
    !isNoCDT &&
    !isAgreementValid(contribution, selectedAgreement) &&
    !displayGeneric;

  return (
    <>
      <ContributionGenericAgreementSearch
        personalizeTitleRef={personalizeTitleRef}
        contribution={contribution}
        onAgreementSelect={(agreement) => {
          setSelectedAgreement(agreement);
          if (!isRegularButtonVariant) {
            setDisplayGeneric(false);
          }
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
            }
          } else {
            if (isRegularButtonVariant) {
              setDisplayGeneric(true);
              scrollToTitle();
            }
            emitDisplayAgreementContent(getTitle());
          }
        }}
        selectedAgreement={selectedAgreement}
        trackingActionName={getTitle()}
        variant={variant}
      />

      {!isNoCDT &&
        (isRegularButtonVariant ||
          !isAgreementValid(contribution, selectedAgreement)) && (
          <>
            {showDisplayGenericButton && (
              <Button
                className={fr.cx("fr-mb-6w")}
                priority="tertiary no outline"
                onClick={() => {
                  setDisplayGeneric(true);
                  scrollToTitle();
                  emitClickP3(getTitle());
                  emitDisplayGenericContent(getTitle());
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
