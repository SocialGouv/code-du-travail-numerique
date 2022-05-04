import { SOURCES } from "@socialgouv/cdtn-sources";

export type SearchAgreementsBody = {
  _source: string[];
  from: number;
  query: unknown;
  size: number;
};

const getAgreements = (idccList: number[]): SearchAgreementsBody => {
  return {
    _source: ["id", "title", "shortTitle", "num", "slug", "highlight", "url"],
    from: 0,
    query: {
      bool: {
        filter: [
          { terms: { num: idccList } },
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: idccList.length,
  };
};

export default getAgreements;
