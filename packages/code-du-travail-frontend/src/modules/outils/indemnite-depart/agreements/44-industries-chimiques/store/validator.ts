import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "src/modules/utils/object";
import { MainStore } from "../../../store";
import { validateSalaryPeriods } from "../../../steps/Salaires/store/validator";
import { Agreement44StoreInput, Agreement44StoreSlice } from "./types";

export const validateAgreement44 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement44Data.input);
  set(
    produce((state: Agreement44StoreSlice) => {
      state.agreement44Data.hasBeenSubmit = !isValid;
      state.agreement44Data.isStepValid = isValid;
      state.agreement44Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement44StoreInput) => {
  const salaryErrors = validateSalaryPeriods(
    state.lastMonthSalary ? [state.lastMonthSalary] : []
  );
  const hasSalaryErrors = Object.values(salaryErrors).some(
    (error) => error !== null
  );

  const errorState = {
    errorHasVariablePay:
      state.showVariablePay && !state.hasVariablePay
        ? "Vous devez répondre à cette question"
        : undefined,
    errorKnowingLastSalary:
      state.showKnowingLastSalary && !state.knowingLastSalary
        ? "Vous devez répondre à cette question"
        : undefined,
    errorLastMonthSalary:
      state.showLastMonthSalary && hasSalaryErrors ? salaryErrors : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasVariablePay: undefined,
      errorKnowingLastSalary: undefined,
      errorLastMonthSalary: undefined,
    }),
    errorState,
  };
};
