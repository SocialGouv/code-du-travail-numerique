import { createStore as create, StoreApi, useStore } from "zustand";
import { createContext } from "react";
import { ValidationResponse } from "../../common/components/SimulatorLayout/types";

// Types pour les données de chaque étape
export type StatusStoreInput = {
  seriousMisconduct?: boolean;
  disabledWorker?: boolean;
  seniority?: { value: string; label: string };
};

export type AgreementStoreInput = {
  route?: string;
  agreement?: any;
  enterprise?: any;
  hasNoEnterpriseSelected?: boolean;
};

export type InformationsStoreInput = {
  questions?: any;
  notificationDate?: string;
  dismissalDate?: string;
  salary?: string;
  additionalInfo?: string;
};

export type ResultStoreInput = {
  result?: any;
};

// Store simple pour le préavis de licenciement
export type MainStore = {
  statusData: {
    input: StatusStoreInput;
    error: Record<string, string>;
    hasBeenSubmit: boolean;
    isStepValid: boolean;
  };
  statusFunction: {
    onNextStep: () => ValidationResponse;
    onSeriousMisconductChange: (value: boolean) => void;
    onDisabledWorkerChange: (value: boolean) => void;
    onSeniorityChange: (value: { value: string; label: string }) => void;
  };
  agreementData: {
    input: AgreementStoreInput;
    error: Record<string, string>;
    hasBeenSubmit: boolean;
    isStepValid: boolean;
  };
  agreementFunction: {
    onNextStep: () => ValidationResponse;
    onRouteChange: (value: string) => void;
    onAgreementChange: (agreement: any, enterprise?: any) => void;
  };
  informationsData: {
    input: InformationsStoreInput;
    error: Record<string, string>;
    hasBeenSubmit: boolean;
    isStepValid: boolean;
  };
  informationsFunction: {
    onNextStep: () => ValidationResponse;
    shouldSkipStep: () => boolean;
    onQuestionsChange: (questions: any) => void;
    onNotificationDateChange: (date: string) => void;
    onDismissalDateChange: (date: string) => void;
    onSalaryChange: (salary: string) => void;
    onAdditionalInfoChange: (info: string) => void;
  };
  resultData: {
    input: ResultStoreInput;
    error: Record<string, string>;
    hasBeenSubmit: boolean;
    isStepValid: boolean;
  };
  resultFunction: {
    calculateResult: () => void;
  };
};

const createStore = () =>
  create<MainStore>((set, get) => ({
    statusData: {
      input: {
        seriousMisconduct: undefined,
        disabledWorker: undefined,
        seniority: undefined,
      },
      error: {},
      hasBeenSubmit: false,
      isStepValid: false,
    },
    statusFunction: {
      onNextStep: () => {
        // Validation logic for status step
        const { input } = get().statusData;
        const errors: Record<string, string> = {};

        if (input.seriousMisconduct === undefined) {
          errors.seriousMisconduct =
            "Veuillez indiquer si le licenciement est pour faute grave";
        }
        if (
          input.seriousMisconduct === false &&
          input.disabledWorker === undefined
        ) {
          errors.disabledWorker =
            "Veuillez indiquer si le salarié est travailleur handicapé";
        }
        if (
          input.seriousMisconduct === false &&
          input.disabledWorker !== undefined &&
          !input.seniority
        ) {
          errors.seniority = "Veuillez sélectionner l'ancienneté";
        }

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
      onSeriousMisconductChange: (value) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, seriousMisconduct: value },
          },
        }));
      },
      onDisabledWorkerChange: (value) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, disabledWorker: value },
          },
        }));
      },
      onSeniorityChange: (value) => {
        set((state) => ({
          statusData: {
            ...state.statusData,
            input: { ...state.statusData.input, seniority: value },
          },
        }));
      },
    },
    agreementData: {
      input: { route: undefined, agreement: undefined, enterprise: undefined },
      error: {},
      hasBeenSubmit: false,
      isStepValid: false,
    },
    agreementFunction: {
      onNextStep: () => {
        const { input } = get().agreementData;
        const errors: Record<string, string> = {};

        if (!input.route) {
          errors.route = "Veuillez sélectionner une option";
        }

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
      onRouteChange: (value) => {
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            input: { ...state.agreementData.input, route: value },
          },
        }));
      },
      onAgreementChange: (agreement, enterprise) => {
        set((state) => ({
          agreementData: {
            ...state.agreementData,
            input: { ...state.agreementData.input, agreement, enterprise },
          },
        }));
      },
    },
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
    },
    informationsFunction: {
      onNextStep: () => ValidationResponse.Valid,
      shouldSkipStep: () => false,
      onQuestionsChange: (questions) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, questions },
          },
        }));
      },
      onNotificationDateChange: (date) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, notificationDate: date },
          },
        }));
      },
      onDismissalDateChange: (date) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, dismissalDate: date },
          },
        }));
      },
      onSalaryChange: (salary) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, salary },
          },
        }));
      },
      onAdditionalInfoChange: (info) => {
        set((state) => ({
          informationsData: {
            ...state.informationsData,
            input: { ...state.informationsData.input, additionalInfo: info },
          },
        }));
      },
    },
    resultData: {
      input: { result: undefined },
      error: {},
      hasBeenSubmit: false,
      isStepValid: true,
    },
    resultFunction: {
      calculateResult: () => {
        // Result calculation logic
      },
    },
  }));

const PreavisLicenciementContext = createContext<StoreApi<MainStore>>(
  {} as StoreApi<MainStore>
);

const { Provider } = PreavisLicenciementContext;

export {
  Provider as PreavisLicenciementProvider,
  createStore as createPreavisLicenciementStore,
  PreavisLicenciementContext,
  useStore as usePreavisLicenciementStore,
};
