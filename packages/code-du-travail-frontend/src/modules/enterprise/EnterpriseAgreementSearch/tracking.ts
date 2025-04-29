import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../../utils";
import { ApiGeoResult } from "../../Location/searchCities";
import {
  TrackingAgreementSearchAction,
  TrackingAgreementSearchCategory,
} from "../../convention-collective/tracking";

export const useEnterpriseAgreementSearchTracking = (disableMatomo = false) => {
  const emitEnterpriseAgreementSearchInputEvent = (
    action: string,
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.ENTERPRISE_SEARCH,
        action: action,
        name: JSON.stringify({ query, apiGeoResult }),
        value: generateUUID(),
      });
    }
  };

  const emitSelectEnterpriseEvent = (
    action: string,
    enterprise: {
      label: string;
      siren: string;
    }
  ) => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SELECT,
        action: action,
        name: JSON.stringify(enterprise),
        value: generateUUID(),
      });
    }
  };

  const emitSelectEnterpriseAgreementEvent = (idcc: string, action: string) => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.CC_SELECT_P2,
        action: action,
        name: idcc,
        value: generateUUID(),
      });
    }
  };

  const emitPreviousEvent = () => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.VIEW_STEP_CC_SEARCH_P2,
        action: TrackingAgreementSearchAction.BACK_STEP_P2,
        name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
        value: generateUUID(),
      });
    }
  };

  const emitNoEnterpriseClickEvent = () => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
        action: TrackingAgreementSearchAction.CLICK_NO_COMPANY,
        name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      });
    }
  };
  const emitNoEnterpriseSelectEvent = () => {
    if (!disableMatomo) {
      sendEvent({
        category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
        action: TrackingAgreementSearchAction.SELECT_NO_COMPANY,
        name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
      });
    }
  };

  return {
    emitEnterpriseAgreementSearchInputEvent,
    emitSelectEnterpriseEvent,
    emitSelectEnterpriseAgreementEvent,
    emitPreviousEvent,
    emitNoEnterpriseClickEvent,
    emitNoEnterpriseSelectEvent,
  };
};
