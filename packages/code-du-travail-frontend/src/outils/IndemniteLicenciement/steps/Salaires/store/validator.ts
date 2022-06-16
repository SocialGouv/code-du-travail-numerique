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
    errorHasSameSalaire:
      state.hasTempsPartiel === "non" && !state.hasSameSalaire
        ? "Vous devez répondre à cette question"
        : undefined,
    errorTempsPartiel: state.hasTempsPartiel === "oui",
    errorSalaireBrut:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "oui" &&
      !state.salaireBrut
        ? "Vous devez répondre à cette question"
        : undefined,
    errorSalaryPeriods:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      (state.salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.salaryPeriods))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
    errorHasPrimes:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      !state.hasPrimes
        ? "Vous devez répondre à cette question"
        : undefined,
    errorPrimes:
      state.hasTempsPartiel === "non" &&
      state.hasSameSalaire === "non" &&
      state.hasPrimes === "oui" &&
      (state.primes.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.primes))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasSameSalaire: undefined,
      errorHasPrimes: undefined,
      errorHasTempsPartiel: undefined,
      errorSalaireBrut: undefined,
      errorTempsPartiel: false,
      errorSalaryPeriods: undefined,
      errorPrimes: undefined,
    }),
    errorState,
  };
};
