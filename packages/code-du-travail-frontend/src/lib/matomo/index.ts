import {
  MatomoCommonEvent,
  MatomoPreavisRetraiteEvent,
  MatomoPreavisRetraiteTrackTitle,
} from "../../outils/common/type/matomo";
import { matopush } from "../../piwik";

const MatomoMappingRetraiteHelpEvent = {
  [MatomoPreavisRetraiteTrackTitle.ANCIENNETE]:
    MatomoPreavisRetraiteEvent.CLICK_HELP_ANCIENNETE,
  [MatomoPreavisRetraiteTrackTitle.CAT_PRO]:
    MatomoPreavisRetraiteEvent.CLICK_HELP_BUTTON_CAT_PRO,
  [MatomoPreavisRetraiteTrackTitle.ECHELON]:
    MatomoPreavisRetraiteEvent.CLICK_HELP_ECHELON,
  [MatomoPreavisRetraiteTrackTitle.GROUPE]:
    MatomoPreavisRetraiteEvent.CLICK_HELP_GROUPE,
};

export const trackHelpQuestionRetraite = (
  trackTitle: string | MatomoPreavisRetraiteTrackTitle
): void => {
  const event: MatomoPreavisRetraiteEvent =
    MatomoMappingRetraiteHelpEvent[trackTitle];
  if (event) {
    matopush([
      MatomoCommonEvent.TRACK_EVENT,
      MatomoCommonEvent.OUTIL,
      MatomoPreavisRetraiteEvent.ACTION,
      event,
    ]);
  }
};

const MatomoMappingRetraiteSelectEvent = {
  [MatomoPreavisRetraiteTrackTitle.CAT_PRO]:
    MatomoPreavisRetraiteEvent.SELECT_CAT_PRO,
  [MatomoPreavisRetraiteTrackTitle.ECHELON]:
    MatomoPreavisRetraiteEvent.SELECT_ECHELON,
  [MatomoPreavisRetraiteTrackTitle.GROUPE]:
    MatomoPreavisRetraiteEvent.SELECT_GROUPE,
};

export const trackSelectQuestionRetraite = (
  trackTitle: string | MatomoPreavisRetraiteTrackTitle
): void => {
  const event: MatomoPreavisRetraiteEvent =
    MatomoMappingRetraiteSelectEvent[trackTitle];
  if (event) {
    matopush([
      MatomoCommonEvent.TRACK_EVENT,
      MatomoCommonEvent.OUTIL,
      MatomoPreavisRetraiteEvent.ACTION,
      event,
    ]);
  }
};
