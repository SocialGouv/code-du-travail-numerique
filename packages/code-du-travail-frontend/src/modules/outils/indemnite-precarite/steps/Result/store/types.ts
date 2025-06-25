import { CalculationResult } from "../../../types";

export type ResultStoreData = {
  result?: CalculationResult;
  isCalculating: boolean;
  calculationError?: string;
  isAgreementSupported?: boolean;
  resultNotifications?: any[];
  resultReferences?: any[];
};

export type ResultStoreFn = {
  calculateResult: () => void;
  getPublicodesResult: () => void;
  resetResult: () => void;
  setCalculationError: (error?: string) => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
