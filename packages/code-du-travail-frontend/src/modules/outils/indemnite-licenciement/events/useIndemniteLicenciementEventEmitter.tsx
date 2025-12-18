import { useEffect } from "react";
import { EventType, eventEmitter } from "../../common/events";
import { sendEvent } from "@socialgouv/matomo-next";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/modules/analytics";

export const useIndemniteLicenciementEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_INELIGIBLE_RESULT, () => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.INDEMNITE_LICENCIEMENT,
        name: MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
