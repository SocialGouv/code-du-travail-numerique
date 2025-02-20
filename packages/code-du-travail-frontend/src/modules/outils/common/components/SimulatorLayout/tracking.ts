import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/lib";
import { sendEvent } from "src/modules/utils";

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
