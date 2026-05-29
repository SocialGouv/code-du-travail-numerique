"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
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
import { getAfficherInfoVariantFlags } from "../config/abTests";
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
  variant?: string | null;
};

const MISSING_ROUTE_ERROR =
  "Veuillez sélectionner l'une des options ci-dessus pour afficher les informations.";

const LEARN_MORE_URL = "/droit-du-travail";

const REGULAR_BUTTON_AGREEMENT_LABEL = "Je saisis ma convention collective";
const REGULAR_BUTTON_ENTERPRISE_LABEL = "Je cherche par entreprise";
const REGULAR_BUTTON_NO_AGREEMENT_LABEL = "Afficher le Code du travail";

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
  const {
    isOriginal: isOriginalVariant,
    isRegularButton: isRegularButtonVariant,
  } = getAfficherInfoVariantFlags(variant);
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >(isRegularButtonVariant ? "enterprise" : undefined);
  const [showMissingRouteError, setShowMissingRouteError] = useState(false);
  const [enterpriseHasNoAgreement, setEnterpriseHasNoAgreement] =
    useState(false);

  const [forcedRoute, setForcedRoute] = useState<AgreementRoute | undefined>(
    isRegularButtonVariant ? "enterprise" : undefined
  );
  const [enterpriseRequireSearchSignal, setEnterpriseRequireSearchSignal] =
    useState(0);
  const [agreementRequireSearchSignal, setAgreementRequireSearchSignal] =
    useState(0);
  // Marque une modification de CC initiée depuis le formulaire lui-même
  // (sélection entreprise/CC, bascule de route) pour la distinguer d'une
  // modification externe (header, autre onglet) dans l'effet de synchro de route.
  const internalSelectionRef = useRef(false);

  const { emitClickP3 } = useContributionTracking(variant);

  useEffect(() => {
    setIsValid(isAgreementValid(contribution, selectedAgreement));
  }, [selectedAgreement]);

  // En variante regular_button, la route du formulaire suit la présence d'une
  // convention collective : une CC connue (chargée du stockage ou ajoutée via le
  // header) affiche la route « agreement » pour la montrer, sinon on retombe sur
  // la recherche par entreprise (jamais d'encart vide). On ignore les sélections
  // internes (CC/entreprise choisie dans le formulaire, bascule via les boutons)
  // pour ne pas sortir l'usager de la route qu'il est en train d'utiliser.
  // La variante A/B se résolvant après le 1er rendu, l'effet se rejoue aussi
  // lorsque isRegularButtonVariant devient vrai.
  useEffect(() => {
    if (!isRegularButtonVariant) return;
    if (internalSelectionRef.current) {
      internalSelectionRef.current = false;
      return;
    }
    const nextRoute = selectedAgreement ? "agreement" : "enterprise";
    // Synchro avec une source externe (variante A/B résolue après le 1er rendu,
    // CC du header / autre onglet) : la route ne peut pas être dérivée au rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedRoute(nextRoute);
    setForcedRoute(nextRoute);
  }, [isRegularButtonVariant, selectedAgreement]);

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

  const isButtonDisplayed = isRegularButtonVariant || !isNoCDT || isValid;

  // Navigue vers la page CC en ajoutant le hash de focus : la cible n'est mise
  // en focus que lorsqu'on y arrive par cette action (cf. AGREEMENT_FOCUS_HASH).
  const navigateToAgreementPage = () => {
    if (!selectedAgreement) return;
    router.push(
      `${buildContributionAgreementPath(slug, selectedAgreement)}${AGREEMENT_FOCUS_HASH}`
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
    if (isOriginalVariant) {
      displayOrNavigate(event);
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

  // Toute sélection/effacement de CC déclenchée par le formulaire passe par ici
  // afin que l'effet de synchro de route ne la confonde pas avec un changement
  // externe (header) et ne réécrive pas la route choisie par l'usager.
  const selectAgreementInternally = (agreement?: Agreement) => {
    internalSelectionRef.current = true;
    onAgreementSelect(agreement);
  };

  const onSwitchToAgreementMode = () => {
    selectAgreementInternally();
    setForcedRoute("agreement");
    setShowMissingRouteError(false);
  };

  const onSwitchToEnterpriseMode = () => {
    selectAgreementInternally();
    setForcedRoute("enterprise");
    setShowMissingRouteError(false);
  };

  const onSkipToGeneric = () => {
    setShowMissingRouteError(false);
    selectAgreementInternally();
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
          onAgreementSelect={selectAgreementInternally}
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
          showNoAgreementOption={
            !isNoCDT && !isOriginalVariant && !isRegularButtonVariant
          }
          noAgreementContent={
            !isOriginalVariant && !isRegularButtonVariant
              ? noAgreementBanner
              : undefined
          }
          onRouteChange={(route) => {
            setSelectedRoute(route);
            setShowMissingRouteError(false);
            setEnterpriseHasNoAgreement(false);
          }}
          onEnterpriseWithoutAgreement={setEnterpriseHasNoAgreement}
          error={
            !isRegularButtonVariant && showMissingRouteError
              ? MISSING_ROUTE_ERROR
              : undefined
          }
          variant={variant}
          forcedRoute={isRegularButtonVariant ? forcedRoute : undefined}
          enterpriseRequireSearchSignal={
            isOriginalVariant ? undefined : enterpriseRequireSearchSignal
          }
          agreementRequireSearchSignal={
            isOriginalVariant ? undefined : agreementRequireSearchSignal
          }
        />
        {isRegularButtonVariant && isButtonDisplayed && (
          <ButtonsGroup
            className={fr.cx("fr-mt-3w")}
            buttonsSize="medium"
            inlineLayoutWhen="md and up"
            buttons={[
              {
                children: "Afficher les informations",
                priority: "primary",
                type: "button",
                onClick: handleDisplayClick,
              },
              {
                children:
                  selectedRoute === "agreement"
                    ? REGULAR_BUTTON_ENTERPRISE_LABEL
                    : REGULAR_BUTTON_AGREEMENT_LABEL,
                priority: "secondary",
                type: "button",
                onClick:
                  selectedRoute === "agreement"
                    ? onSwitchToEnterpriseMode
                    : onSwitchToAgreementMode,
              },
              {
                children: REGULAR_BUTTON_NO_AGREEMENT_LABEL,
                priority: "secondary",
                type: "button",
                onClick: onSkipToGeneric,
              },
            ]}
          />
        )}
        {!isRegularButtonVariant && isButtonDisplayed && (
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
