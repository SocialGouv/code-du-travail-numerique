import { getNextQuestion, stateToPublicode } from "./helpers";
import { PreavisRetraiteStore, Question } from "../types";
import { PreavisRetraiteFormState } from "../../form";
import { UpdateFormValues } from "../utils";

const removeNotValidQuestion = (
  answerQuestionName: string,
  currentQuestions: Question[]
): {
  new: Question[];
  removedNames?: Question[];
} => {
  const question = currentQuestions.findIndex(
    (item) => item.name === answerQuestionName
  );
  if (question != 1) {
    // Question has been already answered
    return {
      new: currentQuestions.slice(0, question + 1),
      removedNames: currentQuestions.slice(question + 1),
    };
  }
  return {
    new: currentQuestions,
  };
};

const removeOutdatedAnswers = (
  values: PreavisRetraiteFormState,
  removedQuestions: Question[] | undefined
) => {
  if (removedQuestions) {
    const newValues = { ...values };
    removedQuestions.forEach((question) => {
      if (newValues.infos) {
        delete newValues.infos[question.name];
      }
    });
    return newValues;
  }
  return values;
};

const computeNextQuestion = (
  state: PreavisRetraiteStore,
  removeQuestionFromForm: UpdateFormValues,
  answeredQuestionName: string
): PreavisRetraiteStore => {
  const result = removeNotValidQuestion(
    answeredQuestionName,
    state.steps.informations.questions
  );
  if (result.removedNames && result.removedNames.length > 0) {
    removeQuestionFromForm(
      result.removedNames.map((item) => ({ name: `infos.${item.name}` }))
    );
  }
  const currentQuestions = result.new;
  const newSituation = stateToPublicode(
    removeOutdatedAnswers(state.formValues, result.removedNames)
  );
  console.log("New situation: ", newSituation);
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
