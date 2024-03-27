import produce from "immer";
import { StoreApi } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1527StoreError,
  Agreement1527StoreInput,
  Agreement1527StoreSlice,
} from "./types";

export const validateAgreement1527 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
) => {
  const { isValid, errorState } = validateStep(get().agreement1527Data.input);
  set(
    produce((state: Agreement1527StoreSlice) => {
      state.agreement1527Data.hasBeenSubmit = !isValid;
      state.agreement1527Data.isStepValid = isValid;
      state.agreement1527Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1527StoreInput) => {
  let errorState: Agreement1527StoreError = {};
  errorState = {
    errorHasCommission: !state.hasCommission
      ? "Vous devez répondre à cette question"
      : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasCommission: undefined,
    }),
    errorState,
  };
};
