import { useEffect } from "react";
import { MatomoSearchAgreementCategory } from "src/lib";
import { sendEvent } from "src/modules/utils";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { eventEmitter, EventType } from "src/modules/outils/common/events";

export const useAgreementEventEmitter = () => {
  useEffect(() => {
    eventEmitter.subscribe(
      EventType.SEND_AGREEMENT_SEARCH,
      (simulator: PublicodesSimulator, query: string) => {
        sendEvent({
          category: MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
          action: simulator,
          name: JSON.stringify({
            query,
          }),
        });
      }
    );

    eventEmitter.subscribe(
      EventType.SEND_ENTERPRISE_SEARCH,
      (simulator: PublicodesSimulator, query: string) => {
        sendEvent({
          category: MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
          action: simulator,
          name: JSON.stringify({
            query,
          }),
        });
      }
    );

    return () => {
      eventEmitter.unsubscribeAll();
    };
  }, []);
};
