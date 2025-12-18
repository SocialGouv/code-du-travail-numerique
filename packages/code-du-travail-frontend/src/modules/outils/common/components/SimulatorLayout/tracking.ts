import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";
import { sendEvent } from "@socialgouv/matomo-next";

export const useSimulatorLayoutTracking = () => {
  const emitNextPreviousEvent = (
    title: string,
    isPrevious: boolean,
    currentStepName: string
  ) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: isPrevious
        ? MatomoActionEvent.CLICK_PREVIOUS + `_${title}`
        : MatomoActionEvent.VIEW_STEP + `_${title}`,
      name: currentStepName,
    });
  };

  const emitPrintEvent = (simulatorTitle: string) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoSimulatorEvent.CLICK_PRINT,
      name: simulatorTitle,
    });
  };

  return {
    emitNextPreviousEvent,
    emitPrintEvent,
  };
};
