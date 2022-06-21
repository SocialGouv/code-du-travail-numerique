import { Criteria } from "@cdt/data";

export type LicenciementSituation = {
  criteria: Criteria;
  duration: number;
  answer: string;
  note?: string;
  ref?: string;
  refUrl?: string;
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
