import produce from "immer";
import { GetState, SetState } from "zustand";
import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import { setReferenceSalaryAgreement1516 } from "./setReferenceSalary";
import {
  Agreement1516StoreInput,
  Agreement1516StoreError,
  Agreement1516StoreSlice,
} from "./types";

export const validateAgreement1516 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement1516Data.input);
  set(
    produce((state: Agreement1516StoreSlice) => {
      state.agreement1516Data.hasBeenSubmit = isValid ? false : true;
      state.agreement1516Data.isStepValid = isValid;
      state.agreement1516Data.error = errorState;
    })
  );

  if (isValid) {
    setReferenceSalaryAgreement1516(get, set);
  }

  return isValid;
};

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
