import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "src/lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { eventEmitter, EventType } from "../../common/indemnite-depart/events";
import { IndemniteDepartStepName } from "../../common/indemnite-depart";

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

    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      trackQuestion(titre, MatomoActionEvent.INDEMNITE_LICENCIEMENT);
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
