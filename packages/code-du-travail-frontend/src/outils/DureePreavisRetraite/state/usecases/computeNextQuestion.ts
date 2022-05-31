import { stateToPublicode } from "./helpers";
import { PreavisRetraiteStore, Question } from "../types";
import { MissingArgs } from "@socialgouv/modeles-social";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

export const getNextQuestion = (
  missingArgs: MissingArgs[],
  currentQuestions?: Question[]
) => {
  const nextQuestion = missingArgs
    .filter((item) => !excludedRules.includes(item.name))
    .slice(0, 1)
    .map(
      (item): Question => ({
        name: item.name,
        rule: item.rawNode,
      })
    );
  if (!currentQuestions) {
    return nextQuestion;
  }
  if (nextQuestion.length > 0) {
    if (
      currentQuestions.find(
        (question) => question.name === nextQuestion[0].name
      )
    ) {
      return [];
    }
    return nextQuestion;
  }
  return [];
};

const computeNextQuestion = (
  state: PreavisRetraiteStore
): PreavisRetraiteStore => {
  const currentQuestions = state.steps.informations.questions;
  const newSituation = stateToPublicode(state.formValues);
  const missingQuestions = getNextQuestion(
    state.publicodes.setSituation(newSituation).missingArgs,
    currentQuestions
  );
  const newQuestions = currentQuestions.concat(missingQuestions);
  return {
    ...state,
    steps: {
      ...state.steps,
      informations: {
        questions: newQuestions,
      },
    },
  };
};

export default computeNextQuestion;
