import { sendEvent } from "../utils/events";

enum LayoutCategory {
  SELECTED_SUGGESTION = "selectedSuggestion",
  CANDIDATE_SUGGESTIONS = "candidateSuggestions",
}

export const useLayoutTracking = () => {
  const emitSuggestionEvent = (
    query: string,
    suggestion: string,
    suggestions: string[]
  ) => {
    sendEvent({
      category: LayoutCategory.SELECTED_SUGGESTION,
      action: query,
      value: suggestion,
    });
    sendEvent({
      category: LayoutCategory.CANDIDATE_SUGGESTIONS,
      action: suggestions.join("###"),
    });
  };

  return {
    emitSuggestionEvent,
  };
};
