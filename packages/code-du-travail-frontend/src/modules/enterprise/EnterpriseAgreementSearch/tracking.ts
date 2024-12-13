import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../../utils";
import { ApiGeoResult } from "src/modules/Location/searchCities";
import {
  AGREEMENT_SEARCH_ACTION,
  TrackingAgreementSearchEvent,
} from "src/modules/convention-collective/tracking";

export const useEnterpriseAgreementSearchTracking = () => {
  const emitEnterpriseAgreementSearchInputEvent = (
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    sendEvent({
      category: TrackingAgreementSearchEvent.ENTERPRISE_SEARCH,
      action: AGREEMENT_SEARCH_ACTION,
      name: JSON.stringify({ query, apiGeoResult }),
      value: generateUUID(),
    });
  };

  return {
    emitEnterpriseAgreementSearchInputEvent,
  };
};
