import { produce } from "immer";
import type { StoreApi } from "zustand";
import { MainStore } from "../../../store";
import { Agreement2120StoreInput, Agreement2120StoreSlice } from "./types";

export const validateAgreement2120 = (
  get: StoreApi<MainStore>["getState"],
  set: StoreApi<MainStore>["setState"]
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
  const isValid =
    state.isLicenciementDisciplinaire ||
    state.salariesVariablePart !== undefined;

  const errorState = {
    errorSalariesVariablePart: !isValid
      ? "Vous devez répondre à cette question"
      : undefined,
  };

  return {
    isValid: isValid,
    errorState,
  };
};
