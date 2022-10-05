export type Question = {
  name: string;
  question: string;
  note?: string;
};

export type Criteria = Record<string, string | undefined>;

export type Situation = {
  criteria: Criteria;
  type: string;
  idcc: number;
  note?: string;
  answer: string | null;
  answer2: string | null;
  answer3: string | null;
  ref: string | null;
  refUrl: string | null;
  ref2?: string;
  ref2Url?: string;
  disableLegal?: boolean;
};

export type SituationHeuresRechercheEmploi = Situation & {
  typeRupture: string | null;
};

export type PreavisDemission = {
  questions: Question[];
  situations: Situation[];
};

export type HeuresRechercheEmploi = {
  questions: Question[];
  situations: SituationHeuresRechercheEmploi[];
};

export type PreavisLicenciement = {
  questions: Question[];
  situations: Situation[];
};
