import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject, detectNullOrUndefinedOrNaNInArray } from "src/lib";
import { MainStore } from "../../../store";
import {
  Agreement2148StoreError,
  Agreement2148StoreInput,
  Agreement2148StoreSlice,
} from "./types";

export const validateAgreement2148 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement2148Data.input);
  set(
    produce((state: Agreement2148StoreSlice) => {
      state.agreement2148Data.hasBeenSubmit = !isValid;
      state.agreement2148Data.isStepValid = isValid;
      state.agreement2148Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement2148StoreInput) => {
  let errorState: Agreement2148StoreError = {
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
