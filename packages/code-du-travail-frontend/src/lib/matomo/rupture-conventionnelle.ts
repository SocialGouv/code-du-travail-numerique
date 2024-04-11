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
    eventEmitter.subscribe(GlobalEvent.RUPTURE_CONVENTIONNELLE, (data) => {
      switch (data.name) {
        case EventType.SEND_RESULT_EVENT: {
          const { isEligible } = data.properties;
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.OUTIL,
            MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
            isEligible
              ? IndemniteDepartStepName.Resultat
              : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
          ]);
          break;
        }
        case EventType.TRACK_QUESTION:
          const { titre } = data.properties;
          trackQuestion(titre, MatomoActionEvent.RUPTURE_CONVENTIONNELLE);
          break;
      }
    });

    return () => {
      eventEmitter.unsubscribe(GlobalEvent.RUPTURE_CONVENTIONNELLE);
    };
  }, []);
};
