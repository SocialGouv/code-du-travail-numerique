import { create } from "zustand";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { AgreementStoreSlice } from "./types";
import { validateAgreementStep } from "./validator";

export const createAgreementStore = () =>
  create<AgreementStoreSlice>((set, get) => ({
    agreementData: {
      input: {
        route: undefined,
        agreement: undefined,
        enterprise: undefined,
        hasNoEnterpriseSelected: false,
      },
      error: {},
      hasBeenSubmit: false,
      isStepValid: false,
      publicodes: {},
    },
    agreementFunction: {
      onRouteChange: (value: string) => {
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            input: { ...state.agreementData.input, route: value },
          },
        }));
      },
      onAgreementChange: (agreement: any, enterprise?: any) => {
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            input: { ...state.agreementData.input, agreement, enterprise },
          },
        }));
      },
      onNextStep: () => {
        const { input } = get().agreementData;
        const errors = validateAgreementStep(input);

        const isValid = Object.keys(errors).length === 0;
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            error: errors,
            hasBeenSubmit: !isValid,
            isStepValid: isValid,
          },
        }));

        return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
      },
      resetStep: () => {
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            input: {
              route: undefined,
              agreement: undefined,
              enterprise: undefined,
              hasNoEnterpriseSelected: false,
            },
            error: {},
            hasBeenSubmit: false,
            isStepValid: false,
          },
        }));
      },
    },
  }));
