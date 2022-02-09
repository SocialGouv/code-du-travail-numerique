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
      trackEvent("cc_search_help", "click_cc_search_help_p1", title, uuid);
      break;
    case UserAction.OpenEnterpriseHelp:
      trackEvent("cc_search_help", "click_cc_search_help_p2", title, uuid);
      break;
    case UserAction.SelectEnterprise:
      trackEvent("enterprise_select", title, JSON.stringify(extra), uuid);
      break;
    case UserAction.SelectAgreement:
      trackEvent("cc_select_p2", title, extra as string, uuid);
      break;
    case UserAction.SearchEnterprise:
      trackEvent("enterprise_search", title, JSON.stringify(extra), uuid);
      break;
    case UserAction.SearchAgreement:
      trackEvent("cc_search", title, JSON.stringify(extra), uuid);
      break;
    case UserAction.SelectAgreementRoute:
      trackEvent("cc_search_type_of_users", "click_p1", title, uuid);
      break;
    case UserAction.SelectEnterpriseRoute:
      trackEvent("cc_search_type_of_users", "click_p2", title, uuid);
      break;
  }
};

export default handleTrackEvent;
