import produce from "immer";
import { GetState, SetState } from "zustand";
import {
  detectNullOrUndefinedOrNaNInArray,
  deepEqualObject,
} from "../../../../../lib";
import { MainStore } from "../../../store";
import {
  Agreement1527StoreInput,
  Agreement1527StoreError,
  Agreement1527StoreSlice,
} from "./types";

export const validateAgreement1527 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(get().agreement1527Data.input);
  set(
    produce((state: Agreement1527StoreSlice) => {
      state.agreement1527Data.hasBeenSubmit = isValid ? false : true;
      state.agreement1527Data.isStepValid = isValid;
      state.agreement1527Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (state: Agreement1527StoreInput) => {
  let errorState: Agreement1527StoreError = {};
  errorState = {
    errorContractSalary:
      state.hasCommission === "non" && !state.contractSalary
        ? "Vous devez renseigner votre salaire brute mensuel contractuel"
        : undefined,
    errorHasCommission: !state.hasCommission
      ? "Vous devez répondre à cette question"
      : undefined,
  };

  return {
    isValid: deepEqualObject(errorState, {
      errorHasCommission: undefined,
      errorContractSalary: undefined,
    }),
    errorState,
  };
};
