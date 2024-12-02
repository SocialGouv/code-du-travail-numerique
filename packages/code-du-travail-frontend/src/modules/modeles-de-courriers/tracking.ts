import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoActionEvent, MatomoBaseEvent } from "../../lib";
import { useCallback } from "react";

export const useModeleEvents = (slug) => {
  return useCallback(() => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.PAGE_MODELS,
      MatomoActionEvent.TYPE_CTRL_C,
      slug,
    ]);
  }, []);
};
