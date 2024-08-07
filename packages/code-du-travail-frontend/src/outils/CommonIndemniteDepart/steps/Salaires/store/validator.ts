import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { SalairesStoreInput, SalairesStoreError } from "./types";

export const validateStep = (state: SalairesStoreInput) => {
  const errorState: SalairesStoreError = {
    errorHasTempsPartiel: !state.hasTempsPartiel
      ? "Vous devez répondre à cette question"
      : undefined,
    errorTempsPartiel: state.hasTempsPartiel === "oui",
    errorHasSameSalary: !state.hasSameSalary
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSalary:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalary === "oui" &&
      !state.salary
        ? "Vous devez répondre à cette question"
        : state.hasTempsPartiel === "non" &&
          state.hasSameSalary === "oui" &&
          state.salary &&
          isNaN(parseFloat(state.salary))
        ? "Vous devez saisir un nombre"
        : state.hasTempsPartiel === "non" &&
          state.hasSameSalary === "oui" &&
          parseFloat(state.salary!) <= 0
        ? "Vous devez saisir un montant supérieur à zéro"
        : undefined,
    errorSalaryPeriods:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalary === "non" &&
      (state.salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.salaryPeriods))
        ? "Vous devez compléter l'ensemble des champs"
        : state.hasTempsPartiel === "non" &&
          state.hasSameSalary === "non" &&
          sumSalaryPeriods(state.salaryPeriods) <= 0
        ? "Vous devez saisir un montant supérieur à zéro"
        : undefined,
    errorLengthSalaryPeriods:
      state.salaryPeriods.length <= 0
        ? "Aucun mois complet n'a été réalisé, veuillez vérifier les dates que vous avez saisies aux étapes précédentes."
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasTempsPartiel: undefined,
      errorHasSameSalary: undefined,
      errorSalary: undefined,
      errorTempsPartiel: false,
      errorSalaryPeriods: undefined,
      errorLengthSalaryPeriods: undefined,
    }),
    errorState,
  };
};

const sumSalaryPeriods = (
  salaryPeriods: SalairesStoreInput["salaryPeriods"]
) => {
  const sum = salaryPeriods.reduce((acc, curr) => {
    if (curr.value !== undefined) {
      return acc + curr.value;
    }
    return acc;
  }, 0);
  return sum;
};
