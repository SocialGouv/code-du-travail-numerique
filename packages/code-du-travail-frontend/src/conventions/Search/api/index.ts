import { parseIdcc } from "@socialgouv/modeles-social";

import { searchAgreement } from "./agreement.service";
import getQueryType, { QueryType } from "./getQueryType";
import { Enterprise, searchEnterprises } from "./enterprises.service";
import { Agreement } from "./type";

export type ResultType = {
  conventions: Agreement[];
  entreprises: Enterprise[];
} | null;
// build a result list based on query type
export const getResults = async (query: string): Promise<ResultType | null> => {
  const trimmedQuery = query.trim();
  const type = getQueryType(query);

  let conventions: Agreement[] = [];
  let entreprises: Enterprise[] = [];

  switch (type) {
    case QueryType.TEXT:
      [conventions, entreprises] = await Promise.all([
        searchAgreement(trimmedQuery),
        searchEnterprises(trimmedQuery).then((entreprises) =>
          entreprises.filter(
            (entreprise) =>
              entreprise.conventions && entreprise.conventions.length
          )
        ),
      ]);
      break;
    case QueryType.IDCC:
      const matches = await searchAgreement(trimmedQuery);

      if (matches && matches.length) {
        const perfectMatch = matches.find(
          (match) => match.num === parseIdcc(trimmedQuery)
        );
        conventions = perfectMatch ? [perfectMatch] : matches.slice(0, 5);
      }
      break;
    default:
      return null;
  }
  return {
    conventions,
    entreprises,
  };
};
