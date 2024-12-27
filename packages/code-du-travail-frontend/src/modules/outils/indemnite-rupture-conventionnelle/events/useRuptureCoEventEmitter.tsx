import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "src/lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { IndemniteDepartStepName } from "../../common/indemnite-depart";
import { EventType, eventEmitter } from "../../common/indemnite-depart/events";

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
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
