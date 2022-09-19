import produce from "immer";
import { GetState, SetState } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement16StoreData,
  Agreement16StoreInput,
  Agreement16StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement16StoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement16StoreSalaires: StoreSlice<
  Agreement16StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice
> = (set, get) => ({
  agreement16Data: { ...initialState },
  agreement16Function: {
    onChangeHasVariablePay: (value) => {
      applyGenericValidation(get, set, "hasVariablePay", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement16StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement16StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement16StoreInput,
  value: any
) => {
  if (get().agreement16Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement16Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement16Data.input
    );
    set(
      produce((state: Agreement16StoreSlice) => {
        state.agreement16Data.error = errorState;
        state.agreement16Data.isStepValid = isValid;
        state.agreement16Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement16StoreSlice) => {
        state.agreement16Data.input[paramName] = value;
      })
    );
  }
};
