import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getLegalArticle } from "./queries";
import { ElasticLaborCodeArticle } from "./type";
import { nonNullable } from "@socialgouv/modeles-social";

// TODO bouger dans un fichier common ??
export const getItemBySlug = async <V>(
  fields: string[],
  body: any
): Promise<V | undefined> => {
  const response = await elasticsearchClient.search<V>({
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

export const getLegalArticleBySlug = async <
  K extends keyof ElasticLaborCodeArticle
>(
  slug: string,
  fields: K[]
): Promise<ElasticLaborCodeArticle | undefined> => {
  const body = getLegalArticle(slug);
  return await getItemBySlug<ElasticLaborCodeArticle>(fields, body);
};
