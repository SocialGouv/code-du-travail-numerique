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
    eventEmitter.subscribe(EventType.SEND_RESULT_EVENT, (isEligible) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.RUPTURE_CONVENTIONNELLE,
        name: isEligible
          ? IndemniteDepartStepName.Resultat
          : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      });
    });

    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      trackQuestion(titre, MatomoActionEvent.RUPTURE_CONVENTIONNELLE);
    });

    eventEmitter.subscribe(EventType.TRACK_RESULT, () => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoSimulatorEvent.CLICK_CALCUL_DETAIL,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
