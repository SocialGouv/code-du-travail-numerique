import { useEffect } from "react";
import { EventType, eventEmitter } from "../../common/events";
import { useTracking } from "src/modules/analytics/events/useTracking";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

export const useIndemniteLicenciementEventEmitter = () => {
  const { track } = useTracking();

  useEffect(() => {
    // Résultat « non éligible » : l'ancienneté, les informations ou les absences
    // déclarées ne permettent pas d'indemnité. Mesure le taux de simulations
    // conclues sans droit.
    eventEmitter.subscribe(EventType.SEND_INELIGIBLE_RESULT, () => {
      track("view_result_ineligible", {
        simulator: SimulatorTitle.INDEMNITE_LICENCIEMENT,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, [track]);
};
