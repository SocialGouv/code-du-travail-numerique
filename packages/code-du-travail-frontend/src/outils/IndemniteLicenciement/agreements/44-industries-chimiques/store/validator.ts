import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import { Agreement44StoreInput, Agreement44StoreSlice } from "./types";

export const validateAgreement44 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
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
  const errorState = {
    errorHasVariablePay:
      state.showVariablePay && !state.hasVariablePay
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
