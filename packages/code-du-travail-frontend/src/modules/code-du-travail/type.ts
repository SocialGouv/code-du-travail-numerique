import {
  DocumentElasticWithSource,
  LaborCodeDoc,
} from "@socialgouv/cdtn-types";

export type ElasticLaborCodeArticle = DocumentElasticWithSource<
  Omit<LaborCodeDoc, "cid">
>;
