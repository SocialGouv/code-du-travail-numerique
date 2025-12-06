import { sendEvent } from "../utils";
import {
  getRouteBySource,
  routeBySource,
  SOURCES,
} from "@socialgouv/cdtn-utils";
import { useCallback } from "react";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../analytics/types";
import {
  SearchResult,
  PresearchClass,
} from "src/api/modules/search/service/presearch";

enum MatomoSearchCategory {
  SEARCH = "search",
  CANDIDATE_RESULTS = "candidateResults",
  SELECTED_SUGGESTION = "selectedSuggestion",
  NEXT_RESULT_PAGE = "nextResultPage",
  SELECT_RESULT = "selectResult",
  SELECT_PRESEARCH_RESULT = "selectPresearchResult",
}

enum MatomoSearchAction {
  PRESEARCH = "presearch",
}

export enum MatomoWidgetEvent {
  CLICK_LOGO = "click_logo",
  SUBMIT_SEARCH = "submit_search",
}

export const useSearchTracking = () => {
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

  const emitSearchEvent = useCallback(
    (searchTerm: string, classes?: string[]) => {
      if (searchTerm?.trim()) {
        if (classes && classes.length > 0) {
          // For v2 with classes
          sendEvent({
            category: MatomoSearchCategory.CANDIDATE_RESULTS,
            action: searchTerm.trim(),
            name: JSON.stringify(classes),
          });
        } else {
          // For v1 without classes
          sendEvent({
            category: MatomoSearchCategory.CANDIDATE_RESULTS,
            action: searchTerm.trim(),
          });
        }
      }
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

  const emitWidgetEvent = useCallback((event: MatomoWidgetEvent) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.WIDGET_SEARCH,
      event,
    ]);
  }, []);

  // V2 specific events
  const emitPresearchEvent = useCallback(
    (query: string, classes: PresearchClass[]) => {
      if (query?.trim() && classes.length > 0) {
        sendEvent({
          category: MatomoSearchCategory.SEARCH,
          action: MatomoSearchAction.PRESEARCH,
          name: JSON.stringify(classes),
          value: query.trim(),
        });
      }
    },
    []
  );

  const emitSelectPresearchResultEvent = useCallback((result: SearchResult) => {
    const source = result.source as keyof typeof routeBySource | "external";

    const url =
      source === SOURCES.EXTERNALS && result.slug
        ? result.slug
        : `/${getRouteBySource(source as keyof typeof routeBySource)}/${result.slug}`;

    const action = JSON.stringify({
      algo: result.algo || "presearch",
      classe: result.class,
      url,
    });

    sendEvent({
      category: MatomoSearchCategory.SELECT_PRESEARCH_RESULT,
      action,
    });
  }, []);

  return {
    emitResultSelectionEvent,
    emitSearchEvent,
    emitNextPageEvent,
    emitSuggestionSelectionEvent,
    emitWidgetEvent,
    emitPresearchEvent,
    emitSelectPresearchResultEvent,
  };
};
