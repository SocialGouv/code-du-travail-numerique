import {
  Action,
  ActionName,
  FormContent,
  State,
} from "../common/type/WizardType";
import Steps from "./steps";

// Add only idcc number for Agreement asking for additional information
const supportedCcn = [16, 29, 44, 176, 275, 292, 413, 573];
// Add only idcc number for Agreement skipping the information step in case of 'départ à la retraite'
const excludedCcnFromVoluntaryPath = [44, 573];

export const initialState: State = {
  stepIndex: 0,
  steps: [
    {
      component: Steps.IntroductionStep,
      label: "Introduction",
      name: "intro",
    },
    {
      component: Steps.OrigineStep,
      label: "Origine du départ à la retraite",
      name: "origine",
    },
    {
      component: Steps.ConventionCollective,
      label: "Convention collective",
      name: "ccn",
    },
    {
      component: Steps.Informations,
      label: "Informations",
      name: "infos",
      skip: (values: FormContent): boolean => {
        if (
          excludedCcnFromVoluntaryPath.includes(values.ccn.num) &&
          values["contrat salarié - mise à la retraite"] === "non"
        )
          return true;
        return !values.ccn || !supportedCcn.includes(values.ccn.num);
      },
    },
    {
      component: Steps.AncienneteStep,
      label: "Ancienneté",
      name: "anciennete",
    },
    {
      component: Steps.ResultStep,
      label: "Résultat",
      name: "result",
    },
  ],
};

export function stepReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionName.reset: {
      return { ...initialState };
    }
    case ActionName.setStepIndex: {
      return { stepIndex: action.payload, steps: state.steps };
    }
    default:
      console.warn("action unknown", action);
      return state;
  }
}
