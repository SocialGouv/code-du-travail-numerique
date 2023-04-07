import { Origin, PreavisRetraiteStore } from "../types";

const resetInfosLastQuestionNotAnsweredOnOriginChange = (
  oldOrigin: Origin | null,
  newOrigin: Origin | null,
  state: PreavisRetraiteStore
): PreavisRetraiteStore => {
  if (newOrigin === null && oldOrigin === null) {
    return state;
  }
  if (newOrigin !== null && oldOrigin !== null && newOrigin === oldOrigin) {
    return state;
  }

  if (state.steps.informations.questions.length > 0) {
    const answers = state.formValues.infos;
    const questions = [...state.steps.informations.questions];
    const lastQuestion = questions.pop();
    if (lastQuestion && !answers?.hasOwnProperty(lastQuestion.name)) {
      // remove the last question not answered
      return {
        ...state,
        steps: {
          ...state.steps,
          informations: {
            ...state.steps.informations,
            questions,
          },
        },
      };
    }
  }

  return state;
};

export default resetInfosLastQuestionNotAnsweredOnOriginChange;
