import produce from "immer";
import { GetState, SetState } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement29StoreData,
  Agreement29StoreInput,
  Agreement29StoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: Agreement29StoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement29StoreSalaires: StoreSlice<
  Agreement29StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice
> = (set, get) => ({
  agreement29Data: { ...initialState },
  agreement29Function: {
    onChangeSixBestSalariesTotal: (value) => {
      applyGenericValidation(get, set, "sixBestSalariesTotal", value);
    },
    onChangeHasSixBestSalaries: (value) => {
      applyGenericValidation(get, set, "hasSixBestSalaries", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement29StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement29StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement29StoreInput,
  value: any
) => {
  if (get().agreement29Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement29Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement29Data.input
    );
    set(
      produce((state: Agreement29StoreSlice) => {
        state.agreement29Data.error = errorState;
        state.agreement29Data.isStepValid = isValid;
        state.agreement29Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement29StoreSlice) => {
        state.agreement29Data.input[paramName] = value;
      })
    );
  }
};
