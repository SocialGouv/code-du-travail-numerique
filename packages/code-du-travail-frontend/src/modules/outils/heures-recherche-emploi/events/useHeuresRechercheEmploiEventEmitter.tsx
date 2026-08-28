import { useEffect } from "react";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { EventType } from "src/modules/outils/common/events/events";
import { useTracking } from "src/modules/analytics/events/useTracking";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

export const useHeuresRechercheEmploiEventEmitter = () => {
  const { track } = useTracking();

  useEffect(() => {
    // Convention collective BLOQUANTE : la CC saisie n'est pas prise en charge
    // et renvoie l'usager vers la consultation de sa convention. Mesure le
    // volume d'usagers bloqués faute de CC traitée.
    eventEmitter.subscribe(EventType.CC_BLOCK_USER, () => {
      track("block_on_agreement", {
        simulator: SimulatorTitle.HEURES_RECHERCHE_EMPLOI,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, [track]);
};
