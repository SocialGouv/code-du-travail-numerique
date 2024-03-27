import produce from "immer";
import { StoreApi } from "zustand";
import {
  deepEqualObject,
  detectNullOrUndefinedOrNaNInArray,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1483StoreError,
  Agreement1483StoreInput,
  Agreement1483StoreSlice,
} from "./types";

export const validateAgreement1483 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1483Data.input);
  set(
    produce((state: Agreement1483StoreSlice) => {
      state.agreement1483Data.hasBeenSubmit = isValid ? false : true;
      state.agreement1483Data.isStepValid = isValid;
      state.agreement1483Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1483StoreInput) => {
  let errorState: Agreement1483StoreError = {
    errorHasReceivedSalaries: undefined,
    errorNoticeSalaryPeriods: undefined,
  };
  const noticeSalaryPeriods = state.noticeSalaryPeriods ?? [];

  if (noticeSalaryPeriods.length > 0) {
    errorState = {
      errorHasReceivedSalaries: !state.hasReceivedSalaries
        ? "Vous devez répondre à cette question"
        : undefined,
      errorNoticeSalaryPeriods:
        state.hasReceivedSalaries === "oui" &&
        detectNullOrUndefinedOrNaNInArray(noticeSalaryPeriods)
          ? "Vous devez compléter l'ensemble des champs"
          : undefined,
    };
  }

  return {
    isValid: deepEqualObject(errorState, {
      errorHasReceivedSalaries: undefined,
      errorNoticeSalaryPeriods: undefined,
    }),
    errorState,
  };
};
