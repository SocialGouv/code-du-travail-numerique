import { getRouteBySource, routeBySource } from "@socialgouv/cdtn-utils";
import { useTracking } from "../analytics/events/useTracking";

export const useThemeTracking = () => {
  const { track } = useTracking();

  // Clic sur une carte de document depuis une page thème. `target` = la page
  // ATTEINTE (le `path` du payload porte déjà la page de départ) : chemin
  // canonique sans slash initial pour un contenu du site, URL telle quelle pour
  // une destination externe.
  const emitDocumentClickButtonEvent = (
    source: keyof typeof routeBySource | "external",
    slug: string,
    externalUrl?: string
  ) => {
    track("select_result", {
      target:
        externalUrl ||
        `${getRouteBySource(source as keyof typeof routeBySource)}/${slug}`,
    });
  };

  return {
    emitDocumentClickButtonEvent,
  };
};
