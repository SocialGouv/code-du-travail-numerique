import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "src/lib";
import { EventType, eventEmitter } from "../../common/events";
import { sendEvent } from "src/modules/utils";

export const useRuptureCoEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_INELIGIBLE_RESULT, () => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        name: MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
    });

    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        name: "select_" + titre,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
