import { useEffect } from "react";
import { IndemniteDepartStepName } from "..";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "../../../lib";
import { eventEmitter, EventType } from "./emitter";
import { push as matopush } from "@socialgouv/matomo-next";

export const useIndemniteLicenciementEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_RESULT_EVENT, (isEligible) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoActionEvent.INDEMNITE_LICENCIEMENT,
        isEligible
          ? IndemniteDepartStepName.Resultat
          : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      ]);
    });
    return () => {
      eventEmitter.unsubscribe(EventType.SEND_RESULT_EVENT);
    };
  }, []);
};
