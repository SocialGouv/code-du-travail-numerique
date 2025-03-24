import { sendEvent } from "src/modules/utils";

export enum EVENT_CATEGORY {
  indemniteLicenciement = "feedback_simulateurs",
  ruptureConventionnelle = "feedback_simulateurs_rupture_co",
}

export enum EVENT_SUGGESTION {
  indemniteLicenciement = "feedback_suggestion",
  ruptureConventionnelle = "feedback_suggestion_rupture_co",
}

export enum EVENT_ACTION {
  GLOBAL = "Comment_s_est_passée_la_simulation",
  EASINESS = "Facilité_utilisation_simulateur",
  QUESTION_CLARITY = "Clarté_questions",
  RESULT_CLARITY = "Clarté_résultat",
  SUGGESTION = "Suggestion",
}

export enum FEEDBACK_RESULT {
  NOT_GOOD = "pas_bien",
  NOT_AT_ALL = "pas_du_tout",
  AVERAGE = "moyen",
  GOOD = "très_bien",
  EASY = "facile",
  YES = "oui",
}

export const useFeedbackEvents = () => {
  const trackFeedback = (
    event: EVENT_ACTION,
    feedback: FEEDBACK_RESULT,
    category: EVENT_CATEGORY
  ) => {
    sendEvent({
      category: category,
      action: event,
      name: feedback,
    });
  };

  const trackFeedbackText = (
    text: string,
    url: string,
    category: EVENT_CATEGORY
  ) => {
    sendEvent({
      category:
        category === EVENT_CATEGORY.indemniteLicenciement
          ? EVENT_SUGGESTION.indemniteLicenciement
          : EVENT_SUGGESTION.ruptureConventionnelle,
      action: text,
      name: url.replace(/\?.*$/, ""),
    });
  };

  return {
    trackFeedback,
    trackFeedbackText,
  };
};
