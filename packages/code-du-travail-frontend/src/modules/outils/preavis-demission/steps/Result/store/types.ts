import {
  PublicodesPreavisDemissionResult,
  References,
  Notification,
} from "@socialgouv/modeles-social";

export type ResultStoreInput = {
  result?: PublicodesPreavisDemissionResult;
  resultNotifications?: Notification[];
  resultReferences?: References[];
  isAgreementSupported: boolean;
};

export type ResultStoreError = {
  errorPublicodes?: boolean;
};

export type ResultStoreData = {
  input: ResultStoreInput;
  error: ResultStoreError;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

export type ResultStoreFn = {
  getPublicodesResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
