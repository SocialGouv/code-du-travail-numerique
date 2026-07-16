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
  buildContributionAgreementPath,
  isAgreementSupported,
  isAgreementUnextended,
  isAgreementValid,
} from "./contributionUtils";
import { Contribution } from "./type";
import Link from "../common/Link";
import BlueCard from "../common/BlueCard";
import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";
import { useContributionTracking } from "./tracking";
import { focusableTitle } from "../common/focusableTitle";
import { AGREEMENT_FOCUS_HASH } from "./ContributionAgreement";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
  personalizeTitleRef: React.RefObject<HTMLParagraphElement | null>;
};

const MISSING_ROUTE_ERROR =
  "Veuillez sélectionner l'une des options ci-dessus pour afficher les informations.";

const LEARN_MORE_URL = "/droit-du-travail";

export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
  personalizeTitleRef,
}: Props) {
  const router = useRouter();
  const { slug, isNoCDT } = contribution;
  const [isValid, setIsValid] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >(undefined);
  const [showMissingRouteError, setShowMissingRouteError] = useState(false);
  const [enterpriseHasNoAgreement, setEnterpriseHasNoAgreement] =
    useState(false);

  const [enterpriseRequireSearchSignal, setEnterpriseRequireSearchSignal] =
    useState(0);
  const [agreementRequireSearchSignal, setAgreementRequireSearchSignal] =
    useState(0);

  const { emitClickP3 } = useContributionTracking();

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

  const isButtonDisplayed = !isNoCDT || isValid;

  // Navigue vers la page CC en ajoutant le hash de focus : la cible n'est mise
  // en focus que lorsqu'on y arrive par cette action (cf. AGREEMENT_FOCUS_HASH).
  // `scroll: false` : sans ça, Next réinitialise le scroll en haut de page à la
  // navigation et écrase le défilement vers le titre « Votre convention
  // collective » géré par la page CC — l'usager restait alors tout en haut.
  const navigateToAgreementPage = () => {
    if (!selectedAgreement) return;
    router.push(
      `${buildContributionAgreementPath(slug, selectedAgreement)}${AGREEMENT_FOCUS_HASH}`,
      { scroll: false }
    );
  };

  // Affiche le contenu ou navigue vers la page CC selon qu'une CC valide est
  // sélectionnée ; sinon empêche l'action par défaut du bouton.
  const displayOrNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDisplayClick(isValid && !!selectedAgreement);
    if (isValid && selectedAgreement) {
      navigateToAgreementPage();
    } else {
      event.preventDefault();
    }
  };

  const handleDisplayClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
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
    if (selectedRoute === "enterprise" && !selectedAgreement) {
      event.preventDefault();
      if (enterpriseHasNoAgreement) {
        onSkipToGeneric();
        return;
      }
      setEnterpriseRequireSearchSignal((c) => c + 1);
      return;
    }
    if (selectedRoute === "agreement" && !selectedAgreement) {
      event.preventDefault();
      setAgreementRequireSearchSignal((c) => c + 1);
      return;
    }
    displayOrNavigate(event);
  };

  const onSkipToGeneric = () => {
    setShowMissingRouteError(false);
    onAgreementSelect();
    emitClickP3(trackingActionName);
    onDisplayClick(false);
  };

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
          className={`${fr.cx("fr-h3", "fr-mt-1w")} ${focusableTitle}`}
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
          title="En savoir plus sur les conventions collectives"
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
          showWhatIsAgreementLink
          onBackToPersonalize={() => {
            const personalizeTitle = document.getElementById(
              "personalize-response-title"
            );
            personalizeTitle?.focus();
          }}
          showNoAgreementOption={!isNoCDT}
          noAgreementContent={noAgreementBanner}
          onRouteChange={(route) => {
            setSelectedRoute(route);
            setShowMissingRouteError(false);
            setEnterpriseHasNoAgreement(false);
          }}
          onEnterpriseWithoutAgreement={setEnterpriseHasNoAgreement}
          error={showMissingRouteError ? MISSING_ROUTE_ERROR : undefined}
          enterpriseRequireSearchSignal={enterpriseRequireSearchSignal}
          agreementRequireSearchSignal={agreementRequireSearchSignal}
        />
        {isButtonDisplayed && (
          <Button
            className={fr.cx("fr-mt-2w")}
            type="button"
            onClick={handleDisplayClick}
          >
            Afficher les informations
          </Button>
        )}
      </div>
    </BlueCard>
  );
}
