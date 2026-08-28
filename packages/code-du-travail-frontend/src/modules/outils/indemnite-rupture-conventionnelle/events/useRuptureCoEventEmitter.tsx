import { useEffect } from "react";
import { EventType, eventEmitter } from "../../common/events";
import { useTracking } from "src/modules/analytics/events/useTracking";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

export const useRuptureCoEventEmitter = () => {
  const { track } = useTracking();

  useEffect(() => {
    // Résultat « non éligible » : mesure le taux de simulations conclues sans
    // droit.
    eventEmitter.subscribe(EventType.SEND_INELIGIBLE_RESULT, () => {
      track("view_result_ineligible", {
        simulator: SimulatorTitle.INDEMNITE_RUPTURE_CONVENTIONNELLE,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, [track]);
};
