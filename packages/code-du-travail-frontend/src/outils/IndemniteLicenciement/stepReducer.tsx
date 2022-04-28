import { StepAnciennete } from "./steps/Anciennete";
import { StepIndemnite } from "./steps/Indemnite";
import { StepInfo } from "./steps/Info";
import { StepIntro } from "./steps/Introduction";
import { StepPrimes } from "./steps/Primes";
import { StepSalaires } from "./steps/Salaires";

export const stepSalaires = {
  component: StepSalaires,
  label: "Salaires",
  name: "salaires",
};

export const stepPrime = {
  component: StepPrimes,
  label: "Primes",
  name: "primes",
};

const initialSteps = [
  {
    component: StepIntro,
    label: "Introduction",
    name: "introduction",
  },
  {
    component: StepInfo,
    isForm: true,
    label: "Contrat de travail",
    name: "info_generales",
  },
  {
    component: StepAnciennete,
    hasNoMarginBottom: true,
    isForm: true,
    label: "Ancienneté",
    name: "anciennete",
  },
  stepSalaires,
  {
    component: StepIndemnite,
    label: "Indemnité légale",
    name: "indemnite_legale",
  },
];

export const initialState = {
  stepIndex: 0,
  steps: initialSteps,
};

export function stepReducer(state, { type, payload }) {
  const { stepIndex, steps } = state;
  switch (type) {
    case "reset": {
      return { ...initialState };
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps };
    }
    case "add_step": {
      const previousStepIndex = steps.findIndex(
        (step) => step.name === payload.insertAfter
      );
      const newSteps = steps.filter((step) => step.name !== payload.step.name);
      newSteps.splice(previousStepIndex + 1, 0, payload.step);
      return { stepIndex, steps: newSteps };
    }
    case "remove_step": {
      return {
        stepIndex,
        steps: steps.filter((step) => step.name !== payload),
      };
    }
    default:
      console.warn("action unknow", { payload, type });
      return state;
  }
}
