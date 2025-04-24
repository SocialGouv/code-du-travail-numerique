import { ElasticTool } from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getTools } from "./queries";

export const getBySlugTools = async (
  slug: string
): Promise<ElasticTool | undefined> => {
  const body: any = getTools(undefined, [slug]);
  const response = await elasticsearchClient.search<ElasticTool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }
  return response.hits.hits[0]._source;
};
