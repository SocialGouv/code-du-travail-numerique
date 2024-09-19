import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getLegalArticle } from "./queries";
import { DocumentElasticResult, ElasticLaborCodeArticle } from "./type";

// TODO bouger dans un fichier common ??
export const getItemBySlug = async <
  V,
  K extends keyof DocumentElasticResult<V>
>(
  fields: K[],
  body: SearchRequest
): Promise<DocumentElasticResult<V> | undefined> => {
  const response = await elasticsearchClient.search<V>({
    _source: fields,
    index: elasticDocumentsIndex,
    ...body,
  });
  if (response.hits.hits.length === 0) {
    return;
  }
  const item = response.hits.hits[0];
  return { ...item._source, _id: item._id } as DocumentElasticResult<V>;
};

export const getLegalArticleBySlug = async (
  slug: string
): Promise<DocumentElasticResult<ElasticLaborCodeArticle> | undefined> => {
  const body = getLegalArticle(slug);
  return await getItemBySlug<
    ElasticLaborCodeArticle,
    keyof DocumentElasticResult<ElasticLaborCodeArticle>
  >(["description", "title", "dateDebut", "html", "url", "notaHtml"], body);
};
