import { StoreApi } from "zustand";
import {
  SeniorityStoreData,
  SeniorityStoreInput,
  SeniorityStoreSlice,
} from "./types";
import { produce } from "immer";
import { validateStep } from "./validator";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { sendPageEvent } from "src/modules/analytics/events";
import { ValidationResponse } from "src/modules/outils/common/types";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

const initialState: SeniorityStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createSeniorityStore: StoreSliceWrapperPreavisRetraite<
  SeniorityStoreSlice
> = (set, get) => ({
  seniorityData: { ...initialState },
  seniorityFunction: {
    onChangeMoreThanXYears: (value) => {
      applyGenericValidation(get, set, "moreThanXYears", value);
      if (value === "oui") {
        applyGenericValidation(get, set, "seniorityInMonths", undefined);
      }
    },
    onChangeSeniorityInMonths: (value) => {
      applyGenericValidation(get, set, "seniorityInMonths", value);
    },
    onNextStep: () => {
      const state = get().seniorityData.input;
      const { isValid, errorState } = validateStep(state);

      set(
        produce((state: SeniorityStoreSlice) => {
          state.seniorityData.hasBeenSubmit = !isValid;
          state.seniorityData.isStepValid = isValid;
          state.seniorityData.error = errorState;
        })
      );
      // Émis depuis un store zustand, hors rendu React : d'où `sendPageEvent`
      // (non-hook). L'ancienneté déclarée était l'ACTION Matomo
      // (`anciennete_plus_2_ans` / `_moins_2_ans`) ; elle devient un payload.
      sendPageEvent("select_seniority", {
        simulator: SimulatorTitle.PREAVIS_RETRAITE,
        seniority:
          get().seniorityData.input.moreThanXYears === "oui"
            ? "plus_2_ans"
            : "moins_2_ans",
      });

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<SeniorityStoreSlice>["getState"],
  set: StoreApi<SeniorityStoreSlice>["setState"],
  paramName: keyof SeniorityStoreInput,
  value: any
) => {
  if (get().seniorityData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.seniorityData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(nextState.seniorityData.input);
    set(
      produce((state: SeniorityStoreSlice) => {
        state.seniorityData.error = errorState;
        state.seniorityData.isStepValid = isValid;
        state.seniorityData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: SeniorityStoreSlice) => {
        state.seniorityData.input[paramName] = value;
      })
    );
  }
};

export default createSeniorityStore;
