"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import { Contribution } from "./type";
import BlueCard from "../common/BlueCard";
import { focusableTitle } from "../common/focusableTitle";
import { WhatIsAgreementLink } from "../convention-collective/WhatIsAgreementLink";
import { AgreementSearchFormBlock } from "./AgreementSearchFormBlock";
import { useCcFunnelTracking } from "./tracking";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
  personalizeTitleRef: React.RefObject<HTMLParagraphElement | null>;
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
   * La page s'apprête à rediriger vers la fiche CC mémorisée : le bloc est
   * monté mais l'usager ne le verra pas. Sert à ne pas compter cette visite
   * dans le dénominateur du funnel (cf. AgreementSearchFormBlock).
   */
  isRedirecting?: boolean;
  /** cf. AgreementSearchFormBlock : option « sans CC », garde partagée, ids. */
  showNoAgreementOption?: boolean;
  pageOnce?: (key: string, emit: () => void) => void;
  instanceId?: string;
  /**
   * Marge et rappel visuel quand le bloc est inséré dans le contenu (variantes
   * C et D de #7481) plutôt qu'en tête de page.
   */
  className?: string;
};

const TITLE_ID = "personalize-response-title";

// Façade « parcours interne » (fiche générique) : présentation « Personnalisez
// la réponse… ». Toute la mécanique du formulaire vit dans
// AgreementSearchFormBlock, partagée avec la façade « parcours externe »
// (ContributionPersonalizedAgreementSearch).
export function ContributionGenericAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
  personalizeTitleRef,
  currentIdcc,
  onSameAgreementSelect,
  defaultRoute,
  isRedirecting,
  showNoAgreementOption,
  pageOnce,
  instanceId,
  className,
}: Props) {
  const { emitClickWhatIsAgreement } = useCcFunnelTracking();
  const titleId = instanceId ? `${TITLE_ID}-${instanceId}` : TITLE_ID;
  return (
    <BlueCard className={className}>
      <div className={fr.cx("fr-grid-row")}>
        <Image
          priority
          src={AgreementSearch}
          alt=""
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <p
          ref={personalizeTitleRef}
          id={titleId}
          className={`${fr.cx("fr-h3", "fr-mt-1w")} ${focusableTitle}`}
          role="heading"
          aria-level={2}
          tabIndex={-1}
        >
          Personnalisez la réponse avec votre convention collective
        </p>
      </div>
      <WhatIsAgreementLink
        onClick={() => emitClickWhatIsAgreement(trackingActionName)}
      />
      <AgreementSearchFormBlock
        contribution={contribution}
        onAgreementSelect={onAgreementSelect}
        onDisplayClick={onDisplayClick}
        selectedAgreement={selectedAgreement}
        trackingActionName={trackingActionName}
        currentIdcc={currentIdcc}
        onSameAgreementSelect={onSameAgreementSelect}
        defaultRoute={defaultRoute}
        isRedirecting={isRedirecting}
        showNoAgreementOption={showNoAgreementOption}
        pageOnce={pageOnce}
        instanceId={instanceId}
        onBackToPersonalizeFocus={() => {
          document.getElementById(titleId)?.focus();
        }}
      />
    </BlueCard>
  );
}
