import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { Agreement1516StoreInput, Agreement1516StoreError } from "./types";

export const validateStep = (state: Agreement1516StoreInput) => {
  const errorState: Agreement1516StoreError = {
    errorHasReceivedPrimes: !state.hasReceivedPrimes
      ? "Vous devez répondre à cette question"
      : undefined,
    errorHasReceivedSalaries: !state.hasReceivedSalaries
      ? "Vous devez répondre à cette question"
      : undefined,
    errorSalaryPeriods:
      state.hasReceivedSalaries === "oui" &&
      (state.salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.salaryPeriods))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
    errorPrimes:
      state.hasReceivedPrimes === "oui" &&
      (state.primes.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(state.primes))
        ? "Vous devez compléter l'ensemble des champs"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasReceivedPrimes: undefined,
      errorHasReceivedSalaries: undefined,
      errorSalaryPeriods: undefined,
      errorPrimes: undefined,
    }),
    errorState,
  };
};
