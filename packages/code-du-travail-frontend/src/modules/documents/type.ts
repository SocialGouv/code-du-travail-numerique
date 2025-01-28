import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElastic } from "@socialgouv/cdtn-types/build/elastic/common";

export type DocumentElasticResult<T> = T & {
  _id: string;
};

export const sources = [
  SOURCES.TOOLS,
  SOURCES.SHEET_SP,
  SOURCES.SHEET_MT,
  SOURCES.LETTERS,
  SOURCES.CONTRIBUTIONS,
  SOURCES.EXTERNALS,
  SOURCES.LABOUR_LAW,
  SOURCES.SHEET_MT_PAGE,
] as const;

export type Source = (typeof sources)[number];

export type RelatedItem = Pick<DocumentElastic, "title"> & {
  source: Source;
  url: string;
};

// @TODO : utiliser LinkedContent dans cdtn-types une fois le package publié
export type LinkedContent = Pick<DocumentElastic, "title"> & {
  source: Source;
  slug: string;
  url?: string;
};
