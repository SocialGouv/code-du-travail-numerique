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
};

export type SituationPreavisDemission = Situation;

export type SituationHeuresRechercheEmploi = Situation & {
  typeRupture: string;
};

export type SituationPreavisLicenciement = Situation;

export type PreavisDemission = {
  questions: Question[];
  situations: SituationPreavisDemission[];
};

export type HeuresRechercheEmploi = {
  questions: Question[];
  situations: SituationHeuresRechercheEmploi[];
};

export type PreavisLicenciement = {
  questions: Question[];
  situations: SituationPreavisLicenciement[];
};
