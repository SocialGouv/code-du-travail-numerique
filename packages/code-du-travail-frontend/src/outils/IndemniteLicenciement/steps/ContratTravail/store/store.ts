import { StoreApi } from "zustand";
import {
  ContratTravailStoreData,
  ContratTravailStoreInput,
  ContratTravailStoreSlice,
} from "./types";
import produce from "immer";
import { StoreSlice } from "../../../../types";
import { validateStep } from "./validator";
import { getErrorEligibility } from "./eligibility";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: ContratTravailStoreData = {
  input: {},
  error: {
    errorCdd: false,
    errorFauteGrave: false,
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createContratTravailStore: StoreSlice<
  ContratTravailStoreSlice,
  AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  contratTravailData: { ...initialState },
  contratTravailFunction: {
    onChangeTypeContratTravail: (value) => {
      applyGenericValidation(get, set, "typeContratTravail", value);
    },
    onChangeLicenciementFauteGrave: (value) => {
      applyGenericValidation(get, set, "licenciementFauteGrave", value);
    },
    onChangeLicenciementInaptitude: (value) => {
      applyGenericValidation(get, set, "licenciementInaptitude", value);
      applyGenericValidation(get, set, "dateArretTravail", undefined);
      applyGenericValidation(get, set, "arretTravail", undefined);
      get().informationsFunction.generatePublicodesQuestions();
    },
    onChangeArretTravail: (value) => {
      applyGenericValidation(get, set, "arretTravail", value);
      applyGenericValidation(get, set, "dateArretTravail", undefined);
    },
    onChangeDateArretTravail: (value) => {
      applyGenericValidation(get, set, "dateArretTravail", value);
      if (get().ancienneteData.hasBeenSubmit) {
        get().ancienneteFunction.onNextStep();
      }
    },
    onNextStep: () => {
      const state = get().contratTravailData.input;
      const { isValid, errorState } = validateStep(state);
      let errorEligibility;

      if (isValid) {
        errorEligibility = getErrorEligibility(state);
      }

      set(
        produce((state: ContratTravailStoreSlice) => {
          state.contratTravailData.hasBeenSubmit = !isValid;
          state.contratTravailData.isStepValid = isValid;
          state.contratTravailData.error = errorState;
          state.contratTravailData.error.errorEligibility = errorEligibility;
        })
      );
      return errorEligibility
        ? ValidationResponse.NotEligible
        : isValid
        ? ValidationResponse.Valid
        : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<ContratTravailStoreSlice>["getState"],
  set: StoreApi<ContratTravailStoreSlice>["setState"],
  paramName: keyof ContratTravailStoreInput,
  value: any
) => {
  if (get().contratTravailData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.contratTravailData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.contratTravailData.input
    );
    set(
      produce((state: ContratTravailStoreSlice) => {
        state.contratTravailData.error = errorState;
        state.contratTravailData.isStepValid = isValid;
        state.contratTravailData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: ContratTravailStoreSlice) => {
        state.contratTravailData.input[paramName] = value;
      })
    );
  }
};

export default createContratTravailStore;
