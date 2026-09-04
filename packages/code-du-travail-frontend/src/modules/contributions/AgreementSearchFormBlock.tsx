"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  /**
   * La page hôte s'apprête à rediriger (fiche générique avec une CC mémorisée
   * et traitée) : le bloc est monté, mais l'usager ne le verra jamais. On
   * n'émet alors pas `view_bloc_cc`, sans quoi le dénominateur du funnel
   * compterait une cohorte structurellement à 0 % de conversion.
   */
  isRedirecting?: boolean;
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
  isRedirecting,
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
  // CC déjà comptées comme « non traitée retenue » : un aller-retour A → B → A
  // ne doit pas recompter A, et le bloc se re-rend à chaque frappe.
  const trackedUntreatedAgreementsRef = useRef(new Set<string>());

  // Marches du funnel à compter une fois par affichage de la page. La garde ne
  // peut pas vivre dans les composants de recherche : `AgreementSearchForm` les
  // démonte et remonte à chaque bascule de radio, si bien qu'un usager hésitant
  // (p1 → p2 → p1) émettrait deux fois l'entrée dans l'étape pour un seul
  // `view_bloc_cc`. Le bloc, lui, est monté une fois par page.
  const emittedOnceRef = useRef(new Set<string>());
  const once = useCallback((key: string, emit: () => void) => {
    if (emittedOnceRef.current.has(key)) return;
    emittedOnceRef.current.add(key);
    emit();
  }, []);

  useEffect(() => {
    setIsValid(isAgreementValid(contribution, selectedAgreement));
  }, [selectedAgreement]);

  // Dénominateur du funnel : le bloc de choix de CC a été affiché à un usager
  // qui reste sur la page (cf. `isRedirecting`).
  useEffect(() => {
    if (isRedirecting) return;
    funnel.emitViewBlocCc(trackingActionName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Objet de callbacks passé aux composants de recherche. Mémoïsé pour lui
  // donner une identité stable entre deux rendus : aucune des deux feuilles
  // n'est aujourd'hui enveloppée dans `React.memo`, la mémoïsation n'évite donc
  // encore aucun rendu — elle évite qu'en mémoïser une plus tard ne soit un
  // coup d'épée dans l'eau. Les émetteurs, eux, ont une référence stable
  // (cf. `useCcFunnelTracking`).
  const funnelTracking = useMemo<AgreementSearchFunnelTracking>(
    () => ({
      onAgreementSearchStart: () =>
        once("start_cc", () =>
          funnel.emitStartAgreementSearch(trackingActionName)
        ),
      // `onSearch` de l'autocomplete part à CHAQUE frappe : sans cette garde,
      // une requête infructueuse de douze caractères émettrait dix events, hors
      // d'échelle face aux autres marches. On compte « l'usager a rencontré au
      // moins une recherche infructueuse », comme côté entreprise.
      onAgreementSearchNoResult: () =>
        once("no_result_cc", () =>
          funnel.emitNoResultAgreement(trackingActionName)
        ),
      onEnterpriseSearchStart: () =>
        once("start_entreprise", () =>
          funnel.emitStartEnterpriseSearch(trackingActionName)
        ),
      onEnterpriseSearchSubmit: () =>
        funnel.emitSubmitEnterpriseSearch(trackingActionName),
      onEnterpriseSearchNoResult: () =>
        once("no_result_entreprise", () =>
          funnel.emitNoResultEnterprise(trackingActionName)
        ),
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
    [funnel, once, trackingActionName]
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

  // « L'usager a retenu une CC pour laquelle cette contribution n'a pas de
  // réponse » : une fois par CC, quel que soit le parcours qui l'a amenée.
  //
  // On mesure la CC retenue, et non l'affichage d'un encart : les trois écrans
  // qui rendent une alerte le font sous des conditions DIFFÉRENTES — celle-ci
  // (`!isAgreementSupported`, propre à la contribution) dans les deux
  // composants de recherche, mais `!agreement.contributions` (portée globale)
  // dans `EnterpriseAgreementSelectionForm`, seul écran affiché quand
  // l'entreprise déclare au moins deux conventions. Se brancher sur les rendus
  // mêlerait donc deux sémantiques dans une seule courbe ; une condition unique
  // et parcours-indépendante est lisible.
  useEffect(() => {
    if (!selectedAgreement) return;
    if (!selectedAgreementAlert(selectedAgreement)) return;
    const idcc = String(selectedAgreement.num);
    if (trackedUntreatedAgreementsRef.current.has(idcc)) return;
    trackedUntreatedAgreementsRef.current.add(idcc);
    funnel.emitUntreatedAgreementRetained(trackingActionName);
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
