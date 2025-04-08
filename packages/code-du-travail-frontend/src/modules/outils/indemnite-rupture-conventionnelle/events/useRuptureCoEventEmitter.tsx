import { useEffect } from "react";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackQuestion,
} from "src/lib";
import { IndemniteDepartStepName } from "../../indemnite-depart";
import { EventType, eventEmitter } from "../../indemnite-depart/events";
import { sendEvent } from "src/modules/utils";

export const useRuptureCoEventEmitter = () => {
  useEffect(() => {
    const resultHandler = (isEligible: boolean) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        name: isEligible
          ? IndemniteDepartStepName.Resultat
          : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
    };

    const questionHandler = (titre: string) => {
      trackQuestion(titre, MatomoActionEvent.RUPTURE_CONVENTIONNELLE);
    };

    const trackResultHandler = () => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoSimulatorEvent.CLICK_CALCUL_DETAIL,
      });
    };

    eventEmitter.subscribe(EventType.SEND_RESULT_EVENT, resultHandler);
    eventEmitter.subscribe(EventType.TRACK_QUESTION, questionHandler);
    eventEmitter.subscribe(EventType.TRACK_RESULT, trackResultHandler);

    return () => {
      eventEmitter.unsubscribe(EventType.SEND_RESULT_EVENT, resultHandler);
      eventEmitter.unsubscribe(EventType.TRACK_QUESTION, questionHandler);
      eventEmitter.unsubscribe(EventType.TRACK_RESULT, trackResultHandler);
    };
  }, []);
};
