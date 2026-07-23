"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import { Contribution } from "./type";
import BlueCard from "../common/BlueCard";
import { focusableTitle } from "../common/focusableTitle";
import { WhatIsAgreementLink } from "../convention-collective/WhatIsAgreementLink";
import { AgreementSearchFormBlock } from "./AgreementSearchFormBlock";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  contribution: Contribution;
  selectedAgreement?: Agreement;
  trackingActionName: string;
  personalizeTitleRef: React.RefObject<HTMLParagraphElement | null>;
  /** Libellé de la CC de la page, affiché dans l'encart « convention utilisée ». */
  agreementName?: string;
  /**
   * IDCC (4 chiffres, ex. « 0675 ») de la page contribution personnalisée qui
   * héberge le bloc. Quand la CC sélectionnée correspond, on bascule sur place
   * en état résultat plutôt que de renavigder vers la même URL.
   */
  currentIdcc?: string;
  onSameAgreementSelect?: () => void;
  /** Route pré-cochée à l'arrivée (retour depuis une page CC via #cdt). */
  defaultRoute?: AgreementRoute;
};

const VERIFY_TITLE_ID = "verify-agreement-title";

const labelColor = css({ color: "var(--text-action-high-blue-france)" });
// Capitales via CSS plutôt qu'en dur dans le DOM : certains lecteurs d'écran
// épellent un texte saisi tout en majuscules.
const labelStyle = css({
  color: "var(--text-action-high-blue-france)",
  textTransform: "uppercase",
});

// Façade « parcours externe » (arrivée sur une page CC depuis l'extérieur, ou
// après « Réinitialiser ») : présentation « Vérifiez votre convention
// collective » avec rappel de la CC de la page. Partage la mécanique du
// formulaire avec la façade « parcours interne »
// (ContributionGenericAgreementSearch) via AgreementSearchFormBlock.
export function ContributionPersonalizedAgreementSearch({
  contribution,
  onAgreementSelect,
  onDisplayClick,
  selectedAgreement,
  trackingActionName,
  personalizeTitleRef,
  agreementName,
  currentIdcc,
  onSameAgreementSelect,
  defaultRoute,
}: Props) {
  return (
    <BlueCard>
      <p
        ref={personalizeTitleRef}
        id={VERIFY_TITLE_ID}
        className={`${fr.cx("fr-h3", "fr-mt-1w")} ${focusableTitle}`}
        role="heading"
        aria-level={2}
        tabIndex={-1}
      >
        Vérifiez votre convention collective
      </p>
      <p className={fr.cx("fr-text--sm", "fr-mb-2w")}>
        Les informations affichées ci-dessous sont établies pour cette
        convention collective&nbsp;:
      </p>

      <div className={fr.cx("fr-highlight", "fr-my-2w")}>
        <p
          className={`${fr.cx("fr-text--xs", "fr-text--bold", "fr-mb-1v")} ${labelStyle}`}
        >
          <i
            className={`ri-checkbox-circle-line ${labelColor}`}
            aria-hidden="true"
          />{" "}
          Convention utilisée actuellement
        </p>
        <p className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-0")}>
          {agreementName}
        </p>
      </div>

      <WhatIsAgreementLink />

      <hr className={fr.cx("fr-mt-2w")} />

      <p className={fr.cx("fr-h6", "fr-mb-1v")} role="heading" aria-level={3}>
        Ce n&apos;est pas la bonne convention&nbsp;?
      </p>

      <AgreementSearchFormBlock
        contribution={contribution}
        onAgreementSelect={onAgreementSelect}
        onDisplayClick={onDisplayClick}
        selectedAgreement={selectedAgreement}
        trackingActionName={trackingActionName}
        currentIdcc={currentIdcc}
        onSameAgreementSelect={onSameAgreementSelect}
        defaultRoute={defaultRoute}
        legend="Indiquez comment retrouver la convention qui s'applique :"
        onBackToPersonalizeFocus={() => {
          document.getElementById(VERIFY_TITLE_ID)?.focus();
        }}
      />
    </BlueCard>
  );
}
