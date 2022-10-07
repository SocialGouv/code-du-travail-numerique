import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import { Agreement16StoreInput, Agreement16StoreSlice } from "./types";

export const validateAgreement16 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement16Data.input);
  set(
    produce((state: Agreement16StoreSlice) => {
      state.agreement16Data.hasBeenSubmit = isValid;
      state.agreement16Data.isStepValid = isValid;
      state.agreement16Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement16StoreInput) => {
  console.log(
    "CC 16 Validate step : ",
    state.showVariablePay,
    !state.hasVariablePay
  );
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
