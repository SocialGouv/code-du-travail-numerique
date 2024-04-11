import { useEffect } from "react";
import { IndemniteDepartStepName } from "../../outils/CommonIndemniteDepart";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "..";
import { eventEmitter, EventType, GlobalEvent } from "./emitter";
import { push as matopush } from "@socialgouv/matomo-next";

export const useRuptureCoEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(GlobalEvent.INDEMNITE_LICENCIEMENT, (data) => {
      switch (data.name) {
        case EventType.SEND_RESULT_EVENT: {
          const { isEligible } = data.properties;
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.OUTIL,
            MatomoActionEvent.INDEMNITE_LICENCIEMENT,
            isEligible
              ? IndemniteDepartStepName.Resultat
              : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
          ]);
          break;
        }
        case EventType.TRACK_QUESTION:
          const { titre } = data.properties;
          trackQuestion(titre, MatomoActionEvent.INDEMNITE_LICENCIEMENT);
          break;
      }
    });

    return () => {
      eventEmitter.unsubscribe(GlobalEvent.INDEMNITE_LICENCIEMENT);
    };
  }, []);
};
