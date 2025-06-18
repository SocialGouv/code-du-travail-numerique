import { useEffect } from "react";
import { MatomoActionEvent, MatomoBaseEvent } from "src/lib";
import { EventType, eventEmitter } from "../../common/events";
import { sendEvent } from "src/modules/utils";

export const usePreavisRetraiteEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(EventType.TRACK_QUESTION, (titre) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoActionEvent.PREAVIS_RETRAITE,
        name: "select_" + titre,
      });
    });

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
