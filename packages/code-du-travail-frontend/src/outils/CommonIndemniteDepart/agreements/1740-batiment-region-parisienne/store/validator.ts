import produce from "immer";
import { StoreApi } from "zustand";
import {
  deepEqualObject,
  detectNullOrUndefinedOrNaNInArray,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1740StoreError,
  Agreement1740StoreInput,
  Agreement1740StoreSlice,
} from "./types";

export const validateAgreement1740 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1740Data.input);
  set(
    produce((state: Agreement1740StoreSlice) => {
      state.agreement1740Data.hasBeenSubmit = !isValid;
      state.agreement1740Data.isStepValid = isValid;
      state.agreement1740Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1740StoreInput) => {
  let errorState: Agreement1740StoreError = {
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
