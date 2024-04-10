import { useEffect } from "react";
import { IndemniteDepartStepName } from "../../outils/CommonIndemniteDepart";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "..";
import { eventEmitter, EventType } from "./emitter";
import { push as matopush } from "@socialgouv/matomo-next";

export const useRuptureCoEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.SEND_RESULT_EVENT, (isEligible) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        isEligible
          ? IndemniteDepartStepName.Resultat
          : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      ]);
    });

    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      trackQuestion(titre, MatomoActionEvent.RUPTURE_CONVENTIONNELLE);
    });

    return () => {
      eventEmitter.unsubscribe(EventType.SEND_RESULT_EVENT);
      eventEmitter.unsubscribe(EventType.TRACK_QUESTION);
    };
  }, []);
};
