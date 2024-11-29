import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getIdccBody } from "./queries";

export const parseIdcc = (query) =>
  /^\d+$/.test(query) ? parseInt(query, 10) : undefined;

export const getIdccByQuery = async (query: string, size?: number) => {
  const idccQuery = parseIdcc(query);

  const body: any = getIdccBody({ idccQuery, query, size });

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  const { took, ...rest } = response;
  return { ...rest };
};
