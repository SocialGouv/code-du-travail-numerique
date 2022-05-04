import {PreavisRetraiteStore} from "../types";
import {getNextQuestion, stateToPublicode} from "./helpers";
import {UpdateFormValues} from "../utils";

const initQuestions = (
  state: PreavisRetraiteStore,
  removeQuestionFromForm: UpdateFormValues,
): PreavisRetraiteStore => {
  removeQuestionFromForm([{name: "infos"}]);
  const situation = stateToPublicode({
    ...state.formValues,
    // Reset infos
    infos: {},
  });
  const data = state.publicodes.setSituation(situation);
  const missingQuestion = getNextQuestion(data.missingArgs);
  return {
    ...state,
    steps: {
      ...state.steps,
      informations: {
        questions: missingQuestion,
      },
    },
  };
};

export default initQuestions;
