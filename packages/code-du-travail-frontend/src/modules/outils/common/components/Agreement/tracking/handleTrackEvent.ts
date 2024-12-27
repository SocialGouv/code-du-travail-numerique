import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { UserAction } from "../../../ConventionCollective/types";

const handleTrackEvent = (
  title: string,
  action: UserAction,
  extra?: unknown
): void => {
  switch (action) {
    case UserAction.OpenAgreementHelp:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_HELP,
        "click_cc_search_help_p1",
        title,
      ]);
      break;
    case UserAction.OpenEnterpriseHelp:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH_HELP,
        "click_cc_search_help_p2",
        title,
      ]);
      break;
    case UserAction.SearchEnterprise:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        title,
        JSON.stringify(extra),
      ]);
      break;
    case UserAction.SearchAgreement:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        title,
        JSON.stringify(extra),
      ]);
      break;
  }
};

export default handleTrackEvent;
