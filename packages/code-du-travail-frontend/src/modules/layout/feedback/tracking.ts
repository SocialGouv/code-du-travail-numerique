"use client";

import { useTracking } from "../../analytics/events/useTracking";

// Motifs du parcours « cette page ne m'a pas été utile ».
//
// L'ancien schéma envoyait la PHRASE FRANÇAISE complète comme action Matomo
// (`Les informations me semblent fausses.`) : accents, espaces et point final se
// retrouvaient encodés dans les URLs de tracking et les exports CSV, et le
// moindre ajustement de libellé cassait la série. La clé stable devient la
// donnée envoyée, la phrase reste l'affaire de l'UI.
export enum FeedbackReason {
  UNCLEAR = "unclear",
  UNRELATED = "unrelated",
  UNSATISFIED = "unsatisfied",
  WRONG = "wrong",
}

export const FEEDBACK_REASON_LABELS: Readonly<Record<FeedbackReason, string>> =
  {
    [FeedbackReason.UNCLEAR]: "Les informations ne sont pas claires.",
    [FeedbackReason.UNRELATED]:
      "Cette page ne correspond pas à ma recherche ou à ma situation.",
    [FeedbackReason.UNSATISFIED]:
      "Je ne suis pas satisfait de cette réglementation.",
    [FeedbackReason.WRONG]: "Les informations me semblent fausses.",
  };

export const useFeedbackEvents = () => {
  const { track } = useTracking();

  const emitPositiveFeedback = () => {
    track("submit_feedback_positive");
  };

  const emitNegativeFeedback = () => {
    track("submit_feedback_negative");
  };

  const emitFeedbackSuggestion = (suggestion: string) => {
    track("submit_feedback_comment", { comment: suggestion });
  };

  const emitFeedbackCategory = (reason: FeedbackReason) => {
    track("submit_feedback_reason", { reason });
  };

  return {
    emitPositiveFeedback,
    emitNegativeFeedback,
    emitFeedbackSuggestion,
    emitFeedbackCategory,
  };
};
