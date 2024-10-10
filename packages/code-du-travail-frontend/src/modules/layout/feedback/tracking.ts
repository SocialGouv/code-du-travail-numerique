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

export type FeedbackActionChoiceValue =
  | "unclear"
  | "unrelated"
  | "unsatisfied"
  | "wrong";

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
