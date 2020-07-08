import { Result } from "./Result";
import { Step } from "./Step";

export const steps = [
  {
    component: Step,
    condition: ({ inaptitude = false }) => inaptitude === false,
    label: "Informations particulières",
    name: "branche_infos",
  },
  {
    component: Result,
    label: "Indemnité conventionnelle",
    name: "branche_result",
  },
];
