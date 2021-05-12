import { Action, ActionName, State } from "../common/type/WizardType";
import Steps from "./steps";

const supportedCcn = [16, 29, 44, 176, 292];

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
      skip: (values) => !values.ccn || !supportedCcn.includes(values.ccn.num),
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
