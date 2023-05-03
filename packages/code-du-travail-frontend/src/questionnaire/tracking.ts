import { MatomoBaseEvent, MatomoBaseAction } from "../lib/matomo";
import { push as matopush } from "@socialgouv/matomo-next";

const questionnaireTrackingName = "comprendre_sa_procedure_de_licenciement";
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
