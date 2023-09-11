import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import { Agreement2120StoreInput, Agreement2120StoreSlice } from "./types";

export const validateAgreement2120 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement2120Data.input);
  set(
    produce((state: Agreement2120StoreSlice) => {
      state.agreement2120Data.hasBeenSubmit = !isValid;
      state.agreement2120Data.isStepValid = isValid;
      state.agreement2120Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement2120StoreInput) => {
  const errorState = {
    errorSalariesVariablePart:
      state.salariesVariablePart === undefined
        ? "Vous devez répondre à cette question"
        : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorSalariesVariablePart: undefined,
    }),
    errorState,
  };
};
