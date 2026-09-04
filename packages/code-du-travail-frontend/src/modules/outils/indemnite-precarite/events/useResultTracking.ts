import { useEffect, useRef } from "react";
import { sendEvent } from "@socialgouv/matomo-next";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";
import { useSimulatorTitle } from "src/modules/outils/common/components/SimulatorLayout/SimulatorTitleContext";

/**
 * Issue de l'écran de résultat, telle qu'elle est affichée à l'usager :
 *
 *  - `eligible` : un montant est présenté ;
 *  - `ineligible` : la situation saisie n'ouvre pas droit à l'indemnité
 *    (« Autres » contrats, rupture anticipée, embauche en CDI…) ;
 *  - `error` : le moteur de calcul est en échec.
 *
 * Les trois cas couvrent l'intégralité des rendus de l'étape « Résultat » :
 * toute arrivée sur l'écran émet un et un seul event, ce qui permet de
 * calculer le taux de conversion en distinguant les simulations abouties des
 * culs-de-sac.
 */
export type ResultOutcome = "eligible" | "ineligible" | "error";

// Une branche = un appel avec des littéraux (membres d'enum), pour rester
// extractible statiquement par @socialgouv/cdtn-stats.
const emitResultEvent = (title: string, outcome: ResultOutcome): void => {
  switch (outcome) {
    case "eligible":
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: `${MatomoActionEvent.VIEW_STEP}_${title}`,
        name: MatomoSimulatorEvent.STEP_RESULT_ELIGIBLE,
      });
      break;
    case "ineligible":
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: `${MatomoActionEvent.VIEW_STEP}_${title}`,
        name: MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
      break;
    case "error":
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: `${MatomoActionEvent.VIEW_STEP}_${title}`,
        name: MatomoSimulatorEvent.STEP_RESULT_ERROR,
      });
      break;
  }
};

/**
 * Émet l'issue du résultat une seule fois par affichage de l'étape.
 *
 * `resolveOutcome` est appelé dans l'effet, donc après le calcul publicodes
 * déclenché au montage : l'issue lue est celle réellement rendue.
 */
export const useResultTracking = (
  resolveOutcome: () => ResultOutcome
): void => {
  const title = useSimulatorTitle();
  const hasEmitted = useRef(false);

  useEffect(() => {
    if (hasEmitted.current) return;
    hasEmitted.current = true;
    emitResultEvent(title, resolveOutcome());
  }, [title, resolveOutcome]);
};
