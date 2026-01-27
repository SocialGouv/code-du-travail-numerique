import {
  getRouteBySource,
  routeBySource,
  SOURCES,
} from "@socialgouv/cdtn-utils";
import { useCallback, useRef } from "react";
import { sendEvent, push } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../analytics/types";
import { PresearchClass, SearchResult } from "src/api";

enum MatomoSearchCategory {
  SEARCH = "search",
  CANDIDATE_RESULTS = "candidateResults",
  SELECTED_SUGGESTION = "selectedSuggestion",
  NEXT_RESULT_PAGE = "nextResultPage",
  SELECT_RESULT = "selectResult",
}

enum MatomoSearchAction {
  PRESEARCH = "presearch",
  FULL_SEARCH = "fullsearch",
  CLICK_SEE_ALL_RESULTS = "clickSeeAllResults",
  SELECT_PRESEARCH_RESULT = "selectPresearchResult",
}

export enum MatomoWidgetEvent {
  CLICK_LOGO = "click_logo",
  SUBMIT_SEARCH = "submit_search",
}

export const useSearchTracking = () => {
  const lastFullsearchKeyRef = useRef<string | null>(null);

  const emitResultSelectionEvent = useCallback(
    (
      source: keyof typeof routeBySource | "external",
      slug: string,
      url?: string,
      algo?: string
    ) => {
      const formattedUrl =
        source === SOURCES.EXTERNALS && url
          ? url
          : `/${getRouteBySource(source as keyof typeof routeBySource)}/${slug}`;

      sendEvent({
        category: MatomoSearchCategory.SELECT_RESULT,
        action: JSON.stringify({
          algo,
          url: formattedUrl,
        }),
      });
    },
    []
  );

  const emitFullsearchEvent = useCallback(
    (searchTerm: string, queryClass: string) => {
      if (searchTerm?.trim()) {
        const name = JSON.stringify({
          query: searchTerm.trim(),
          class: queryClass,
        });

        sendEvent({
          category: MatomoSearchCategory.SEARCH,
          action: MatomoSearchAction.FULL_SEARCH,
          name,
        });
      }
    },
    []
  );

  // Emits the FULL_SEARCH event at most once for a given {query, class} pair
  // during the current component lifetime.
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

      const name = JSON.stringify({
        query: normalizedQuery,
        class: queryClass,
      });

      sendEvent({
        category: MatomoSearchCategory.SEARCH,
        action: MatomoSearchAction.FULL_SEARCH,
        name,
      });
    },
    []
  );

  const emitNextPageEvent = useCallback((query: string) => {
    sendEvent({
      category: MatomoSearchCategory.NEXT_RESULT_PAGE,
      action: query,
    });
  }, []);

  const emitSuggestionSelectionEvent = useCallback(
    (query: string, suggestion: string) => {
      sendEvent({
        category: MatomoSearchCategory.SELECTED_SUGGESTION,
        action: query,
        name: suggestion,
      });
    },
    []
  );

  const emitWidgetEvent = useCallback(
    (event: MatomoWidgetEvent, query?: string) => {
      sendEvent({
        category: MatomoBaseEvent.WIDGET_SEARCH,
        action: event,
        name: query || "",
      });
    },
    []
  );

  const emitPresearchEvent = useCallback(
    (query: string, queryClass: PresearchClass) => {
      const name = JSON.stringify({
        query: query.trim(),
        class: queryClass,
      });
      sendEvent({
        category: MatomoSearchCategory.SEARCH,
        action: MatomoSearchAction.PRESEARCH,
        name,
      });
    },
    []
  );

  const emitClickSeeAllResultsEvent = useCallback(
    (query: string, queryClass?: PresearchClass) => {
      const name = JSON.stringify({
        query: query.trim(),
        class: queryClass,
      });
      sendEvent({
        category: MatomoSearchCategory.SEARCH,
        action: MatomoSearchAction.CLICK_SEE_ALL_RESULTS,
        name,
      });
    },
    []
  );

  const emitSelectPresearchResultEvent = useCallback(
    (result: SearchResult, queryClass: string) => {
      const name = JSON.stringify({
        algo: result.algo,
        queryClass,
        url: `/${getRouteBySource(result.source)}/${result.slug}`,
      });

      sendEvent({
        category: MatomoSearchCategory.SEARCH,
        action: MatomoSearchAction.SELECT_PRESEARCH_RESULT,
        name,
      });
    },
    []
  );

  // standard search event for Matomo, called explicitly in Modal Presearch context
  // otherwise, it's triggered automatically by matomo-next when visiting /recherche page path
  const emitMatomoTrackSiteSearch = useCallback((query: string) => {
    push(["trackSiteSearch", query]);
  }, []);

  return {
    emitResultSelectionEvent,
    emitNextPageEvent,
    emitSuggestionSelectionEvent,
    emitWidgetEvent,
    emitPresearchEvent,
    emitSelectPresearchResultEvent,
    emitClickSeeAllResultsEvent,
    emitFullsearchEvent,
    emitFullsearchEventOnce,
    emitMatomoTrackSiteSearch,
  };
};
