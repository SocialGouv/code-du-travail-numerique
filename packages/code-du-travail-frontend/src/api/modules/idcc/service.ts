import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getIdccBody } from "./queries";

export const parseIdcc = (query) =>
  /^\d+$/.test(query) ? parseInt(query, 10) : undefined;
// TODO :warning:
export const getIdccByQuery = async (query: string) => {
  const idccQuery = parseIdcc(query);

  const body = getIdccBody({ idccQuery, query });

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  const { took, ...rest } = response.body;
  return { ...rest };
};
