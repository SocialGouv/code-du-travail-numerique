import produce from "immer";
import { StoreApi } from "zustand";
import {
  deepEqualObject,
  detectNullOrUndefinedOrNaNInArray,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1672StoreError,
  Agreement1672StoreInput,
  Agreement1672StoreSlice,
} from "./types";

export const validateAgreement1672 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1672Data.input);
  set(
    produce((state: Agreement1672StoreSlice) => {
      state.agreement1672Data.hasBeenSubmit = !isValid;
      state.agreement1672Data.isStepValid = isValid;
      state.agreement1672Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1672StoreInput) => {
  let errorState: Agreement1672StoreError = {
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
