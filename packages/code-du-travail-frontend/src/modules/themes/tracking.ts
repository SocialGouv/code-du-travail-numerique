import { sendEvent } from "../utils";
import { getRouteBySource, routeBySource } from "@socialgouv/cdtn-utils";

enum MatomoThemeCategory {
  SELECT_RESULT = "selectResult",
}

export const useThemeTracking = () => {
  const emitDocumentClickButtonEvent = (
    source: keyof typeof routeBySource | "external",
    slug: string,
    externalUrl?: string
  ) => {
    sendEvent({
      category: MatomoThemeCategory.SELECT_RESULT,
      action: JSON.stringify({
        url:
          externalUrl ||
          `/${getRouteBySource(source as keyof typeof routeBySource)}/${slug}`,
      }),
    });
  };

  return {
    emitDocumentClickButtonEvent,
  };
};
