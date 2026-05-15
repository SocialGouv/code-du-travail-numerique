"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";
import { useRouter } from "next/navigation";

import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import {
  isAgreementSupported,
  isAgreementUnextended,
  isAgreementValid,
} from "./contributionUtils";
import { Contribution } from "./type";
import Link from "../common/Link";
import BlueCard from "../common/BlueCard";
import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";
import { ContributionAfficherInfoVariations } from "../config/abTests";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
  personalizeTitleRef: React.RefObject<HTMLParagraphElement | null>;
  variant?: string | null;
};

const MISSING_ROUTE_ERROR =
  "Veuillez sélectionner l'une des options ci-dessus pour afficher les informations.";

const LEARN_MORE_URL =
  "https://code-du-travail-numerique-preprod.ovh.fabrique.social.gouv.fr/droit-du-travail";

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
  personalizeTitleRef,
  variant,
}: Props) {
  const router = useRouter();
  const { slug, isNoCDT } = contribution;
  const [isValid, setIsValid] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();
  const [showMissingRouteError, setShowMissingRouteError] = useState(false);

  const isOriginalVariant =
    variant === ContributionAfficherInfoVariations.ORIGINAL;

  useEffect(() => {
    setIsValid(isAgreementValid(contribution, selectedAgreement));
  }, [selectedAgreement]);

  const selectedAgreementAlert = (agreement: Agreement) => {
    const isSupported = isAgreementSupported(contribution, agreement);
    const isUnextended = isAgreementUnextended(contribution, agreement);
    if (isNoCDT) {
      if (isUnextended && agreement.url)
        return (
          <>
            Les dispositions de cette convention n’ont pas été étendues. Cela
            signifie qu&apos;elles ne s&apos;appliquent qu&apos;aux entreprises
            adhérentes à l&apos;une des organisations signataires de
            l&apos;accord. Dans ce contexte, nous ne sommes pas en mesure
            d&apos;identifier si cette règle s&apos;applique ou non au sein de
            votre entreprise. Vous pouvez toutefois consulter la convention
            collective{" "}
            <Link
              target="_blank"
              href={agreement.url}
              rel="noopener noreferrer"
              title="Lien vers la convention collective"
            >
              ici
            </Link>{" "}
            dans le cas où elle s&apos;applique à votre situation.
          </>
        );
      if (!isSupported && agreement.url)
        return (
          <>
            Nous vous invitons à consulter votre convention collective qui peut
            prévoir une réponse. Vous pouvez consulter votre convention
            collective{" "}
            <Link
              target="_blank"
              href={agreement.url}
              rel="noopener noreferrer"
              title="Lien vers la convention collective"
            >
              ici
            </Link>
            .
            <br />
            {contribution.messageBlockGenericNoCDT}
          </>
        );
    }
    if (!isSupported)
      return <>Vous pouvez consulter les informations générales ci-dessous.</>;
  };

  const noAgreementBanner = (
    <AccessibleAlert
      title="Information"
      description={
        <p>
          Vous pouvez ignorer cette étape et poursuivre pour afficher les
          informations générales. Nous vous recommandons toutefois de renseigner
          votre convention collective, qui peut prévoir un résultat plus
          favorable que celui défini par le Code du travail.
        </p>
      }
      severity="info"
      className={["fr-mt-2w"]}
      data-testid="no-agreement-banner"
    />
  );

  const isButtonDisplayed = (isNoCDT && isValid) || !isNoCDT;

  return (
    <BlueCard>
      <div className={fr.cx("fr-grid-row")}>
        <Image
          priority
          src={AgreementSearch}
          alt=""
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <p
          ref={personalizeTitleRef}
          id="personalize-response-title"
          className={fr.cx("fr-h3", "fr-mt-1w")}
          role="heading"
          aria-level={2}
          tabIndex={-1}
        >
          Personnalisez la réponse avec votre convention collective
        </p>
      </div>
      <p className={fr.cx("fr-text--sm", "fr-mb-2w")}>
        La convention collective prévoit des règles spécifiques à votre secteur
        d&apos;activité, qui peuvent être plus avantageuses que le Code du
        travail.{" "}
        <Link
          href={LEARN_MORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="En savoir plus sur les conventions collectives (nouvelle fenêtre)"
        >
          En savoir plus
        </Link>
        .
      </p>
      <div>
        <AgreementSearchForm
          onAgreementSelect={onAgreementSelect}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={selectedAgreement}
          trackingActionName={trackingActionName}
          level={3}
          onBackToPersonalize={() => {
            const personalizeTitle = document.getElementById(
              "personalize-response-title"
            );
            personalizeTitle?.focus();
          }}
          showNoAgreementOption={!isNoCDT && !isOriginalVariant}
          noAgreementContent={!isOriginalVariant ? noAgreementBanner : undefined}
          onRouteChange={(route) => {
            setSelectedRoute(route);
            setShowMissingRouteError(false);
          }}
          error={showMissingRouteError ? MISSING_ROUTE_ERROR : undefined}
          variant={variant}
        />
        {isButtonDisplayed && (
          <Button
            className={fr.cx("fr-mt-2w")}
            type="button"
            onClick={(event) => {
              if (isOriginalVariant) {
                onDisplayClick(isValid && !!selectedAgreement);
                if (isValid && selectedAgreement) {
                  router.push(
                    slug === "les-conges-pour-evenements-familiaux"
                      ? `/contribution/${slug}/${selectedAgreement?.slug || selectedAgreement?.num}`
                      : `/contribution/${selectedAgreement?.num}-${slug}`
                  );
                } else {
                  event.preventDefault();
                }
                return;
              }
              if (!selectedRoute) {
                event.preventDefault();
                setShowMissingRouteError(true);
                return;
              }
              setShowMissingRouteError(false);
              if (selectedRoute === "no-agreement") {
                event.preventDefault();
                onDisplayClick(false);
                return;
              }
              onDisplayClick(isValid && !!selectedAgreement);
              if (isValid && selectedAgreement) {
                router.push(
                  slug === "les-conges-pour-evenements-familiaux"
                    ? `/contribution/${slug}/${selectedAgreement?.slug || selectedAgreement?.num}`
                    : `/contribution/${selectedAgreement?.num}-${slug}`
                );
              } else {
                event.preventDefault();
              }
            }}
          >
            Afficher les informations
          </Button>
        )}
      </div>
    </BlueCard>
  );
}
