import { sendEvent } from "../utils";

enum MatomoHomeCategory {
  AGREEMENT_SEARCH = "cc_search_help",
  AGREEMENT_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

export enum MatomoAgreementEvent {
  AGREEMENT_SEARCH_HELP = "cc_search_help",
  ENTERPRISE_SELECT = "enterprise_select",
  AGREEMENT_SELECT_P1 = "cc_select_p1",
  AGREEMENT_SELECT_P2 = "cc_select_p2",
  PARCOURS_1 = "click_p1",
  PARCOURS_2 = "click_p2",
  PARCOURS_3 = "click_p3",
  ENTERPRISE_SEARCH = "enterprise_search",
  AGREEMENT_SEARCH = "cc_search",
  AGREEMENT_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

export const useAgreementSearchTracking = () => {
  const emitAgreementSearchEvent = (
    action: MatomoAgreementEvent,
    title: string,
    uuid: string
  ) => {
    sendEvent({
      category: MatomoHomeCategory.AGREEMENT_SEARCH,
      action,
      name: title,
      value: uuid,
    });
  };

  const emitSearchTypeSelectEvent = (action: MatomoAgreementEvent) => {
    sendEvent({
      category: MatomoHomeCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
      action,
    });
  };

  return {
    emitAgreementSearchEvent,
    emitSearchTypeSelectEvent,
  };
};
