export type ElasticGlossary = {
  data: GlossaryItem[];
};

export interface GlossaryItem {
  term: string;
  abbreviations: string[];
  definition: string;
  variants: string[];
  references: string[];
  slug: string;
}

export type GlossaryLetter = {
  letter: string;
  terms: GlossaryItem[];
};

export type GlossaryByLetter = GlossaryLetter[];
