import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getIdccBody } from "./queries";

export const parseIdcc = (query) =>
  /^\d+$/.test(query) ? parseInt(query, 10) : undefined;

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

export const getCCByIdcc = async (query: string) => {
  const responseBody = await getIdccByQuery(query);

  const ccs = responseBody.hits.hits.map((t) => t._source);
  return ccs[0];
};
