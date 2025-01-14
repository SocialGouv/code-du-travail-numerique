import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "src/lib";
import { MainStore } from "../../../store";
import { Agreement2614StoreInput, Agreement2614StoreSlice } from "./types";
import { SalairesStoreInput } from "../../../steps/Salaires/store";

export const validateAgreement2614 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(
    get().agreement2614Data.input,
    get().salairesData.input
  );
  set(
    produce((state: Agreement2614StoreSlice) => {
      state.agreement2614Data.hasBeenSubmit = !isValid;
      state.agreement2614Data.isStepValid = isValid;
      state.agreement2614Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (
  state: Agreement2614StoreInput,
  salaryState: SalairesStoreInput
) => {
  const errorState = {
    errorHasVariablePay:
      salaryState.hasSameSalary === "non" && !state.hasVariablePay
        ? "Vous devez répondre à cette question"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasVariablePay: undefined,
    }),
    errorState,
  };
};
