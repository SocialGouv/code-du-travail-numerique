import { useEffect } from "react";
import { MatomoActionEvent, MatomoAgreementEvent } from "src/lib";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { EventType } from "src/modules/outils/common/events/events";
import { TrackingContributionCategory } from "src/modules/contributions/tracking";
import { sendEvent } from "src/modules/utils";

export const useHeuresRechercheEmploiEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.CC_BLOCK_USER, () => {
      sendEvent({
        category: TrackingContributionCategory.TOOL,
        action: MatomoActionEvent.HEURES_RECHERCHE_EMPLOI,
        name: MatomoAgreementEvent.CC_BLOCK_USER,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
