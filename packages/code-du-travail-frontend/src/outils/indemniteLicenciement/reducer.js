import { StepInfo } from "./steps/Info";
import { StepIndemnite } from "./steps/Indemnite";
import { StepAnciennete } from "./steps/Anciennete";
import { StepSalaires } from "./steps/Salaires";
import { StepPrimes } from "./steps/Primes";

export function getInitialSteps() {
  return [
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
}

export function StepReducer(steps, action) {
  switch (action.type) {
    case "reset":
      return action.payload;

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
      // eslint-disable-next-line no-console
      console.warning("action unknow", action);
  }
  return steps;
}
