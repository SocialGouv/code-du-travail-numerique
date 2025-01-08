import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../utils";

export enum TrackingAgreementSearchCategory {
  CC_SEARCH = "cc_search",
  CC_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
  ENTERPRISE_SEARCH = "enterprise_search",
  VIEW_STEP = "view_step_Trouver sa convention collective",
  CC_SELECT_P1 = "cc_select_p1",
  CC_SELECT_P2 = "cc_select_p2",
  CC_ENTERPRISE_SELECT = "enterprise_select",
  VIEW_STEP_CC_SEARCH_P1 = "view_step_cc_search_p1",
  VIEW_STEP_CC_SEARCH_P2 = "view_step_cc_search_p2",
}

export enum TrackingAgreementSearchAction {
  AGREEMENT_SEARCH = "Trouver sa convention collective",
  CLICK_P1 = "click_p1",
  CLICK_P2 = "click_p2",
  BACK_STEP_P1 = "back_step_cc_search_p1",
  BACK_STEP_P2 = "back_step_cc_search_p2",
  CLICK_NO_COMPANY = "click_je_n_ai_pas_d_entreprise",
}

export const useAgreementSearchTracking = () => {
  const emitAgreementSearchInputEvent = (query: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SEARCH,
      action: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      name: JSON.stringify({ query }),
      value: generateUUID(),
    });
  };

  const emitViewStepEvent = () => {
    sendEvent({
      category: "outil",
      action: `view_step_${TrackingAgreementSearchAction.AGREEMENT_SEARCH}`,
      name: "start",
    });
  };

  const emitNavigateAgreementSearchEvent = (): undefined => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P1,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      value: generateUUID(),
    });
  };

  const emitNavigateEnterpriseSearchEvent = (): undefined => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_P2,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      value: generateUUID(),
    });
  };

  const emitSelectEvent = (idcc: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SELECT_P1,
      action: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      name: idcc,
      value: generateUUID(),
    });
  };

  const emitPreviousEvent = () => {
    sendEvent({
      category: TrackingAgreementSearchCategory.VIEW_STEP_CC_SEARCH_P1,
      action: TrackingAgreementSearchAction.BACK_STEP_P1,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      value: generateUUID(),
    });
  };

  return {
    emitAgreementSearchInputEvent,
    emitViewStepEvent,
    emitNavigateAgreementSearchEvent,
    emitNavigateEnterpriseSearchEvent,
    emitSelectEvent,
    emitPreviousEvent,
  };
};
