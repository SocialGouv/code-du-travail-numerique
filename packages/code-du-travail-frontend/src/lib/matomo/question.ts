import { push as matopush } from "@socialgouv/matomo-next";

import { MatomoActionEvent, MatomoBaseEvent, MatomoMapping } from ".";

export const trackQuestion = (
  trackTitle: string | null,
  simulatorEvent: MatomoActionEvent,
  isTrackingHelp = true
): void => {
  // FIXME: add other simulator events
  if (simulatorEvent !== MatomoActionEvent.PREAVIS_RETRAITE) {
    return;
  }
  MatomoMapping.forEach((mappingElement) => {
    if (
      trackTitle &&
      mappingElement.questionLabels.includes(trackTitle.toLowerCase())
    ) {
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
