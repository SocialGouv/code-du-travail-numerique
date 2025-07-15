import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { InformationsStoreSlice } from "./types";
import { validateInformationsStepWithState } from "./validator";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";

const initialState = {
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
};

const createInformationsStore: StoreSliceWrapperPreavisLicenciement<
  InformationsStoreSlice
> = (set, get) => ({
  informationsData: { ...initialState },
  informationsFunction: {
    onQuestionsChange: (questions: any) => {
      set((state) => {
        const newInput = { ...state.informationsData.input, questions };
        const { errorState, isValid } =
          validateInformationsStepWithState(newInput);

        return {
          ...state,
          informationsData: {
            ...state.informationsData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onNotificationDateChange: (date: string) => {
      set((state) => {
        const newInput = {
          ...state.informationsData.input,
          notificationDate: date,
        };
        const { errorState, isValid } =
          validateInformationsStepWithState(newInput);

        return {
          ...state,
          informationsData: {
            ...state.informationsData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onDismissalDateChange: (date: string) => {
      set((state) => {
        const newInput = {
          ...state.informationsData.input,
          dismissalDate: date,
        };
        const { errorState, isValid } =
          validateInformationsStepWithState(newInput);

        return {
          ...state,
          informationsData: {
            ...state.informationsData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onSalaryChange: (salary: string) => {
      set((state) => {
        const newInput = { ...state.informationsData.input, salary };
        const { errorState, isValid } =
          validateInformationsStepWithState(newInput);

        return {
          ...state,
          informationsData: {
            ...state.informationsData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onAdditionalInfoChange: (info: string) => {
      set((state) => {
        const newInput = {
          ...state.informationsData.input,
          additionalInfo: info,
        };
        const { errorState, isValid } =
          validateInformationsStepWithState(newInput);

        return {
          ...state,
          informationsData: {
            ...state.informationsData,
            input: newInput,
            error: errorState,
            isStepValid: isValid,
          },
        };
      });
    },
    onNextStep: () => {
      const { input } = get().informationsData;
      const { errorState, isValid } = validateInformationsStepWithState(input);

      set((state) => ({
        ...state,
        informationsData: {
          ...state.informationsData,
          error: errorState,
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
        ...state,
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
});

export { createInformationsStore };
