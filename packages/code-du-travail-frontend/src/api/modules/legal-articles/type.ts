import {
  DocumentElasticWithSource,
  LaborCodeDoc,
} from "@socialgouv/cdtn-types";

export type DocumentElasticResult<T> = T & {
  _id: string;
};


export type ElasticLaborCodeArticle = DocumentElasticWithSource<
  Omit<LaborCodeDoc, "cid">
>;
