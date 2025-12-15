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
}

enum MatomoSearchAction {
  PRESEARCH = "presearch",
  CLIK_SEE_ALL_RESULTS = "clickSeeAllResults",
  SELECT_PRESEARCH_RESULT = "selectPresearchResult",
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

  const emitSearchEvent = useCallback((searchTerm: string) => {
    if (searchTerm?.trim()) {
      sendEvent({
        category: MatomoSearchCategory.CANDIDATE_RESULTS,
        action: searchTerm.trim(),
      });
    }
  }, []);

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

  const emitPresearchEvent = useCallback(
    (query: string, classes: PresearchClass[]) => {
      const name = JSON.stringify({
        query: query.trim(),
        classes,
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
    (query: string, classes?: PresearchClass[]) => {
      const name = JSON.stringify({
        query: query.trim(),
        classes,
      });
      sendEvent({
        category: MatomoSearchCategory.SEARCH,
        action: MatomoSearchAction.CLIK_SEE_ALL_RESULTS,
        name,
      });
    },
    []
  );

  const emitSelectPresearchResultEvent = useCallback((result: SearchResult) => {
    const name = JSON.stringify({
      algo: result.algo || "presearch",
      classe: result.class,
      url: `/${getRouteBySource(result.source)}/${result.slug}`,
    });

    sendEvent({
      category: MatomoSearchCategory.SEARCH,
      action: MatomoSearchAction.SELECT_PRESEARCH_RESULT,
      name,
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
    emitClickSeeAllResultsEvent,
  };
};
