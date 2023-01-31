import produce from "immer";
import { StoreApi } from "zustand";
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
    onChangeHasCommission: (value) => {
      applyGenericValidation(get, set, "hasCommission", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement1527StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1527StoreSlice & SalairesStoreSlice>["setState"],
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
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1527StoreSlice) => {
        state.agreement1527Data.input[paramName] = value;
      })
    );
  }
};
