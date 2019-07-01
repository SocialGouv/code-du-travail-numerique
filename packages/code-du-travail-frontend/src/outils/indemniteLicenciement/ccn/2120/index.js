import { Step } from "./Step";
import { Result } from "./Result";

export const steps = [
  {
    component: Step,
    name: "branche_infos",
    label: "Informations particulières",
    condition: ({ inaptitude = false }) => inaptitude === false
  },
  {
    component: Result,
    name: "branche_result",
    label: "Indemnité conventionnelle"
  }
];
