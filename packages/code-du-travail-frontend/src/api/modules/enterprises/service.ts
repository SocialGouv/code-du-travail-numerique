import { SearchResponse, Agreement } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAgreements } from "./queries";
import { EnterpriseApiResponse, ApiEnterpriseData, Convention } from "./types";

const toAgreement = (convention: Convention): Agreement => ({
  id: convention.id,
  num: convention.idcc,
  shortTitle: convention.shortTitle,
  title: convention.title,
  ...(convention.url ? { url: convention.url } : {}),
});

export const populateAgreements = async (
  enterpriseApiResponse: EnterpriseApiResponse
): Promise<ApiEnterpriseData> => {
  const idccList: number[] =
    enterpriseApiResponse.entreprises?.flatMap((enterprise) =>
      enterprise.conventions.flatMap((convention) => convention.idcc)
    ) ?? [];

  if (idccList.length > 0) {
    const body = getAgreements(idccList);
    const response = await elasticsearchClient.search<
      SearchResponse<Agreement>
    >({ body, index: elasticDocumentsIndex });

    if (response.body.hits.total.value > 0) {
      const agreements = response.body.hits.hits.reduce(
        (acc: Record<number, Agreement>, curr) => {
          acc[curr._source.num] = curr._source;
          return acc;
        },
        {}
      );
      return {
        ...enterpriseApiResponse,
        entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
          ...enterprise,
          conventions: enterprise.conventions.map(
            (convention): Agreement =>
              agreements[convention.idcc] ?? toAgreement(convention)
          ),
        })),
      };
    }
  }
  return {
    ...enterpriseApiResponse,
    entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
      ...enterprise,
      conventions: enterprise.conventions.map(toAgreement),
    })),
  };
};
