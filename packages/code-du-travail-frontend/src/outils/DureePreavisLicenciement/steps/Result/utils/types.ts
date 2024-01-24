import { Criteria } from "@socialgouv/modeles-social";

export type LicenciementSituation = {
  criteria: Criteria;
  idcc?: number;
  duration: number;
  answer: string;
  note?: string | string[];
  ref?: string;
  refUrl?: string;
  ref2?: string;
  ref2Url?: string;
};

export type Situations = {
  legal?: LicenciementSituation;
  agreement?: LicenciementSituation;
};

export type Results = {
  duration: string;
  legal?: string;
  agreement?: string;
};
