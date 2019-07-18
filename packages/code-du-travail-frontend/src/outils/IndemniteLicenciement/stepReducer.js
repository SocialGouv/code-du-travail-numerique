import { StepInfo } from "./steps/Info";
import { StepIndemnite } from "./steps/Indemnite";
import { StepIntro } from "./steps/Introduction";
import { StepAnciennete } from "./steps/Anciennete";
import { StepSalaires } from "./steps/Salaires";
import { StepPrimes } from "./steps/Primes";

export const stepSalaires = {
  component: StepSalaires,
  name: "salaires",
  label: "Salaires"
};

export const stepPrime = {
  component: StepPrimes,
  label: "Primes",
  name: "primes"
};

export const initialSteps = [
  {
    component: StepIntro,
    name: "introduction",
    label: "Introduction"
  },
  {
    component: StepInfo,
    name: "info_generales",
    label: "Informations générales"
  },
  {
    component: StepAnciennete,
    name: "anciennete",
    label: "Ancienneté"
  },
  { ...stepSalaires },
  {
    component: StepIndemnite,
    name: "indemnite_legale",
    label: "Indemnité légale"
  }
];

export function stepReducer(steps, { type, payload }) {
  switch (type) {
    case "reset": {
      return [...initialSteps];
    }
    case "add_step": {
      const previousStepIndex = steps.findIndex(
        step => step.name === payload.insertAfter
      );
      const newSteps = steps.filter(step => step.name !== payload.step.name);
      newSteps.splice(previousStepIndex + 1, 0, payload.step);
      return newSteps;
    }
    case "remove_step": {
      return steps.filter(step => step.name !== payload);
    }
    case "add_branche": {
      return steps
        .filter(step => !/branche_/.test(step.name))
        .concat(...payload);
    }
    case "remove_branche": {
      return steps.filter(step => !/branche_/.test(step.name));
    }
    default:
      console.warn("action unknow", { type, payload });
      return steps;
  }
}
