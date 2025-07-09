import { create } from "zustand";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { InformationsStoreSlice } from "./types";
import { validateInformationsStep } from "./validator";

export const createInformationsStore = () =>
  create<InformationsStoreSlice>((set, get) => ({
    informationsData: {
      input: {
        questions: undefined,
        notificationDate: undefined,
        dismissalDate: undefined,
        salary: undefined,
        additionalInfo: undefined,
      },
      error: {},
      hasBeenSubmit: false,
      isStepValid: true,
      publicodes: {},
    },
    informationsFunction: {
      onQuestionsChange: (questions: any) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, questions },
          },
        }));
      },
      onNotificationDateChange: (date: string) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, notificationDate: date },
          },
        }));
      },
      onDismissalDateChange: (date: string) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, dismissalDate: date },
          },
        }));
      },
      onSalaryChange: (salary: string) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, salary },
          },
        }));
      },
      onAdditionalInfoChange: (info: string) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, additionalInfo: info },
          },
        }));
      },
      onNextStep: () => {
        const { input } = get().informationsData;
        const errors = validateInformationsStep(input);

        const isValid = Object.keys(errors).length === 0;
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            error: errors,
            hasBeenSubmit: !isValid,
            isStepValid: isValid,
          },
        }));

        return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
      },
      shouldSkipStep: () => {
        // Logic to determine if this step should be skipped
        return false;
      },
      resetStep: () => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: {
              questions: undefined,
              notificationDate: undefined,
              dismissalDate: undefined,
              salary: undefined,
              additionalInfo: undefined,
            },
            error: {},
            hasBeenSubmit: false,
            isStepValid: true,
          },
        }));
      },
    },
  }));
