import {
  PublicodesPreavisLicenciementResult,
  References,
  Notification,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";

export type ResultStoreInput = {
  result?: PublicodesPreavisLicenciementResult;
  publicodesLegalResult?: PublicodesPreavisLicenciementResult;
  publicodesAgreementResult?: PublicodesPreavisLicenciementResult;
  resultExplanation?: ExplanationMainResult;
  resultNotifications?: Notification[];
  resultReferences?: References[];
  isAgreementSupported: boolean;
};

export type ResultStoreError = {
  errorPublicodes?: string;
};

export type StepData<Input, Error> = {
  input: Input;
  error: Error;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type ResultStoreData = StepData<ResultStoreInput, ResultStoreError> & {
  publicodes: any;
};

export type ResultStoreFunction = {
  calculateResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFunction;
};
