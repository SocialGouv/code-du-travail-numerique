import produce from "immer";
import { StoreApi } from "zustand";
import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1516StoreInput,
  Agreement1516StoreError,
  Agreement1516StoreSlice,
} from "./types";

export const validateAgreement1516 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1516Data.input);
  set(
    produce((state: Agreement1516StoreSlice) => {
      state.agreement1516Data.hasBeenSubmit = isValid ? false : true;
      state.agreement1516Data.isStepValid = isValid;
      state.agreement1516Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1516StoreInput) => {
  let errorState: Agreement1516StoreError = {};
  const salaryPeriods = state.salaryPeriods ?? [];
  if (salaryPeriods.length > 0) {
    errorState = {
      errorHasReceivedSalaries: !state.hasReceivedSalaries
        ? "Vous devez répondre à cette question"
        : undefined,
      errorSalaryPeriods:
        salaryPeriods.length === 0 ||
        detectNullOrUndefinedOrNaNInArray(salaryPeriods)
          ? "Vous devez compléter l'ensemble des champs"
          : undefined,
    };
  }

  return {
    isValid: deepEqualObject(errorState, {
      errorHasReceivedSalaries: undefined,
      errorSalaryPeriods: undefined,
    }),
    errorState,
  };
};
