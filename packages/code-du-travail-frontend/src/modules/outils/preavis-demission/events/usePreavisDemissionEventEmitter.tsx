import { useEffect } from "react";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { EventType } from "src/modules/outils/common/events/events";
import { useTracking } from "src/modules/analytics/events/useTracking";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

export const usePreavisDemissionEventEmitter = () => {
  const { track } = useTracking();

  useEffect(() => {
    // Convention collective BLOQUANTE : mesure le volume d'usagers bloqués faute
    // de CC traitée.
    eventEmitter.subscribe(EventType.CC_BLOCK_USER, () => {
      track("block_on_agreement", {
        simulator: SimulatorTitle.PREAVIS_DEMISSION,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, [track]);
};
