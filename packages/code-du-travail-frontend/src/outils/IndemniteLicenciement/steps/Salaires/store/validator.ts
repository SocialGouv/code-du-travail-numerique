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
        : undefined,
    errorSalaryPeriods:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalary === "non" &&
      (state.salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.salaryPeriods))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasTempsPartiel: undefined,
      errorHasSameSalary: undefined,
      errorSalary: undefined,
      errorTempsPartiel: false,
      errorSalaryPeriods: undefined,
    }),
    errorState,
  };
};
