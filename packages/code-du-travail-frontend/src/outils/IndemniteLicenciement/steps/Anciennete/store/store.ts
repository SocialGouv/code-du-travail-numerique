import produce from "immer";
import { GetState, SetState } from "zustand";
import { StoreSlice } from "../../../store";

import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<AncienneteStoreSlice> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    onChangeDateEntree: (value) => {
      applyGenericValidation(get, set, "dateEntree", value);
    },
    onChangeDateSortie: (value) => {
      applyGenericValidation(get, set, "dateSortie", value);
    },
    onChangeDateNotification: (value) => {
      applyGenericValidation(get, set, "dateNotification", value);
    },
    onChangeAbsencePeriods: (value) => {
      applyGenericValidation(get, set, "absencePeriods", value);
    },
    onChangeHasAbsenceProlonge: (value) => {
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.input.absencePeriods =
            value === "non"
              ? initialState.input.absencePeriods
              : get().ancienneteData.input.absencePeriods;
        })
      );
    },
    onValidateStepAnciennete: () => {
      const { isValid, errorState } = validateStep(get().ancienneteData.input);
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = isValid ? false : true;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<AncienneteStoreSlice>,
  set: SetState<AncienneteStoreSlice>,
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.ancienneteData.input
    );
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.error = errorState;
        state.ancienneteData.isStepValid = isValid;
        state.ancienneteData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.input[paramName] = value;
      })
    );
  }
};

export default createAncienneteStore;
