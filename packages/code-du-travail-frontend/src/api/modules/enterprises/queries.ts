import { SOURCES } from "@socialgouv/cdtn-utils";

type SearchAgreementsBody = {
  _source: string[];
  from: number;
  query: unknown;
  size: number;
};

export const getAgreements = (idccList: number[]): SearchAgreementsBody => {
  return {
    _source: ["id", "title", "shortTitle", "num", "slug", "highlight", "url"],
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
