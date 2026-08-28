import { useTracking } from "src/modules/analytics/events/useTracking";

// L'ancien schéma dupliquait toute la famille de catégories pour la rupture
// conventionnelle (`feedback_simulateurs` / `feedback_simulateurs_rupture_co`,
// `feedback_suggestion` / `feedback_suggestion_rupture_co`). Le simulateur
// devient une clé de payload : une seule action par question, quel que soit le
// simulateur.
export enum SIMULATOR_FEEDBACK_CONTEXT {
  indemniteLicenciement = "Indemnité de licenciement",
  ruptureConventionnelle = "Indemnité de rupture conventionnelle",
}

export enum FEEDBACK_QUESTION {
  GLOBAL = "global",
  EASINESS = "easiness",
  QUESTION_CLARITY = "question_clarity",
  RESULT_CLARITY = "result_clarity",
}

export enum FEEDBACK_RESULT {
  NOT_GOOD = "pas_bien",
  AVERAGE = "moyen",
  GOOD = "très_bien",
  // New values for 5-point scale
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}

// Les questions notées 1 à 5 renseignent aussi `value`, pour obtenir la moyenne
// dans Matomo. La réponse reste dans le payload : `value` n'est jamais le seul
// porteur d'une information (Matomo ne conserve pas une value de 0, et
// n'expose que des sommes et des moyennes).
const numericAnswer = (feedback: FEEDBACK_RESULT): number | undefined => {
  const parsed = Number(feedback);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const useFeedbackEvents = () => {
  const { track } = useTracking();

  // Une branche par question, avec l'action en littéral, plutôt qu'une table de
  // correspondance : l'extraction statique des events (@socialgouv/cdtn-stats)
  // lit l'AST, et une action passée par un index de map lui apparaît comme une
  // valeur runtime — les quatre questions disparaîtraient du catalogue au profit
  // d'une seule ligne `<ACTION_BY_QUESTION[question]>`. Même motif que
  // `pushAgreementEvents`.
  const trackFeedback = (
    question: FEEDBACK_QUESTION,
    feedback: FEEDBACK_RESULT,
    simulator: SIMULATOR_FEEDBACK_CONTEXT
  ) => {
    const payload = { simulator, answer: feedback };
    const value = numericAnswer(feedback);

    switch (question) {
      case FEEDBACK_QUESTION.GLOBAL:
        track("submit_simulator_feedback_global", payload, value);
        break;
      case FEEDBACK_QUESTION.EASINESS:
        track("submit_simulator_feedback_easiness", payload, value);
        break;
      case FEEDBACK_QUESTION.QUESTION_CLARITY:
        track("submit_simulator_feedback_question_clarity", payload, value);
        break;
      case FEEDBACK_QUESTION.RESULT_CLARITY:
        track("submit_simulator_feedback_result_clarity", payload, value);
        break;
    }
  };

  const trackFeedbackText = (
    text: string,
    simulator: SIMULATOR_FEEDBACK_CONTEXT
  ) => {
    track("submit_simulator_feedback_comment", { simulator, comment: text });
  };

  return {
    trackFeedback,
    trackFeedbackText,
  };
};
