import { StepAnciennete } from "./steps/Anciennete";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepIntro } from "./steps/Introduction";
import { StepResult } from "./steps/Result";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      label: "Introduction",
      name: "intro",
    },
    {
      component: StepInfoCCn,
      label: "Convention collective",
      name: "info_cc",
    },
    {
      component: StepAnciennete,
      label: "Ancienneté",
      name: "anciennete",
    },
    {
      component: StepResult,
      label: "Résultat",
      name: "results",
    },
  ],
};

export function stepReducer(state, { type, payload }) {
  switch (type) {
    case "reset": {
      return { ...initialState };
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps: state.steps };
    }
    default:
      console.warn("action unknow", type);
      return state;
  }
}
