export type Question = {
  name: string;
  question: string;
  note?: string;
  key?: string;
};

export type Criteria = Record<string, string | undefined>;

export type Situation = {
  criteria: Criteria;
  type: string;
  idcc: number;
  note?: string[] | string | undefined;
  answer: string | null;
  answer2: string | null;
  answer3: string | null;
  ref?: string | null;
  refUrl?: string | null;
  refs?: { ref: string; refUrl: string }[] | null;
  disableLegal?: boolean;
};

export type SituationHeuresRechercheEmploi = Situation & {
  typeRupture: string | null;
};

export type HeuresRechercheEmploi = {
  questions: Question[];
  situations: SituationHeuresRechercheEmploi[];
};

export type PreavisLicenciement = {
  questions: Question[];
  situations: Situation[];
};
