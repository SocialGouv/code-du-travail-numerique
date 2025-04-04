import { sendEvent } from "../utils";
import { getRouteBySource, routeBySource } from "@socialgouv/cdtn-utils";

enum MatomoThemeCategory {
  SELECT_RESULT = "selectResult",
}

export const useThemeTracking = () => {
  const emitDocumentClickButtonEvent = (
    source: keyof typeof routeBySource,
    slug: string
  ) => {
    sendEvent({
      category: MatomoThemeCategory.SELECT_RESULT,
      action: JSON.stringify({ url: `/${getRouteBySource(source)}/${slug}` }),
    });
  };

  return {
    emitDocumentClickButtonEvent,
  };
};
