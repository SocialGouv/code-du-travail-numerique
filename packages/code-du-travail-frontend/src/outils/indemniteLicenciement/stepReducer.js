import { StepInfo } from "./steps/Info";
import { StepIndemnite } from "./steps/Indemnite";
import { StepAnciennete } from "./steps/Anciennete";
import { StepSalaires } from "./steps/Salaires";
import { StepPrimes } from "./steps/Primes";

export function getInitialStepsState() {
  return {
    currentStepIndex: 0,
    steps: [
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
    ]
  };
}

export function stepReducer(state, action) {
  const { currentStepIndex, steps } = state;
  switch (action.type) {
    case "reset":
      return action.payload;
    case "previous_step": {
      return {
        ...state,
        currentStepIndex: Math.max(0, currentStepIndex - 1)
      };
    }
    case "next_step": {
      return {
        ...state,
        currentStepIndex: Math.min(currentStepIndex + 1, steps.length - 1)
      };
    }
    case "add_primes": {
      const salaireIndex = steps.findIndex(step => step.name === "salaires");
      const newSteps = steps.filter(step => step.name !== "primes");
      newSteps.splice(salaireIndex + 1, 0, {
        component: StepPrimes,
        label: "Primes",
        name: "primes"
      });
      return {
        ...state,
        steps: newSteps
      };
    }
    case "remove_primes": {
      return {
        ...state,
        steps: steps.filter(step => step.name !== "primes")
      };
    }
    case "add_branche": {
      return {
        ...state,
        steps: steps
          .filter(step => !/branche_/.test(step.name))
          .concat(...action.payload)
      };
    }
    case "remove_branche": {
      return {
        ...state,
        steps: steps.filter(step => !/branche_/.test(step.name))
      };
    }
    default:
      console.warn("unknown action", action);
  }
  return steps;
}
