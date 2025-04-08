export type GlossaryTerm = {
  term: string;
  slug: string;
  definition?: string;
  references?: string[];
};

export type GlossaryLetter = {
  letter: string;
  terms: GlossaryTerm[];
};
