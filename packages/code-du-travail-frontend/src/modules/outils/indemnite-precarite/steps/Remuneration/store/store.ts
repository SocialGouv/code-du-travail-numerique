import { StoreApi } from "zustand";
import produce from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { RemunerationStoreData, RemunerationStoreSlice } from "./types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";

const initialState: RemunerationStoreData = {
  input: {
    salaryInfo: {},
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

const createRemunerationStore: StoreSliceWrapperIndemnitePrecarite<
  RemunerationStoreSlice
> = (set, get) => ({
  remunerationData: {
    ...initialState,
  },
  remunerationFunction: {
    onSalaryInfoChange: (salaryInfo) => {
      applyGenericValidation(get, set, "salaryInfo", salaryInfo);
    },
    onNextStep: () => {
      const input = get().remunerationData.input;
      const { isValid, errorState } = validateStep(input);

      set(
        produce((state: RemunerationStoreSlice) => {
          state.remunerationData.hasBeenSubmit = !isValid;
          state.remunerationData.isStepValid = isValid;
          state.remunerationData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<RemunerationStoreSlice>["getState"],
  set: StoreApi<RemunerationStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().remunerationData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.remunerationData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.remunerationData.input
    );
    set(
      produce((state: RemunerationStoreSlice) => {
        state.remunerationData.error = errorState;
        state.remunerationData.isStepValid = isValid;
        state.remunerationData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: RemunerationStoreSlice) => {
        state.remunerationData.input[paramName] = value;
      })
    );
  }
};

export default createRemunerationStore;
