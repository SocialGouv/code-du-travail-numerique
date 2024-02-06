import produce from "immer";
import { StoreApi } from "zustand";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement2614StoreData,
  Agreement2614StoreInput,
  Agreement2614StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement2614StoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement2614StoreSalaires: StoreSlice<
  Agreement2614StoreSlice,
  SalairesStoreSlice & CommonSituationStoreSlice
> = (set, get) => ({
  agreement2614Data: { ...initialState },
  agreement2614Function: {
    onChangeHasVariablePay: (value) => {
      get().situationFunction.onSituationChange("hasVariablePay", value);
      applyGenericValidation(get, set, "hasVariablePay", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement2614StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement2614StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement2614StoreInput,
  value: any
) => {
  if (get().agreement2614Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement2614Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement2614Data.input,
      nextState.salairesData.input
    );
    set(
      produce((state: Agreement2614StoreSlice) => {
        state.agreement2614Data.error = errorState;
        state.agreement2614Data.isStepValid = isValid;
        state.agreement2614Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement2614StoreSlice) => {
        state.agreement2614Data.input[paramName] = value;
      })
    );
  }
};
