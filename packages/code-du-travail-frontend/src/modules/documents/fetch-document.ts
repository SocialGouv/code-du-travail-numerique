import { DocumentElasticResult } from "./type";
import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

export const fetchDocument = async <
  V,
  K extends keyof DocumentElasticResult<V>,
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
