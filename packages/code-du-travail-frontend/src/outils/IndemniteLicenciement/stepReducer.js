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

const initialSteps = [
  {
    component: StepIntro,
    name: "introduction",
    label: "Introduction"
  },
  {
    component: StepInfo,
    name: "info_generales",
    label: "Contrat de travail"
  },
  {
    component: StepAnciennete,
    name: "anciennete",
    label: "Ancienneté"
  },
  stepSalaires,
  {
    component: StepIndemnite,
    name: "indemnite_legale",
    label: "Indemnité légale"
  }
];

export const initialState = {
  stepIndex: 0,
  steps: initialSteps
};

export function stepReducer(state, { type, payload }) {
  const { stepIndex, steps } = state;
  switch (type) {
    case "reset": {
      return [...initialSteps];
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps };
    }
    case "add_step": {
      const previousStepIndex = steps.findIndex(
        step => step.name === payload.insertAfter
      );
      const newSteps = steps.filter(step => step.name !== payload.step.name);
      newSteps.splice(previousStepIndex + 1, 0, payload.step);
      return { stepIndex, steps: newSteps };
    }
    case "remove_step": {
      return {
        stepIndex,
        steps: steps.filter(step => step.name !== payload)
      };
    }
    case "add_branche": {
      return {
        stepIndex: stepIndex,
        steps: steps
          .filter(step => !/branche_/.test(step.name))
          .concat(...payload)
      };
    }
    case "remove_branche": {
      return {
        stepIndex,
        steps: steps.filter(step => !/branche_/.test(step.name))
      };
    }
    default:
      console.warn("action unknow", { type, payload });
      return state;
  }
}
