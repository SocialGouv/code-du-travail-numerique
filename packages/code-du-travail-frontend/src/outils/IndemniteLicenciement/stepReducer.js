import { StepInfo } from "./steps/Info";
import { StepIndemnite } from "./steps/Indemnite";
import { StepIntro } from "./steps/Introduction";
import { StepAnciennete } from "./steps/Anciennete";
import { StepSalaires } from "./steps/Salaires";
import { StepPrimes } from "./steps/Primes";

export const initialSteps = [
  {
    component: StepIntro,
    name: "introduction",
    label: "Introduction"
  },
  {
    component: StepInfo,
    name: "infoGenerales",
    label: "Informations générales"
  },
  {
    component: StepAnciennete,
    name: "anciennete",
    label: "Ancienneté"
  },
  {
    component: StepSalaires,
    name: "salaires",
    label: "Salaires"
  },
  {
    component: StepIndemnite,
    name: "indemniteLegale",
    label: "Indemnité légale"
  }
];

export function stepReducer(steps, action) {
  switch (action.type) {
    case "reset": {
      return initialSteps;
    }
    case "add_primes": {
      const salaireIndex = steps.findIndex(step => step.name === "salaires");
      const newSteps = steps.filter(step => step.name !== "primes");
      newSteps.splice(salaireIndex + 1, 0, {
        component: StepPrimes,
        label: "Primes",
        name: "primes"
      });
      return newSteps;
    }
    case "remove_primes": {
      return steps.filter(step => step.name !== "primes");
    }
    case "add_branche": {
      return steps
        .filter(step => !/branche_/.test(step.name))
        .concat(...action.payload);
    }
    case "remove_branche": {
      return steps.filter(step => !/branche_/.test(step.name));
    }
    default:
      console.warn("action unknow", action);
      return steps;
  }
}
