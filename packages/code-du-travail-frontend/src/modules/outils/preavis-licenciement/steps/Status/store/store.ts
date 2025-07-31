import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import type { Seniority, StatusStoreSlice } from "./types";
import { validateStatusStepWithState } from "./validator";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";

const initialState = {
  input: {
    seriousMisconduct: undefined,
    disabledWorker: undefined,
    seniority: undefined,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true, // Par défaut, l'étape est valide pour permettre la navigation
};

const createStatusStore: StoreSliceWrapperPreavisLicenciement<
  StatusStoreSlice
> = (set, get) => ({
  statusData: { ...initialState },
  statusFunction: {
    onSeriousMisconductChange: (value: boolean) => {
      set((state) => {
        const newInput = {
          ...state.statusData.input,
          seriousMisconduct: value,
        };
        const { errorState, isValid } = validateStatusStepWithState(newInput);

        return {
          ...state,
          statusData: {
            ...state.statusData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onDisabledWorkerChange: (value: boolean) => {
      set((state) => {
        const newInput = { ...state.statusData.input, disabledWorker: value };
        const { errorState, isValid } = validateStatusStepWithState(newInput);

        return {
          ...state,
          statusData: {
            ...state.statusData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onSeniorityChange: (value: Seniority) => {
      set((state) => {
        const newInput = { ...state.statusData.input, seniority: value };
        const { errorState, isValid } = validateStatusStepWithState(newInput);

        return {
          ...state,
          statusData: {
            ...state.statusData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onNextStep: () => {
      const { input } = get().statusData;
      const { errorState, isValid } = validateStatusStepWithState(input);

      set((state) => ({
        ...state,
        statusData: {
          ...state.statusData,
          error: errorState,
          hasBeenSubmit: !isValid,
          isStepValid: isValid,
        },
      }));

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

export { createStatusStore };
