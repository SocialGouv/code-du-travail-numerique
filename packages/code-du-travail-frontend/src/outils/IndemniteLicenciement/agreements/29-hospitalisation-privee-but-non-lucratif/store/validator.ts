import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement29StoreError,
  Agreement29StoreInput,
  Agreement29StoreSlice,
} from "./types";

export const validateAgreement29 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement29Data.input);
  set(
    produce((state: Agreement29StoreSlice) => {
      state.agreement29Data.hasBeenSubmit = !isValid;
      state.agreement29Data.isStepValid = isValid;
      state.agreement29Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement29StoreInput) => {
  let errorState: Agreement29StoreError = {};
  errorState = {
    errorHasSixBestSalaries:
      state.shouldAskSixBestSalaries && !state.hasSixBestSalaries
        ? "Vous devez répondre à cette question"
        : undefined,
    errorSixBestSalariesTotal:
      state.hasSixBestSalaries === "oui" && !state.sixBestSalariesTotal
        ? "Vous devez répondre à cette question"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasSixBestSalaries: undefined,
      errorSixBestSalariesTotal: undefined,
    }),
    errorState,
  };
};
