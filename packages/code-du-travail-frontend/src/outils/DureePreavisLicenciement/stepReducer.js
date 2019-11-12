import { StepIntro } from "./steps/Introduction";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepResult } from "./steps/Result";
import { StepInformations } from "./steps/Informations";
import { StepStatus } from "./steps/Status";

export const initialSteps = [
  {
    component: StepIntro,
    name: "intro",
    label: "Introduction"
  },
  {
    component: StepStatus,
    name: "situation",
    label: "Situation du salarié"
  },
  {
    component: StepInfoCCn,
    name: "info_cc",
    label: "Convention collective",
    isOptionnal: false
  },
  {
    component: StepInformations,
    name: "infos",
    label: "Informations complémentaires"
  },
  {
    component: StepResult,
    name: "results",
    label: "Durée du préavis"
  }
];

export function stepReducer(steps, { type }) {
  switch (type) {
    case "reset": {
      return [...initialSteps];
    }
    default:
      console.warn("action unknow", type);
      return steps;
  }
}
