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
] as const;

export type RelatedItem = Pick<DocumentElastic, "title"> & {
  source: (typeof sources)[number];
  url: string;
};
