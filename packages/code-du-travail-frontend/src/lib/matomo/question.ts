import { matopush } from "../../piwik";
import {
  MatomoBaseEvent,
  MatomoMapping,
  MatomoRetirementEvent,
  MatomoSimulatorEvent,
} from ".";

export const trackQuestion = (
  trackTitle: string,
  isTrackingHelp = true
): void => {
  const key: number = Object.values(MatomoMapping).findIndex((value) =>
    value.synonyms.includes(trackTitle)
  );
  if (key !== -1) {
    const event: MatomoSimulatorEvent =
      MatomoMappingHelpEvent[Object.keys(MatomoMappingHelpEvent)[key]];
    if (event) {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoRetirementEvent.ACTION,
        event,
      ]);
    }
  }
};
