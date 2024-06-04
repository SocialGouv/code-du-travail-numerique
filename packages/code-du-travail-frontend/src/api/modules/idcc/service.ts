import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getIdccBody } from "./queries";

export const parseIdcc = (query) =>
  /^\d+$/.test(query) ? parseInt(query, 10) : undefined;

export const getIdccByQuery = async (query: string) => {
  const idccQuery = parseIdcc(query);

  const body: any = getIdccBody({ idccQuery, query });

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  const { took, ...rest } = response;
  return { ...rest };
};
