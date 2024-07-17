import { StoreApi } from "zustand";
import {
  OriginDepartStoreData,
  OriginDepartStoreInput,
  OriginDepartStoreSlice,
} from "./types";
import produce from "immer";
import { validateStep } from "./validator";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

const initialState: OriginDepartStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createOriginDepartStore: StoreSliceWrapperPreavisRetraite<
  OriginDepartStoreSlice,
  any
> = (set, get) => ({
  originDepartData: { ...initialState },
  originDepartFunction: {
    onChangeOriginDepart: (value) => {
      applyGenericValidation(get, set, "originDepart", value);
    },
    onNextStep: () => {
      const state = get().originDepartData.input;
      const { isValid, errorState } = validateStep(state);

      set(
        produce((state: OriginDepartStoreSlice) => {
          state.originDepartData.hasBeenSubmit = !isValid;
          state.originDepartData.isStepValid = isValid;
          state.originDepartData.error = errorState;
        })
      );

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<OriginDepartStoreSlice & CommonSituationStoreSlice>["getState"],
  set: StoreApi<OriginDepartStoreSlice>["setState"],
  paramName: keyof OriginDepartStoreInput,
  value: any
) => {
  if (get().originDepartData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.originDepartData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.originDepartData.input
    );
    set(
      produce((state: OriginDepartStoreSlice) => {
        state.originDepartData.error = errorState;
        state.originDepartData.isStepValid = isValid;
        state.originDepartData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: OriginDepartStoreSlice) => {
        state.originDepartData.input[paramName] = value;
      })
    );
  }
};

export default createOriginDepartStore;
