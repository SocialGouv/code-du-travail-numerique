import { SOURCES } from "@socialgouv/cdtn-utils";
import { Agreement } from "../../../outils/types";
import { SearchResponse } from "../../types";

type SearchAgreementsBody = {
  _source: string[];
  from: number;
  query: unknown;
  size: number;
};

export type AgreementResponse = Agreement & {
  contributions?: boolean;
};

export type SearchAgreementsResponse = SearchResponse<AgreementResponse>;

export const getAgreements = (idccList: number[]): SearchAgreementsBody => {
  return {
    _source: [
      "id",
      "title",
      "shortTitle",
      "num",
      "slug",
      "highlight",
      "url",
      "contributions",
    ],
    from: 0,
    query: {
      bool: {
        filter: [
          { terms: { num: idccList } },
          { term: { source: SOURCES.CCN } },
        ],
      },
    },
    size: idccList.length,
  };
};
