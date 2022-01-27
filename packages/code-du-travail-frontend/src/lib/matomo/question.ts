import { matopush } from "../../piwik";
import { MatomoActionEvent, MatomoBaseEvent, MatomoMapping } from ".";

export const trackQuestion = (
  trackTitle: string,
  simulatorEvent: MatomoActionEvent,
  isTrackingHelp = true
): void => {
  MatomoMapping.forEach((mappingElement) => {
    if (mappingElement.questionLabels.includes(trackTitle)) {
      if (mappingElement.helpEvent && isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          simulatorEvent,
          mappingElement.helpEvent,
        ]);
      } else if (mappingElement.selectEvent && !isTrackingHelp) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          simulatorEvent,
          mappingElement.selectEvent,
        ]);
      }
    }
  });
};
