"use client";

import { usePathname } from "next/navigation";
import { sendEvent } from "../../utils/events";

enum FeedbackCategoryEvent {
  FEEDBACK = "feedback",
  FEEDBACK_SUGGESTION = "feedback_suggestion",
  FEEDBACK_CATEGORY = "feedback_category",
}

enum FeedbackActionEvent {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

export enum FeedbackActionChoiceValue {
  "unclear" = "Les informations ne sont pas claires.",
  "unrelated" = "Cette page ne correspond pas à ma recherche ou à ma situation.",
  "unsatisfied" = "Je ne suis pas satisfait de cette réglementation.",
  "wrong" = "Les informations me semblent fausses.",
}

export const useFeedbackEvents = () => {
  const baseUrl = usePathname();

  const emitPositiveFeedback = () => {
    if (baseUrl) {
      sendEvent({
        category: FeedbackCategoryEvent.FEEDBACK,
        action: FeedbackActionEvent.POSITIVE,
        name: baseUrl,
      });
    }
  };

  const emitNegativeFeedback = () => {
    if (baseUrl) {
      sendEvent({
        category: FeedbackCategoryEvent.FEEDBACK,
        action: FeedbackActionEvent.NEGATIVE,
        name: baseUrl,
      });
    }
  };

  const emitFeedbackSuggestion = (suggestion: string) => {
    if (baseUrl) {
      sendEvent({
        category: FeedbackCategoryEvent.FEEDBACK_SUGGESTION,
        action: suggestion,
        name: baseUrl,
      });
    }
  };

  const emitFeedbackCategory = (category: FeedbackActionChoiceValue) => {
    if (baseUrl) {
      sendEvent({
        category: FeedbackCategoryEvent.FEEDBACK_CATEGORY,
        action: category,
        name: baseUrl,
      });
    }
  };

  return {
    emitPositiveFeedback,
    emitNegativeFeedback,
    emitFeedbackSuggestion,
    emitFeedbackCategory,
  };
};
