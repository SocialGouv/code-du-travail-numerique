import { OldReference } from "@socialgouv/modeles-social";

export type LicenciementSituation = {
  criteria: any;
  duration: number;
  answer: string;
  ref?: string;
  refUrl?: string;
  refs?: OldReference[];
  note?: string | string[];
};

export type Situations = {
  legal?: LicenciementSituation;
  agreement?: LicenciementSituation;
};

export type Agreement = {
  num: string;
  shortTitle: string;
  name: string;
};
