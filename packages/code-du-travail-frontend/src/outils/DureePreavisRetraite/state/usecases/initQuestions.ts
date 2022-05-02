import { PreavisRetraiteStore } from "../types";
import { getNextQuestion, stateToPublicode } from "./helpers";
import { UpdateFormValues } from "../utils";

const initQuestions = (
  state: PreavisRetraiteStore,
  removeQuestionFromForm: UpdateFormValues
): PreavisRetraiteStore => {
  removeQuestionFromForm([{ name: "infos" }]);
  const situation = stateToPublicode({
    ...state.formValues,
    // Reset infos
    infos: {},
  });
  console.log("New situation: ", situation);
  const publicodes = state.publicodes;
  const data = publicodes.setSituation(situation);
  console.log("New data", data);
  const missingQuestion = getNextQuestion(data.missingArgs);
  console.log("Init questions: ", missingQuestion);
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
