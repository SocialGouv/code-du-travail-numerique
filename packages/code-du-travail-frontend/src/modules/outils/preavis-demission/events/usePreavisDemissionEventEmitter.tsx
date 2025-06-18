import { useEffect } from "react";
import { MatomoActionEvent, MatomoBaseEvent } from "src/lib";
import { eventEmitter } from "src/modules/outils/common/events/emitter";
import { EventType } from "src/modules/outils/common/events/events";
import {
  TrackingContributionCategory,
  TrackingAgreementSearchAction,
} from "src/modules/contributions/tracking";
import { sendEvent } from "src/modules/utils";

export const usePreavisDemissionEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.PREAVIS_DEMISSION,
        name: "select_" + titre,
      });
    });

    eventEmitter.subscribe(EventType.CC_BLOCK_USER, () => {
      sendEvent({
        category: TrackingContributionCategory.TOOL,
        action: MatomoActionEvent.PREAVIS_DEMISSION,
        name: TrackingAgreementSearchAction.CC_BLOCK_USER,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
