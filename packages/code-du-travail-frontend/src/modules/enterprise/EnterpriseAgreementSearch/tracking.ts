import { sendEvent } from "@socialgouv/matomo-next";
import {
  TrackingAgreementSearchAction,
  TrackingAgreementSearchCategory,
} from "../../convention-collective/tracking";
import { ApiGeoResult } from "./searchCities";
import { toCountEventName } from "../../analytics/eventName";

export enum TrackingEnterpriseAgreementSearchAction {
  SHOW_AGREEMENTS = "show_agreements",
}

export const useEnterpriseAgreementSearchTracking = () => {
  const emitEnterpriseAgreementSearchInputEvent = (
    action: string,
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.ENTERPRISE_SEARCH,
      action: action,
      name: JSON.stringify({ query, apiGeoResult }),
    });
  };

  const emitSelectEnterpriseEvent = (
    action: string,
    enterprise: {
      label: string;
      siren: string;
    }
  ) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SELECT,
      action: action,
      name: JSON.stringify(enterprise),
    });
  };

  // Émis à l'affichage des conventions collectives d'une entreprise, quel que
  // soit le parcours (simulateurs, contributions, page dédiée, widget) et y
  // compris quand l'entreprise n'en déclare aucune (`name` vaut alors "aucun",
  // cf. toCountEventName : Matomo jette un nom d'event valant "0").
  // Équivalent de `show_accords` côté accords d'entreprise : on n'envoie que le
  // nombre, ni SIRET ni liste d'IDCC.
  const emitShowAgreements = (count: number) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
      action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
      name: toCountEventName(count),
    });
  };

  const emitSelectEnterpriseAgreementEvent = (idcc: string, action: string) => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SELECT_P2,
      action: action,
      name: idcc,
    });
  };

  const emitPreviousEvent = () => {
    sendEvent({
      category: TrackingAgreementSearchCategory.VIEW_STEP_CC_SEARCH_P2,
      action: TrackingAgreementSearchAction.BACK_STEP_P2,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
    });
  };

  const emitNoEnterpriseClickEvent = () => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.CLICK_NO_COMPANY,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
    });
  };
  const emitNoEnterpriseSelectEvent = () => {
    sendEvent({
      category: TrackingAgreementSearchCategory.CC_SEARCH_TYPE_OF_USERS,
      action: TrackingAgreementSearchAction.SELECT_NO_COMPANY,
      name: TrackingAgreementSearchAction.AGREEMENT_SEARCH,
    });
  };

  return {
    emitEnterpriseAgreementSearchInputEvent,
    emitSelectEnterpriseEvent,
    emitShowAgreements,
    emitSelectEnterpriseAgreementEvent,
    emitPreviousEvent,
    emitNoEnterpriseClickEvent,
    emitNoEnterpriseSelectEvent,
  };
};
