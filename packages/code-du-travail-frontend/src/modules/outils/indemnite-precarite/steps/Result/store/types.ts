import { CalculationResult } from "../../../types";

export type ResultStoreData = {
  result?: CalculationResult;
  calculationError?: string;
  isAgreementSupported?: boolean;
  resultNotifications?: any[];
  resultReferences?: any[];
  totalSalary?: number;
};

export type ResultStoreFn = {
  calculateResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
