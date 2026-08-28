import { useTracking } from "../analytics/events/useTracking";

// Titre de l'outil dédié « Trouver sa convention collective ». Sert d'intitulé
// aux composants et de clé `simulator` sur son event d'arrivée ; il n'a plus à
// être transmis aux émetteurs de parcours, qui lisent la route courante.
export const AGREEMENT_SEARCH_TOOL = "Trouver sa convention collective";

export const useAgreementSearchTracking = () => {
  const { track } = useTracking();

  const emitViewStepEvent = () => {
    track("view_step", { simulator: AGREEMENT_SEARCH_TOOL, step: "start" });
  };

  // p1 : « je connais ma convention collective » -> route `agreement`.
  const emitNavigateAgreementSearchEvent = (): undefined => {
    track("select_agreement_path_p1");
  };

  // p2 : « je ne la connais pas, je cherche mon entreprise » -> route `enterprise`.
  const emitNavigateEnterpriseSearchEvent = (): undefined => {
    track("select_agreement_path_p2");
  };

  // `idcc` est le NUMÉRO brut de la convention. L'ancien schéma envoyait
  // « idcc1486 » côté simulateurs et « 1486 » côté contributions pour la même
  // information : le préfixe devient inutile une fois la donnée nommée par sa
  // clé de payload.
  const emitSelectEvent = (idcc: number) => {
    track("select_agreement_p1", { idcc });
  };

  // « Précédent » depuis l'écran de recherche par nom de convention. L'ancien
  // schéma en faisait une CATÉGORIE Matomo nommée `view_step_cc_search_p1` —
  // une catégorie qui décrivait une action, l'anomalie la plus nette de
  // l'ancien schéma.
  const emitPreviousEvent = () => {
    track("click_previous_step_agreement_p1");
  };

  return {
    emitViewStepEvent,
    emitNavigateAgreementSearchEvent,
    emitNavigateEnterpriseSearchEvent,
    emitSelectEvent,
    emitPreviousEvent,
  };
};
