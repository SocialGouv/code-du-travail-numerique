import { useEffect } from "react";
import { IndemniteDepartStepName } from "../../CommonIndemniteDepart";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "../../../lib";
import { eventEmitter } from "../../CommonIndemniteDepart/events/emitter";
import { push as matopush } from "@socialgouv/matomo-next";
import { EventType } from "../../CommonIndemniteDepart/events/events";

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
