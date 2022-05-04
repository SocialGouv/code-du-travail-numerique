import { Question } from "../../types";
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
    .map((item): Question => {
      return {
        name: item.name,
        rule: item.rawNode,
      };
    });
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
