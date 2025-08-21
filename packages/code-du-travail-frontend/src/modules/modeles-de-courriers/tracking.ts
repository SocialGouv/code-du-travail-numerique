import { push as matopush } from "@socialgouv/matomo-next";
import { useCallback } from "react";
import { MatomoBaseEvent, MatomoActionEvent } from "../analytics";

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
