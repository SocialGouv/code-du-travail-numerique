import { StepIndemnite } from "./steps/Indemnite";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepInfosGenerales } from "./steps/InfosGenerales";
import { StepIntro } from "./steps/Introduction";
import { StepRemuneration } from "./steps/Remuneration";

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
      component: StepInfosGenerales,
      isForm: true,
      label: "Informations générales",
      name: "info_generales",
    },
    {
      component: StepRemuneration,
      isForm: true,
      label: "Rémunération",
      name: "remuneration",
    },
    {
      component: StepIndemnite,
      label: "Indemnité",
      name: "indemnite",
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
