import produce from "immer";
import { GetState, SetState } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1527StoreData,
  Agreement1527StoreInput,
  Agreement1527StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement1527StoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1527StoreSalaires: StoreSlice<
  Agreement1527StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice
> = (set, get) => ({
  agreement1527Data: { ...initialState },
  agreement1527Function: {
    onChangeHasContractSalary: (value) => {
      applyGenericValidation(get, set, "hasContractSalary", value);
    },
    onChangeContractSalary: (value) => {
      applyGenericValidation(get, set, "contractSalary", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement1527StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement1527StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement1527StoreInput,
  value: any
) => {
  if (get().agreement1527Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1527Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1527Data.input
    );
    set(
      produce((state: Agreement1527StoreSlice) => {
        state.agreement1527Data.error = errorState;
        state.agreement1527Data.isStepValid = isValid;
        state.agreement1527Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement1527StoreSlice) => {
        state.agreement1527Data.input[paramName] = value;
      })
    );
  }
};
