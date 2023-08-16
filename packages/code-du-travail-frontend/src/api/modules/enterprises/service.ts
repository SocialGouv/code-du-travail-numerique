import { SearchResponse, Agreement } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAgreements } from "./queries";
import { EnterpriseApiResponse, ApiEnterpriseData, Convention } from "./types";
import { IDCC_TO_REPLACE } from "../../config";

const toAgreement = (convention: Convention): Agreement => ({
  id: convention.id ?? convention.idcc,
  num: convention.idcc,
  shortTitle: convention.shortTitle ?? "Convention collective non reconnue",
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
  const idccKeys = Object.keys(IDCC_TO_REPLACE);
  const idcc = idccList.find((idcc) => idccKeys.includes(idcc.toString()));
  if (idcc) {
    const idccToAdd = IDCC_TO_REPLACE[idcc] as number[];
    idccList.push(...idccToAdd);
  }

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

      const result = {
        ...enterpriseApiResponse,
        entreprises: enterpriseApiResponse.entreprises?.map((enterprise) => ({
          ...enterprise,
          conventions: enterprise.conventions.map(
            (convention): Agreement =>
              agreements[convention.idcc] ?? toAgreement(convention)
          ),
        })),
      };

      if (idcc) {
        const idccToAdd = IDCC_TO_REPLACE[idcc] as number[];
        let conventionsToAdd: Agreement[] = idccToAdd
          .map((idcc) => agreements[idcc])
          .filter((convention) => convention !== undefined);
        result.entreprises = result.entreprises?.map((enterprise) => {
          const hasAlreadyIdcc = enterprise.conventions.find((convention) =>
            idccToAdd.includes(convention.num)
          );
          if (hasAlreadyIdcc) {
            conventionsToAdd = [];
          }
          return {
            ...enterprise,
            conventions: [...enterprise.conventions, ...conventionsToAdd]
              .filter((convention) => convention.num !== idcc)
              .filter(
                (convention, index, self) => self.indexOf(convention) === index
              ),
          };
        });
      }

      return result;
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
