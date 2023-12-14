import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import { getAgreements, SearchAgreementsResponse } from "../queries";

export const fetchAgreements = async (idccList: number[]) => {
  const body = getAgreements(idccList);
  const response = await elasticsearchClient.search<SearchAgreementsResponse>({
    body,
    index: elasticDocumentsIndex,
  });
  return response;
};
