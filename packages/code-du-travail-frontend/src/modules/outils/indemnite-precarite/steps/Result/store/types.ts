import { Formula, Notification, References } from "@socialgouv/modeles-social";
import { CalculationResult } from "../../../types";

export type ResultStoreData = {
  result?: CalculationResult;
  calculationError?: string;
  isAgreementSupported?: boolean;
  resultNotifications?: Notification[];
  resultReferences?: References[];
  resultFormula?: Formula;
  totalSalary?: number;
};

export type ResultStoreFn = {
  calculateResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
