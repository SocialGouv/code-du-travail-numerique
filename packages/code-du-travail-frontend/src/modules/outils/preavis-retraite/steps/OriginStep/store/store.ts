import { StoreApi } from "zustand";
import {
  OriginDepartStoreData,
  OriginDepartStoreInput,
  OriginDepartStoreSlice,
} from "./types";
import produce from "immer";
import { validateStep } from "./validator";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { push as matopush } from "@socialgouv/matomo-next";
import { InformationsStoreSlice } from "../../Informations/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { MatomoBaseEvent, MatomoRetirementEvent } from "src/lib";

const initialState: OriginDepartStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createOriginDepartStore: StoreSliceWrapperPreavisRetraite<
  OriginDepartStoreSlice,
  InformationsStoreSlice
> = (set, get) => ({
  originDepartData: { ...initialState },
  originDepartFunction: {
    onChangeOriginDepart: (value) => {
      applyGenericValidation(get, set, "originDepart", value);
      get().informationsFunction.generatePublicodesQuestions();
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

      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        get().originDepartData.input.originDepart === "mise-retraite"
          ? MatomoRetirementEvent.MISE_RETRAITE
          : MatomoRetirementEvent.DEPART_RETRAITE,
      ]);

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<OriginDepartStoreSlice>["getState"],
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
