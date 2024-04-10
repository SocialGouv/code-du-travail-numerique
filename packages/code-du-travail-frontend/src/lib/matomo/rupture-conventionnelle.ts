import { useEffect } from "react";
import { IndemniteDepartStepName } from "../../outils/CommonIndemniteDepart";
import { MatomoActionEvent, MatomoBaseEvent, MatomoSimulatorEvent } from "..";
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
    return () => {
      eventEmitter.unsubscribe(EventType.SEND_RESULT_EVENT);
    };
  }, []);
};
