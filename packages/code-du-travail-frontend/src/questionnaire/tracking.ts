import { MatomoBaseEvent, MatomoBaseAction } from "../lib/matomo";
import { matopush } from "../piwik";

export enum MatomoDismissalProcessAction {
  AGREEMENT_SEARCH_HELP = "cc_search_help",
  ENTERPRISE_SELECT = "enterprise_select",
  AGREEMENT_SELECT_P1 = "cc_select_p1",
  AGREEMENT_SELECT_P2 = "cc_select_p2",
  ENTERPRISE_SEARCH = "enterprise_search",
  AGREEMENT_SEARCH = "cc_search",
  AGREEMENT_SEARCH_TYPE_OF_USERS = "cc_search_type_of_users",
}

const questionnaireTrackingName = "comprendre sa procédure de licenciement";

export const pushViewQuestion = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.VIEW}_question_${trackingName}`,
  ]);
};

export const pushSelectResponse = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.SELECT}_${trackingName}`,
  ]);
};

export const pushClickHelp = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.CLICK}_${trackingName}`,
  ]);
};

export const pushClickViewPageInfo = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.SELECT}_${trackingName}`,
  ]);
};
