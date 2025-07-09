import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type InformationsStoreInput = {
  questions?: any;
  notificationDate?: string;
  dismissalDate?: string;
  salary?: string;
  additionalInfo?: string;
};

export type InformationsStoreError = {
  questions?: string;
  notificationDate?: string;
  dismissalDate?: string;
  salary?: string;
  additionalInfo?: string;
};

export type StepData<Input, Error> = {
  input: Input;
  error: Error;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type InformationsStoreData = StepData<
  InformationsStoreInput,
  InformationsStoreError
> & {
  publicodes: any;
};

export type InformationsStoreFunction = {
  onQuestionsChange: (questions: any) => void;
  onNotificationDateChange: (date: string) => void;
  onDismissalDateChange: (date: string) => void;
  onSalaryChange: (salary: string) => void;
  onAdditionalInfoChange: (info: string) => void;
  onNextStep: () => ValidationResponse;
  shouldSkipStep: () => boolean;
  resetStep: () => void;
};

export type InformationsStoreSlice = {
  informationsData: InformationsStoreData;
  informationsFunction: InformationsStoreFunction;
};
