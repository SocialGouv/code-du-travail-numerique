import { create } from "zustand";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import type { StatusStoreSlice } from "./types";
import { validateStatusStep } from "./validator";

export const createStatusStore = () =>
  create<StatusStoreSlice>((set, get) => ({
    statusData: {
      input: {
        seriousMisconduct: undefined,
        disabledWorker: undefined,
        seniority: undefined,
      },
      error: {},
      hasBeenSubmit: false,
      isStepValid: true,
    },
    statusFunction: {
      onSeriousMisconductChange: (value: boolean) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, seriousMisconduct: value },
          },
        }));
      },
      onDisabledWorkerChange: (value: boolean) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, disabledWorker: value },
          },
        }));
      },
      onSeniorityChange: (value: { value: string; label: string }) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, seniority: value },
          },
        }));
      },
      onNextStep: () => {
        const { input } = get().statusData;
        const errors = validateStatusStep(input);

        const isValid = Object.keys(errors).length === 0;
        set((state) => ({
          statusData: {
            ...state.statusData,
            error: errors,
            hasBeenSubmit: !isValid,
            isStepValid: isValid,
          },
        }));

        return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
      },
      resetStep: () => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: {
              seriousMisconduct: undefined,
              disabledWorker: undefined,
              seniority: undefined,
            },
            error: {},
            hasBeenSubmit: false,
            isStepValid: false,
          },
        }));
      },
    },
  }));
