import {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
  PreavisRetraiteStepLabel,
} from "./types";
import { CommonActionName } from "../Components/Simulator/types";
import {
  PublicodesContextType,
  PublicodesPreavisRetraiteResult,
} from "../publicodes";
import originReducer from "./steps/OriginStep/reducer";
import { informationReducer } from "./steps/InformationStep";
import { seniorityReducer } from "./steps/SeniorityStep";
import { resultReducer } from "./steps";

export const initialState: PreavisRetraiteState = {
  currentStepIndex: 0,
  steps: [
    {
      name: "intro",
      label: PreavisRetraiteStepLabel.intro,
    },
    {
      name: "origine",
      label: PreavisRetraiteStepLabel.origin,
    },
    {
      name: "ccn",
      label: PreavisRetraiteStepLabel.agreement,
    },
    {
      name: "infos",
      label: PreavisRetraiteStepLabel.infos,
    },
    {
      name: "anciennete",
      label: PreavisRetraiteStepLabel.seniority,
    },
    {
      name: "result",
      label: PreavisRetraiteStepLabel.result,
    },
  ],
  origin: {
    showWarning: false,
  },
  seniority: {
    showAccurateSeniority: false,
    minYearCount: 2,
  },
  informations: {
    questions: [],
  },
};

export const stepReducer =
  (publicodes: PublicodesContextType<PublicodesPreavisRetraiteResult>) =>
  (
    state: PreavisRetraiteState,
    action: PreavisRetraiteAction<PreavisRetraiteFormState>
  ): PreavisRetraiteState => {
    if (
      action.type === CommonActionName.onChange ||
      action.type === CommonActionName.changeStep
    ) {
      switch (action.payload.currentStep.step.label) {
        case PreavisRetraiteStepLabel.origin:
          return originReducer(state, action);
        case PreavisRetraiteStepLabel.infos:
          return informationReducer(state, action, publicodes);
        case PreavisRetraiteStepLabel.seniority:
          return seniorityReducer(state, action);
        case PreavisRetraiteStepLabel.result:
          return resultReducer(state, action, publicodes);
        default:
          return state;
      }
    }
    return state;
  };
