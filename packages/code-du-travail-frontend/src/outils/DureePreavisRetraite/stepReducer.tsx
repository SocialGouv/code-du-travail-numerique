import { Action, ActionName, State } from "../common/type/WizardType";
import Steps from "./steps";
import IntroAnnotation from "./steps/component/IntroAnnotation";

export const initialState: State = {
  stepIndex: 0,
  steps: [
    {
      annotation: IntroAnnotation,
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
