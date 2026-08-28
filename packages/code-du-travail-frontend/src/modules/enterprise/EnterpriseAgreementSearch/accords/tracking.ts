import { sendEvent } from "@socialgouv/matomo-next";
import { TrackingAgreementSearchCategory } from "../../../convention-collective/tracking";
import { toCountEventName } from "../../../analytics/eventName";

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

  // `name` = nombre d'accords trouvés, "aucun" quand il n'y en a pas
  // (cf. toCountEventName : Matomo jette un nom d'event valant "0").
  const emitShowAccords = (count: number) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
      action: TrackingAccordEntrepriseSearchAction.SHOW_ACCORDS,
      name: toCountEventName(count),
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
