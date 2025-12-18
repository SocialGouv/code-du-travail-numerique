import { sendEvent } from "@socialgouv/matomo-next";
import { useCallback } from "react";
import { MatomoBaseEvent, MatomoActionEvent } from "../analytics";

export const useModeleEvents = (slug) => {
  return useCallback(() => {
    sendEvent({
      category: MatomoBaseEvent.PAGE_MODELS,
      action: MatomoActionEvent.TYPE_CTRL_C,
      name: slug,
    });
  }, []);
};
