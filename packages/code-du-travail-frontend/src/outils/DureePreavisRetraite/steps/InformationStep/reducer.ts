import {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
  Question,
} from "../../types";
import {
  PublicodesContextType,
  PublicodesPreavisRetraiteResult,
} from "../../../publicodes";
import { CommonActionName } from "../../../Components/Simulator/types";
import { stateToPublicode } from "../../stateToPublicodes";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const getNextMissingQuestion = (
  currentQuestion: Question[],
  publicodes: PublicodesContextType<PublicodesPreavisRetraiteResult>
) => {
  const nextQuestion = publicodes.missingArgs
    .filter((item) => !excludedRules.includes(item.name))
    .slice(0, 1)
    .map((item) => {
      return {
        answered: false,
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

const informationReducer = (
  state: PreavisRetraiteState,
  action: PreavisRetraiteAction<PreavisRetraiteFormState>,
  publicodes: PublicodesContextType<PublicodesPreavisRetraiteResult>
) => {
  if (
    action.type === CommonActionName.onChange ||
    action.type === CommonActionName.changeStep
  ) {
    publicodes.setSituation(stateToPublicode(action.payload.values));
    const currentQuestions = state.informations.questions;
    console.log(
      "Missing args: ",
      publicodes.missingArgs,
      " for action ",
      action.type
    );
    const missingArgs = getNextMissingQuestion(currentQuestions, publicodes);
    return {
      ...state,
      informations: {
        questions: currentQuestions.concat(missingArgs),
      },
    };
  }
  return state;
};

export default informationReducer;
