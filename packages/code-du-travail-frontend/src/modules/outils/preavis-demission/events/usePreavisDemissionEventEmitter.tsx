import { useEffect } from "react";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { EventType } from "src/modules/outils/common/events/events";
import { TrackingContributionCategory } from "src/modules/contributions/tracking";
import { sendEvent } from "@socialgouv/matomo-next";
import { MatomoActionEvent, MatomoAgreementEvent } from "src/modules/analytics";

export const usePreavisDemissionEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.CC_BLOCK_USER, () => {
      sendEvent({
        category: TrackingContributionCategory.TOOL,
        action: MatomoActionEvent.PREAVIS_DEMISSION,
        name: MatomoAgreementEvent.CC_BLOCK_USER,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
