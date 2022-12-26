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

const questionnaireTrackingName =
  "view_step_Comprendre sa procédure de licenciement";
const infoPageTrackingName = "procedures_licenciement";

export const trackViewQuestion = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.VIEW}_question_${trackingName}`,
  ]);
};

export const trackSelectResponse = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.SELECT}_${trackingName}`,
  ]);
};

export const trackClickHelp = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.CLICK}_help_${trackingName}`,
  ]);
};

export const trackClickViewPageInfo = () => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.OUTIL,
    questionnaireTrackingName,
    `${MatomoBaseAction.CLICK}_afficher_les_infos_personnalisées`,
  ]);
};

export const trackClickInfoPageTab = (trackingName: string) => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    MatomoBaseEvent.PAGE_INFORMATION,
    infoPageTrackingName,
    `${MatomoBaseAction.CLICK}_onglet_${trackingName}`,
  ]);
};
