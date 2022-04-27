import { stateToPublicode } from "../../stateToPublicodes";
import { PreavisRetraiteStore, Question } from "../types";
import { Publicodes } from "@socialgouv/modeles-social/bin";
import { PublicodesPreavisRetraiteResult } from "@socialgouv/modeles-social/bin/publicodes/types";
import { PreavisRetraiteFormState } from "../../form";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const getNextMissingQuestion = (
  currentQuestion: Question[],
  publicodes: Publicodes<PublicodesPreavisRetraiteResult>
) => {
  const nextQuestion = publicodes.data.missingArgs
    .filter((item) => !excludedRules.includes(item.name))
    .slice(0, 1)
    .map((item): Question => {
      return {
        name: item.name,
        rule: item.rawNode,
      };
    });
  if (nextQuestion.length > 0) {
    if (
      currentQuestion.find((question) => question.name === nextQuestion[0].name)
    ) {
      return [];
    }
    return nextQuestion;
  }
  return [];
};

const removeNotValidQuestion = (
  answerQuestionName: string | undefined,
  currentQuestions: Question[]
): {
  new: Question[];
  removedNames?: string[];
} => {
  if (!answerQuestionName) {
    return {
      new: [],
      removedNames: ["infos"],
    };
  }
  const question = currentQuestions.findIndex(
    (item) => item.name === answerQuestionName
  );
  if (question != 1) {
    // Question has been already answered
    return {
      new: currentQuestions.slice(0, question + 1),
      removedNames: currentQuestions
        .slice(question + 1)
        .map((item) => `infos.${item.name}`),
    };
  }
  return {
    new: currentQuestions,
  };
};

const removeOutdatedQuestionFromFormState = (
  values: PreavisRetraiteFormState,
  removedQuestions: string[] | undefined
) => {
  if (removedQuestions) {
    const newValues = { ...values };
    removedQuestions.forEach((name) => {
      if (newValues.infos) {
        delete newValues.infos[name];
      }
    });
    return newValues;
  }
  return values;
};

const computeInfoQuestions = (
  state: PreavisRetraiteStore,
  removeQuestionFromForm: (names: string[]) => void,
  answeredQuestionName?: string
): PreavisRetraiteStore => {
  const result = removeNotValidQuestion(
    answeredQuestionName,
    state.steps.informations.questions
  );
  if (result.removedNames && result.removedNames.length > 0) {
    removeQuestionFromForm(result.removedNames);
  }
  const currentQuestions = result.new;
  const publicodes = state.publicodes;
  publicodes.setSituation(
    stateToPublicode(
      removeOutdatedQuestionFromFormState(state.formValues, result.removedNames)
    )
  );

  const missingArgs = getNextMissingQuestion(currentQuestions, publicodes);
  return {
    ...state,
    steps: {
      ...state.steps,
      informations: {
        questions: currentQuestions.concat(missingArgs),
      },
    },
  };
};

export default computeInfoQuestions;
