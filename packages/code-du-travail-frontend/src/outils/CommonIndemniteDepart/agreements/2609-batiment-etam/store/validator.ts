import produce from "immer";
import { GetState, SetState } from "zustand";
import { deepEqualObject } from "../../../../../lib";
import { MainStore } from "../../../store";
import { Agreement2609StoreInput, Agreement2609StoreSlice } from "./types";
import { SalairesStoreInput } from "../../../steps/Salaires/store";

export const validateAgreement2609 = (
  get: GetState<MainStore>,
  set: SetState<MainStore>
) => {
  const { isValid, errorState } = validateStep(
    get().agreement2609Data.input,
    get().salairesData.input
  );
  set(
    produce((state: Agreement2609StoreSlice) => {
      state.agreement2609Data.hasBeenSubmit = !isValid;
      state.agreement2609Data.isStepValid = isValid;
      state.agreement2609Data.error = errorState;
    })
  );

  return isValid;
};

export const validateStep = (
  state: Agreement2609StoreInput,
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
