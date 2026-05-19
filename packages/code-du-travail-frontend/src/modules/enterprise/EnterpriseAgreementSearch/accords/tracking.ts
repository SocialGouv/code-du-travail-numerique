import { sendEvent } from "@socialgouv/matomo-next";
import { TrackingAgreementSearchCategory } from "../../../convention-collective/tracking";

export enum TrackingAccordEntrepriseSearchAction {
  CLICK_ACCORD = "click_accord",
  CLICK_ALL_ACCORDS = "click_all_accords",
  SHOW_ACCORDS = "show_accords",
  LOAD_ACCORDS_FAILED = "load_accords_failed",
}

export const useAccordEnterpriseTracking = () => {
  const emitClickAccord = (url: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
      action: TrackingAccordEntrepriseSearchAction.CLICK_ACCORD,
      name: url,
    });
  };

  const emitClickSeeAll = (siret: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
      action: TrackingAccordEntrepriseSearchAction.CLICK_ALL_ACCORDS,
      name: siret,
    });
  };

  const emitShowAccords = (count: number) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
      action: TrackingAccordEntrepriseSearchAction.SHOW_ACCORDS,
      name: String(count),
    });
  };

  const emitLoadAccordsFailed = (siret: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
      action: TrackingAccordEntrepriseSearchAction.LOAD_ACCORDS_FAILED,
      name: siret,
    });
  };

  return {
    emitClickAccord,
    emitClickSeeAll,
    emitShowAccords,
    emitLoadAccordsFailed,
  };
};
