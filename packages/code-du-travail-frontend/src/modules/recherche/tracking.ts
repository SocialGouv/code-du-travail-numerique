import { sendEvent } from "../utils";
import {
  getRouteBySource,
  routeBySource,
  SOURCES,
} from "@socialgouv/cdtn-utils";
import { useCallback } from "react";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../../lib/matomo/types";

enum MatomoSearchCategory {
  CANDIDATE_RESULTS = "candidateResults",
  CANDIDATE_SUGGESTIONS = "candidateSuggestions",
  SELECTED_SUGGESTION = "selectedSuggestion",
  NEXT_RESULT_PAGE = "nextResultPage",
  SELECT_RESULT = "selectResult",
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
    console.log("searchTerm", searchTerm);
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
    (query: string, suggestion: string, suggestions: string[]) => {
      sendEvent({
        category: MatomoSearchCategory.SELECTED_SUGGESTION,
        action: query,
        name: suggestion,
      });
      sendEvent({
        category: MatomoSearchCategory.CANDIDATE_SUGGESTIONS,
        action: suggestions.join("###"),
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

  return {
    emitResultSelectionEvent,
    emitSearchEvent,
    emitNextPageEvent,
    emitSuggestionSelectionEvent,
    emitWidgetEvent,
  };
};
