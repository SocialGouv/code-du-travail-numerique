import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent } from "../../../lib";

export enum MatomoFeedbackEventSecondary {
  FEEDBACK = "feedback",
  FEEDBACK_SUGGESTION = "feedback_suggestion",
  FEEDBACK_CATEGORY = "feedback_category",
}

export enum MatomoFeedbackEventTertiary {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

export type MatomoFeedbackEventCategory =
  | "unclear"
  | "unrelated"
  | "unsatisfied"
  | "wrong";

export const useFeedbackEvents = () => {
  const emitFeedback = (isPositive: boolean, baseUrl: string) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoFeedbackEventSecondary.FEEDBACK,
      isPositive
        ? MatomoFeedbackEventTertiary.POSITIVE
        : MatomoFeedbackEventTertiary.NEGATIVE,
      baseUrl,
    ]);
  };

  const emitFeedbackSuggestion = (suggestion: string, baseUrl: string) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoFeedbackEventSecondary.FEEDBACK_SUGGESTION,
      suggestion,
      baseUrl,
    ]);
  };

  const emitFeedbackCategory = (
    category: MatomoFeedbackEventCategory,
    baseUrl: string
  ) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoFeedbackEventSecondary.FEEDBACK_CATEGORY,
      category,
      baseUrl,
    ]);
  };
  return { emitFeedback, emitFeedbackSuggestion, emitFeedbackCategory };
};
