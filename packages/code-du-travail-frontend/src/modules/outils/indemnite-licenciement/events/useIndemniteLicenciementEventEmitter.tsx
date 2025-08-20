import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/lib";
import { EventType, eventEmitter } from "../../common/events";
import { sendEvent } from "src/modules/utils";

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
