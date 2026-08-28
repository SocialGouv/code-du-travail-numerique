import { routeBySource } from "@socialgouv/cdtn-utils";
import { useCallback, useRef } from "react";
import { push } from "@socialgouv/matomo-next";
import { PresearchClass, SearchResult } from "src/api";
import { useTracking } from "../analytics/events/useTracking";
import { toEventName } from "../analytics/eventName";
import { generateSearchLink } from "./utils";

export const useSearchTracking = () => {
  const { track } = useTracking();
  const lastFullsearchKeyRef = useRef<string | null>(null);

  // Clic sur une carte de résultat de la page /recherche (documents et « Pour
  // aller plus loin »). `target` = la page atteinte.
  const emitResultSelectionEvent = useCallback(
    (
      source: keyof typeof routeBySource | "external",
      slug: string,
      url?: string,
      algo?: string,
      parentSlug?: string
    ) => {
      const formattedUrl = generateSearchLink(
        source as keyof typeof routeBySource,
        slug,
        url,
        parentSlug
      );

      track("select_result", { algo, target: toEventName(formattedUrl) });
    },
    [track]
  );

  const emitFullsearchEvent = useCallback(
    (searchTerm: string, queryClass: string) => {
      if (searchTerm?.trim()) {
        track("search_full", { query: searchTerm.trim(), class: queryClass });
      }
    },
    [track]
  );

  // Émet FULL_SEARCH au plus une fois par couple {query, class} sur la durée de
  // vie du composant : /recherche re-rend à chaque changement de filtre.
  const emitFullsearchEventOnce = useCallback(
    (searchTerm: string, queryClass: string) => {
      const normalizedQuery = searchTerm?.trim();
      if (!normalizedQuery) {
        return;
      }

      const key = `${normalizedQuery}::${queryClass}`;
      if (lastFullsearchKeyRef.current === key) {
        return;
      }
      lastFullsearchKeyRef.current = key;

      track("search_full", { query: normalizedQuery, class: queryClass });
    },
    [track]
  );

  const emitNextPageEvent = useCallback(
    (query: string) => {
      track("next_result_page", { query });
    },
    [track]
  );

  const emitSuggestionSelectionEvent = useCallback(
    (query: string, suggestion: string) => {
      track("select_suggestion", { query, suggestion });
    },
    [track]
  );

  const emitWidgetLogoClickEvent = useCallback(() => {
    track("widget_click_logo");
  }, [track]);

  const emitWidgetSubmitSearchEvent = useCallback(
    (query: string) => {
      track("widget_submit_search", { query });
    },
    [track]
  );

  const emitPresearchEvent = useCallback(
    (query: string, queryClass: PresearchClass, definition?: string) => {
      track("search_instant", {
        query: query.trim(),
        class: queryClass,
        definition,
      });
    },
    [track]
  );

  const emitClickSeeAllResultsEvent = useCallback(
    (query: string, queryClass?: PresearchClass) => {
      track("click_all_results", { query: query.trim(), class: queryClass });
    },
    [track]
  );

  const emitSelectPresearchResultEvent = useCallback(
    (result: SearchResult, queryClass: string) => {
      const url = generateSearchLink(
        result.source,
        result.slug,
        result.url,
        result.parentSlug
      );

      track("select_instant_result", {
        algo: result.algo,
        class: queryClass,
        target: toEventName(url),
      });
    },
    [track]
  );

  // Recherche interne NATIVE de Matomo, pas un trackEvent : elle alimente son
  // propre rapport et reste donc hors du contrat category/action/name. Appelée
  // explicitement en pré-recherche (modale) ; sur /recherche, matomo-next la
  // déclenche automatiquement à la visite.
  const emitMatomoTrackSiteSearch = useCallback((query: string) => {
    push(["trackSiteSearch", query]);
  }, []);

  return {
    emitResultSelectionEvent,
    emitNextPageEvent,
    emitSuggestionSelectionEvent,
    emitWidgetLogoClickEvent,
    emitWidgetSubmitSearchEvent,
    emitPresearchEvent,
    emitSelectPresearchResultEvent,
    emitClickSeeAllResultsEvent,
    emitFullsearchEvent,
    emitFullsearchEventOnce,
    emitMatomoTrackSiteSearch,
  };
};
