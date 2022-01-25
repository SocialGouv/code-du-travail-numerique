import { matopush } from "../../piwik";
import { MatomoBaseEvent, MatomoMapping, MatomoRetirementEvent } from ".";

export const trackQuestion = (
  trackTitle: string,
  isTrackingHelp = true
): void => {
  MatomoMapping.forEach((v) => {
    if (v.synonyms.includes(trackTitle)) {
      if (v.helpEvent && isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          MatomoRetirementEvent.ACTION,
          v.helpEvent,
        ]);
      } else if (v.selectEvent && !isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          MatomoRetirementEvent.ACTION,
          v.selectEvent,
        ]);
      }
    }
  });
};
