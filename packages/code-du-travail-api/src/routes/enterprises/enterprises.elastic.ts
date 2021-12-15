import { SOURCES } from "@socialgouv/cdtn-sources";

export interface Agreement {
  num: number;
  slug: string;
}

export interface SearchAgreementsBody {
  _source: string[];
  from: number;
  query: unknown;
  size: number;
}

const getAgreements = (idccList: number[]): SearchAgreementsBody => {
  return {
    _source: ["num", "slug"],
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
