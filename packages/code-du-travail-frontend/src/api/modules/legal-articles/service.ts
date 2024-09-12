import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getLegalArticle } from "./queries";
import { DocumentElasticResult, ElasticLaborCodeArticle } from "./type";
import { nonNullable } from "@socialgouv/modeles-social";

export const getGeneric = async <V,
  K extends keyof V
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<V, K>> | undefined
> => {

}
export const getLegalArticleBySlug = async <
  K extends keyof ElasticLaborCodeArticle
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<ElasticLaborCodeArticle, K>> | undefined
> => {
  const body = getLegalArticle(slug);
  const response = await elasticsearchClient.search<
    DocumentElasticResult<Pick<ElasticLaborCodeArticle, K>>
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter(nonNullable)[0];
};
