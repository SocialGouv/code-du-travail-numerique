import { matopush } from "../../piwik";
import { MatomoActionEvent, MatomoBaseEvent, MatomoMapping } from ".";

export const trackQuestion = (
  trackTitle: string,
  simulatorEvent: MatomoActionEvent,
  isTrackingHelp = true
): void => {
  MatomoMapping.forEach((v) => {
    if (v.synonyms.includes(trackTitle)) {
      if (v.helpEvent && isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          simulatorEvent,
          v.helpEvent,
        ]);
      } else if (v.selectEvent && !isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          simulatorEvent,
          v.selectEvent,
        ]);
      }
    }
  });
};
