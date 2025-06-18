import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "src/lib";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { push as matopush } from "@socialgouv/matomo-next";
import { EventType } from "src/modules/outils/common/events/events";

export const usePreavisDemissionEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_RESULT_EVENT, (isEligible) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoActionEvent.PREAVIS_DEMISSION,
        isEligible ? "result" : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      ]);
    });

    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      trackQuestion(titre, MatomoActionEvent.PREAVIS_DEMISSION);
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
