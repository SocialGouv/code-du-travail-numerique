import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../utils";

export enum TrackingAgreementSearchEvent {
  CC_SEARCH = "cc_search",
  ENTERPRISE_SEARCH = "enterprise_search",
}

export const AGREEMENT_SEARCH_ACTION = "Trouver sa convention collective";

export const useAgreementSearchTracking = () => {
  const emitAgreementSearchInputEvent = (query: string) => {
    sendEvent({
      category: TrackingAgreementSearchEvent.CC_SEARCH,
      action: AGREEMENT_SEARCH_ACTION,
      name: JSON.stringify({ query }),
      value: generateUUID(),
    });
  };

  return {
    emitAgreementSearchInputEvent,
  };
};
