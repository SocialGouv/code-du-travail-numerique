import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getSearchBySourceSlugBody } from "./queries";
import { getRelatedItems } from "./utils";
import { DocumentElasticResult } from "../legal-articles/type";
import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";

export const getBySourceAndSlugItems = async <Type>(
  source: string,
  slug: string
) => {
  const body = getSearchBySourceSlugBody({ slug, source });
  const response = await elasticsearchClient.search<Type>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }

  const item = response.hits.hits[0];

  const { _id } = item;

  const relatedItems = await getRelatedItems({
    settings: [{ _id }],
    slug,
  });

  return {
    ...item,
    relatedItems,
  };
};

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
