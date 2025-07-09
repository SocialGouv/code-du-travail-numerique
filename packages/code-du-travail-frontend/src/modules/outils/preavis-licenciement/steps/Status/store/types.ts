import type { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type StatusStoreInput = {
  seriousMisconduct?: boolean;
  disabledWorker?: boolean;
  seniority?: { value: string; label: string };
};

export type StatusStoreError = {
  seriousMisconduct?: string;
  disabledWorker?: string;
  seniority?: string;
};

export type StepData<Input, Error> = {
  input: Input;
  error: Error;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type StatusStoreData = StepData<StatusStoreInput, StatusStoreError>;

export type StatusStoreFunction = {
  onSeriousMisconductChange: (value: boolean) => void;
  onDisabledWorkerChange: (value: boolean) => void;
  onSeniorityChange: (value: { value: string; label: string }) => void;
  onNextStep: () => ValidationResponse;
  resetStep: () => void;
};

export type StatusStoreSlice = {
  statusData: StatusStoreData;
  statusFunction: StatusStoreFunction;
};
