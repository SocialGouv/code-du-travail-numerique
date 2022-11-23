import produce from "immer";
import { GetState, SetState } from "zustand";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement2609StoreData,
  Agreement2609StoreInput,
  Agreement2609StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement2609StoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement2609StoreSalaires: StoreSlice<
  Agreement2609StoreSlice,
  SalairesStoreSlice
> = (set, get) => ({
  agreement2609Data: { ...initialState },
  agreement2609Function: {
    onChangeHasVariablePay: (value) => {
      applyGenericValidation(get, set, "hasVariablePay", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement2609StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement2609StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement2609StoreInput,
  value: any
) => {
  if (get().agreement2609Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement2609Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement2609Data.input,
      nextState.salairesData.input
    );
    set(
      produce((state: Agreement2609StoreSlice) => {
        state.agreement2609Data.error = errorState;
        state.agreement2609Data.isStepValid = isValid;
        state.agreement2609Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement2609StoreSlice) => {
        state.agreement2609Data.input[paramName] = value;
      })
    );
  }
};
