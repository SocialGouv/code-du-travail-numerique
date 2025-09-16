import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "src/modules/utils/object";
import { MainStore } from "../../../store";
import { validateSalaryPeriods } from "../../../steps/Salaires/store/validator";
import {
  Agreement1516StoreError,
  Agreement1516StoreInput,
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
  let errorState: Agreement1516StoreError = {
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

  const isValid = deepEqualObject(errorState, {
    errorHasReceivedSalaries: undefined,
    errorNoticeSalaryPeriods: undefined,
  });

  return { isValid, errorState };
};
