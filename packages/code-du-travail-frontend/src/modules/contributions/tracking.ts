import { sendEvent } from "@socialgouv/matomo-next";
import { MatomoAgreementEvent } from "../analytics";

export enum TrackingContributionCategory {
  TOOL = "outil",
  CONTRIBUTION = "contribution",
  CC_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

export enum TrackingAgreementSearchAction {
  CLICK_DISPLAY_AGREEMENT_CONTENT = "click_afficher_les_informations_CC",
  CLICK_DISPLAY_GENERIC_CONTENT = "click_afficher_les_informations_sans_CC",
  CLICK_DISPLAY_GENERAL_CONTENT = "click_afficher_les_informations_générales",
  CLICK_P1 = "click_p1",
  CLICK_P2 = "click_p2",
  CLICK_P3 = "click_p3",
}

export const useContributionTracking = () => {
  const emitAgreementTreatedEvent = (idcc: number) => {
    sendEvent({
      category: TrackingContributionCategory.TOOL,
      action: MatomoAgreementEvent.CC_TREATED,
      name: idcc.toString(),
    });
  };

  const emitAgreementUntreatedEvent = (idcc: number) => {
    sendEvent({
      category: TrackingContributionCategory.TOOL,
      action: MatomoAgreementEvent.CC_UNTREATED,
      name: idcc.toString(),
    });
  };

  const emitDisplayAgreementContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_AGREEMENT_CONTENT,
      name: path,
    });
  };

  const emitDisplayGenericContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_GENERIC_CONTENT,
      name: path,
    });
  };

  const emitDisplayGeneralContent = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CONTRIBUTION,
      action: TrackingAgreementSearchAction.CLICK_DISPLAY_GENERAL_CONTENT,
      name: path,
    });
  };

  const emitClickP1 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P1,
      name: path,
    });
  };

  const emitClickP2 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P2,
      name: path,
    });
  };

  const emitClickP3 = (path: string) => {
    sendEvent({
      category: TrackingContributionCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P3,
      name: path,
    });
  };

  return {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGeneralContent,
    emitDisplayGenericContent,
    emitClickP1,
    emitClickP2,
    emitClickP3,
  };
};
