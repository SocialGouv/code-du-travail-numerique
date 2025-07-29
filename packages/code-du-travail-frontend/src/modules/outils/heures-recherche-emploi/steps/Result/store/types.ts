import { References, Notification } from "@socialgouv/modeles-social";

export type ResultStoreInput = {
  result?: any; // Pour heures recherche emploi, nous utiliserons un type générique
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
