import { StepIntro } from "./steps/Introduction";
import { StepResult } from "./steps/Result";
import { StepInformations } from "./steps/Informations";

const stepResult = {
  component: StepResult,
  name: "result",
  label: "Durée du préavis"
};
export const initialSteps = [
  {
    component: StepIntro,
    name: "intro",
    label: "Introduction"
  },
  {
    component: StepInformations,
    name: "infos",
    label: "Informations"
  },
  {
    component: StepResult,
    name: "results",
    label: "Délais de préavis"
  }
];

export function stepReducer(steps, { type, payload }) {
  switch (type) {
    case "reset": {
      return [...initialSteps];
    }
    case "add_branche": {
      // replace the last step with new steps
      return steps
        .slice(0, -1)
        .filter(step => !/branche_/.test(step.name))
        .concat(...payload);
    }
    case "remove_branche": {
      // remove branch specific step and add stepResult
      return steps
        .filter(step => !/branche_/.test(step.name))
        .concat(stepResult);
    }
    default:
      console.warn("action unknow", type);
      return steps;
  }
}
