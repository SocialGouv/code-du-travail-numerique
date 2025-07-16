import type { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

export type Seniority =
  | "'Moins de 6 mois'"
  | "'6 mois à moins de 2 ans'"
  | "'Plus de 2 ans'";

export type StatusStoreInput = {
  seriousMisconduct?: boolean;
  disabledWorker?: boolean;
  seniority?: Seniority;
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
  onSeniorityChange: (value: Seniority) => void;
  onNextStep: () => ValidationResponse;
};

export type StatusStoreSlice = {
  statusData: StatusStoreData;
  statusFunction: StatusStoreFunction;
};
