import { Formula, Notification, References } from "@socialgouv/modeles-social";

export type ResultStoreData = {
  result?: number;
  calculationError?: string;
  isAgreementSupported?: boolean;
  resultNotifications?: Notification[];
  resultReferences?: References[];
  resultFormula?: Formula;
  totalSalary?: number;
  indemnityName?: string;
  calculationSummary?: Record<string, any>;
};

export type ResultStoreFn = {
  calculateResult: () => void;
};

export type ResultStoreSlice = {
  resultData: ResultStoreData;
  resultFunction: ResultStoreFn;
};
