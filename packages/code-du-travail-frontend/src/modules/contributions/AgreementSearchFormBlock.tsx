"use client";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { useRouter } from "next/navigation";

import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import {
  AGREEMENT_FOCUS_HASH,
  buildContributionAgreementPath,
  isAgreementSupported,
  isAgreementUnextended,
  isAgreementValid,
} from "./contributionUtils";
import { Contribution } from "./type";
import Link from "../common/Link";
import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { AccessibleAlert } from "../outils/common/components/AccessibleAlert";
import { useCcFunnelTracking, useContributionTracking } from "./tracking";
import { AgreementSearchFunnelTracking } from "../convention-collective/AgreementSearch/funnelTracking";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
  /**
   * IDCC (4 chiffres, ex. « 0675 ») de la page contribution personnalisée qui
   * héberge le bloc. Quand la CC sélectionnée correspond, on ne navigue pas
   * (pousser la même URL ne remonterait pas la page) : `onSameAgreementSelect`
   * bascule la page en état résultat sur place.
   */
  currentIdcc?: string;
  onSameAgreementSelect?: () => void;
  /** Route pré-cochée à l'arrivée (retour depuis une page CC via #cdt). */
  defaultRoute?: AgreementRoute;
  /**
   * Remet le focus sur le titre de la façade (« Personnalisez… » côté générique,
   * « Vérifiez votre convention collective » côté personnalisé) lorsque le
   * formulaire demande à revenir en haut du bloc.
   */
  onBackToPersonalizeFocus: () => void;
  /** Légende (label) du groupe de radios. Défaut géré par AgreementSearchForm. */
  legend?: ReactNode;
};

const MISSING_ROUTE_ERROR =
  "Veuillez sélectionner l'une des options ci-dessus pour afficher les informations.";

export function AgreementSearchFormBlock({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
  currentIdcc,
  onSameAgreementSelect,
  defaultRoute,
  onBackToPersonalizeFocus,
  legend,
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
  const funnel = useCcFunnelTracking();
  // Dernière CC pour laquelle l'alerte « pas de réponse » a été comptée : le
  // bloc se re-rend à chaque frappe, sans quoi l'event partirait en boucle.
  const trackedAlertAgreementRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    setIsValid(isAgreementValid(contribution, selectedAgreement));
  }, [selectedAgreement]);

  // Dénominateur exact du funnel : le bloc de choix de CC a été affiché.
  useEffect(() => {
    funnel.emitViewBlocCc(trackingActionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Objet de callbacks passé aux composants de recherche : mémoïsé pour ne pas
  // les re-rendre à chaque frappe (les émetteurs, eux, ont une référence
  // stable — cf. `useCcFunnelTracking`).
  const funnelTracking = useMemo<AgreementSearchFunnelTracking>(
    () => ({
      onAgreementSearchStart: () =>
        funnel.emitStartAgreementSearch(trackingActionName),
      onAgreementSearchNoResult: () =>
        funnel.emitNoResultAgreement(trackingActionName),
      onEnterpriseSearchStart: () =>
        funnel.emitStartEnterpriseSearch(trackingActionName),
      onEnterpriseSearchSubmit: () =>
        funnel.emitSubmitEnterpriseSearch(trackingActionName),
      onEnterpriseSearchNoResult: () =>
        funnel.emitNoResultEnterprise(trackingActionName),
      onEnterpriseSearchError: () =>
        funnel.emitErrorEnterpriseSearch(trackingActionName),
      onLocationSelect: () => funnel.emitSelectLocation(trackingActionName),
      onEnterpriseSelect: () => funnel.emitSelectEnterprise(trackingActionName),
      onEnterpriseWithoutAgreement: () =>
        funnel.emitEnterpriseWithoutAgreement(trackingActionName),
      onEnterpriseAgreementSelect: () =>
        funnel.emitSelectEnterpriseAgreement(trackingActionName),
      onHouseholdEmployerSelect: () =>
        funnel.emitSelectHouseholdEmployer(trackingActionName),
      onModifyEnterprise: () =>
        funnel.emitClickModifyEnterprise(trackingActionName),
      onModifyAgreement: () =>
        funnel.emitClickModifyAgreement(trackingActionName),
    }),
    [funnel, trackingActionName]
  );

  const onClickExternalAgreementLink = () =>
    funnel.emitClickExternalAgreementLink(trackingActionName);

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
              onClick={onClickExternalAgreementLink}
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
              onClick={onClickExternalAgreementLink}
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

  // « L'usager a vu qu'on n'a pas de réponse pour sa convention » : une fois par
  // CC retenue, quel que soit le parcours qui l'a amenée. Le message est bien
  // celui rendu par les composants de recherche à partir de
  // `selectedAgreementAlert` — d'où la condition identique.
  useEffect(() => {
    if (!selectedAgreement) return;
    if (!selectedAgreementAlert(selectedAgreement)) return;
    const idcc = String(selectedAgreement.num);
    if (trackedAlertAgreementRef.current === idcc) return;
    trackedAlertAgreementRef.current = idcc;
    funnel.emitShowUntreatedAgreementAlert(trackingActionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgreement]);

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
    if (
      currentIdcc &&
      onSameAgreementSelect &&
      selectedAgreement.num === parseInt(currentIdcc, 10)
    ) {
      onSameAgreementSelect();
      return;
    }
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
    // Émis pour TOUTE tentative, aboutie ou non : les
    // `click_afficher_les_informations_*` existants ne partent qu'en cas de
    // succès, ce qui rendait les tentatives bloquées invisibles.
    funnel.emitClickDisplayInformation(trackingActionName);
    if (!selectedRoute) {
      event.preventDefault();
      funnel.emitBlockedWithoutRoute(trackingActionName);
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
      funnel.emitBlockedWithoutAgreementP2(trackingActionName);
      setEnterpriseRequireSearchSignal((c) => c + 1);
      return;
    }
    if (selectedRoute === "agreement" && !selectedAgreement) {
      event.preventDefault();
      funnel.emitBlockedWithoutAgreementP1(trackingActionName);
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
    <div>
      <AgreementSearchForm
        onAgreementSelect={onAgreementSelect}
        selectedAgreementAlert={selectedAgreementAlert}
        defaultAgreement={selectedAgreement}
        defaultRoute={defaultRoute}
        trackingActionName={trackingActionName}
        level={3}
        legend={legend}
        // Le lien « La convention collective, c'est quoi ? » est déjà affiché en
        // haut de chaque façade (générique et personnalisée) : on ne le duplique
        // pas dans le flux « recherche entreprise ».
        showWhatIsAgreementLink={false}
        onBackToPersonalize={onBackToPersonalizeFocus}
        showNoAgreementOption={!isNoCDT}
        noAgreementContent={noAgreementBanner}
        onRouteChange={(route) => {
          setSelectedRoute(route);
          setShowMissingRouteError(false);
          setEnterpriseHasNoAgreement(false);
        }}
        // Distinct de `onRouteChange`, qui est aussi appelé par les
        // pré-cochages (`defaultRoute`, `defaultAgreement`) : y brancher le
        // tracking produirait des `select_pX` fantômes au montage.
        onRouteSelect={(route) => {
          if (route === "agreement") funnel.emitSelectP1(trackingActionName);
          if (route === "enterprise") funnel.emitSelectP2(trackingActionName);
          if (route === "no-agreement") funnel.emitSelectP3(trackingActionName);
        }}
        funnelTracking={funnelTracking}
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
  );
}
