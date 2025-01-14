import { MatomoActionEvent, MatomoBaseEvent, MatomoMapping } from ".";
import { sendEvent } from "src/modules/utils";

export const trackQuestion = (
  trackTitle: string | null,
  simulatorEvent?: MatomoActionEvent,
  isTrackingHelp = true
): void => {
  if (!simulatorEvent) {
    return;
  }
  MatomoMapping.forEach((mappingElement) => {
    if (
      trackTitle &&
      mappingElement.questionLabels.includes(trackTitle.toLowerCase())
    ) {
      if (mappingElement.helpEvent && isTrackingHelp) {
        sendEvent({
          category: MatomoBaseEvent.OUTIL,
          action: simulatorEvent,
          name: mappingElement.helpEvent,
        });
      } else if (mappingElement.selectEvent && !isTrackingHelp) {
        sendEvent({
          category: MatomoBaseEvent.OUTIL,
          action: simulatorEvent,
          name: mappingElement.selectEvent,
        });
      }
    }
  });
};
