import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "src/modules/utils/object";
import { validateSalaryPeriods } from "../../../steps/Salaires/store/validator";
import { MainStore } from "../../../store";
import {
  Agreement2596StoreError,
  Agreement2596StoreInput,
  Agreement2596StoreSlice,
} from "./types";

export const validateAgreement2596 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement2596Data.input);
  set(
    produce((state: Agreement2596StoreSlice) => {
      state.agreement2596Data.hasBeenSubmit = !isValid;
      state.agreement2596Data.isStepValid = isValid;
      state.agreement2596Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement2596StoreInput) => {
  let errorState: Agreement2596StoreError = {
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
        state.hasReceivedSalaries === "oui"
          ? validateSalaryPeriods(noticeSalaryPeriods)
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
