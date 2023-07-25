import { MatomoBaseEvent, MatomoBaseAction } from "../lib/matomo";
import { push as matopush } from "@socialgouv/matomo-next";

const EVENT_CATEGORY = "feedback_simulateurs";
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

export const trackFeedback = (
  event: EVENT_ACTION,
  feedback: FEEDBACK_RESULT
) => {
  matopush([MatomoBaseEvent.TRACK_EVENT, EVENT_CATEGORY, event, feedback]);
};

export const trackFeedbackText = (text: string) => {
  matopush([
    MatomoBaseEvent.TRACK_EVENT,
    EVENT_CATEGORY,
    EVENT_ACTION.SUGGESTION,
    text,
  ]);
};
