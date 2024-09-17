import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getLegalArticle } from "./queries";
import { DocumentElasticResult, ElasticLaborCodeArticle } from "./type";

// TODO bouger dans un fichier common ??
export const getItemBySlug = async <V>(
  fields: string[],
  body: any
): Promise<DocumentElasticResult<V> | undefined> => {
  const response = await elasticsearchClient.search<DocumentElasticResult<V>>({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }
  const item = response.hits.hits[0];
  return { ...item._source, _id: item._id };
};

export const getLegalArticleBySlug = async <
  K extends keyof DocumentElasticResult<ElasticLaborCodeArticle>
>(
  slug: string,
  fields: K[]
): Promise<DocumentElasticResult<ElasticLaborCodeArticle> | undefined> => {
  const body = getLegalArticle(slug);
  return await getItemBySlug<ElasticLaborCodeArticle>(fields, body);
};
