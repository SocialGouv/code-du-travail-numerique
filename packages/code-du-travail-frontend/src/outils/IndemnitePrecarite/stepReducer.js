import { StepIntro } from "./steps/Introduction";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepRemuneration } from "./steps/Remuneration";
import { StepIndemnite } from "./steps/Indemnite";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      name: "intro",
      label: "Introduction"
    },
    {
      component: StepInfoCCn,
      name: "info_cc",
      label: "Convention collective"
    },
    {
      component: StepInfosGenerales,
      name: "info_generales",
      label: "Informations générales"
    },
    {
      component: StepRemuneration,
      name: "remuneration",
      label: "Rémunération"
    },
    {
      component: StepIndemnite,
      name: "indemnite",
      label: "Indemnité"
    }
  ]
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
