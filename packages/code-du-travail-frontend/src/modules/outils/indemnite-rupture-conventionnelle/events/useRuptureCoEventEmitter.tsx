import { useEffect } from "react";
import { EventType, eventEmitter } from "../../common/events";
import { sendEvent } from "@socialgouv/matomo-next";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";

export const useRuptureCoEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_INELIGIBLE_RESULT, () => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        name: MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
