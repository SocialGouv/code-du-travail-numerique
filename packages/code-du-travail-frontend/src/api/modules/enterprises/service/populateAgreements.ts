import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import {
  AgreementResponse,
  getAgreements,
  SearchAgreementsResponse,
} from "../queries";
import { ApiEnterpriseData, EnterpriseAgreement } from "../types";
import { IDCC_TO_REPLACE } from "../../../config";
import { Convention, EnterpriseApiResponse } from "./fetchEnterprises";

const toAgreement = (convention: Convention): EnterpriseAgreement => ({
  id: convention.id ?? convention.idcc,
  num: convention.idcc,
  shortTitle: convention.shortTitle ?? "Convention collective non reconnue",
  title: convention.title,
  hasAnswers: false,
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
    const response = await elasticsearchClient.search<SearchAgreementsResponse>(
      { body, index: elasticDocumentsIndex }
    );

    if (response.body.hits.total.value > 0) {
      const agreements = response.body.hits.hits.reduce(
        (acc: Record<number, AgreementResponse>, curr) => {
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
            (convention): EnterpriseAgreement => {
              if (agreements[convention.idcc]) {
                const { answers, ...agreement } = agreements[convention.idcc];
                return {
                  ...agreement,
                  hasAnswers: answers.length > 0,
                };
              }
              return toAgreement(convention);
            }
          ),
        })),
      };

      if (idcc) {
        const idccToAdd = IDCC_TO_REPLACE[idcc] as number[];
        let conventionsToAdd: EnterpriseAgreement[] = idccToAdd
          .map((idcc) => ({
            ...agreements[idcc],
            hasAnswers: agreements[idcc].answers.length > 0,
          }))
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
