import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import { getAgreements, AgreementResponse } from "../queries";

export const fetchAgreements = async (idccList: number[]) => {
  const body = getAgreements(idccList);
  const response = await elasticsearchClient.search<AgreementResponse>({
    index: elasticDocumentsIndex,
    ...body,
  });
  return response;
};
