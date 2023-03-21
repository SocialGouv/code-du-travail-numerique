import { elasticsearchClient, elasticDocumentsIndex } from "../../utils";
import { getDocsCountQuery } from "./queries";

export const getDocsCount = async () => {
  const body = getDocsCountQuery();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return { ...response.body.aggregations };
};
