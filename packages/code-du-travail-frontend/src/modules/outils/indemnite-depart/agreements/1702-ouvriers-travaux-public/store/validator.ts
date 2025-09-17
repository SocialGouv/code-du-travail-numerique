import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "src/modules/utils/object";
import { MainStore } from "../../../store";
import { validateSalaryPeriods } from "../../../steps/Salaires/store/validator";
import {
  Agreement1702StoreError,
  Agreement1702StoreInput,
  Agreement1702StoreSlice,
} from "./types";

export const validateAgreement1702 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1702Data.input);
  set(
    produce((state: Agreement1702StoreSlice) => {
      state.agreement1702Data.hasBeenSubmit = !isValid;
      state.agreement1702Data.isStepValid = isValid;
      state.agreement1702Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1702StoreInput) => {
  let errorState: Agreement1702StoreError = {
    errorHasReceivedSalaries: undefined,
    errorNoticeSalaryPeriods: undefined,
  };
  const noticeSalaryPeriods = state.noticeSalaryPeriods ?? [];

  if (noticeSalaryPeriods.length > 0) {
    const salaryErrors = validateSalaryPeriods(noticeSalaryPeriods);
    const hasSalaryErrors = Object.values(salaryErrors).some(
      (error) => error !== null
    );

    errorState = {
      errorHasReceivedSalaries: !state.hasReceivedSalaries
        ? "Vous devez répondre à cette question"
        : undefined,
      errorNoticeSalaryPeriods:
        state.hasReceivedSalaries === "oui"
          ? hasSalaryErrors
            ? salaryErrors
            : undefined
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
