import { MatomoSearchAgreementCategory } from "../../../lib";
import { TrackEventFn } from "../common/TrackingContext";
import { UserAction } from "../types";

const handleTrackEvent = (
  trackEvent: TrackEventFn,
  uuid: string,
  title: string,
  action: UserAction,
  extra?: unknown
): void => {
  switch (action) {
    case UserAction.OpenAgreementHelp:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_HELP,
        "click_cc_search_help_p1",
        title,
        uuid
      );
      break;
    case UserAction.OpenEnterpriseHelp:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_HELP,
        "click_cc_search_help_p2",
        title,
        uuid
      );
      break;
    case UserAction.SelectEnterprise:
      trackEvent(
        MatomoSearchAgreementCategory.ENTERPRISE_SELECT,
        title,
        JSON.stringify(extra),
        uuid
      );
      break;
    case UserAction.SelectAgreement:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2,
        title,
        extra as string,
        uuid
      );
      break;
    case UserAction.SearchEnterprise:
      trackEvent(
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        title,
        JSON.stringify(extra),
        uuid
      );
      break;
    case UserAction.SearchAgreement:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        title,
        JSON.stringify(extra),
        uuid
      );
      break;
    case UserAction.SelectAgreementRoute:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        "click_p1",
        title,
        uuid
      );
      break;
    case UserAction.SelectEnterpriseRoute:
      trackEvent(
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
        "click_p2",
        title,
        uuid
      );
      break;
  }
};

export default handleTrackEvent;
