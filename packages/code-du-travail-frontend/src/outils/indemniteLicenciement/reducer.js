import { StepInfo } from "./StepInfo";
import { StepIndemnite } from "./StepIndemnite";
import { StepAnciennete } from "./StepAnciennete";
import { StepSalaires } from "./stepSalaire";
import { StepPrimes } from "./stepPrimes";

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

export function getInitialData() {
  return {
    steps: getInitialSteps(),
    page: 0,
    data: {}
  };
}

export function resetState({ ...data }) {
  return {
    ...data
  };
}

export function CalculateurReducer(state, action) {
  console.log(action, { ...state });
  switch (action.type) {
    case "reset":
      return resetState({ ...action.payload });
    case "update_data":
      return {
        ...state,
        data: action.payload
      };
    case "add_primes": {
      const salaireIndex = state.steps.findIndex(
        step => step.name === "salaires"
      );
      const newSteps = state.steps.filter(step => step.name !== "primes");
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
        steps: state.steps.filter(step => step.name !== "primes")
      };
    }
    case "add_branche": {
      return {
        ...state,
        steps: state.steps
          .filter(step => !/branche_/.test(step.name))
          .concat(...action.payload)
      };
    }
    case "remove_branche": {
      return {
        ...state,
        steps: state.steps.filter(step => !/branche_/.test(step.name))
      };
    }
    default:
      console.warning("action unknow", action);
  }
  return state;
}
