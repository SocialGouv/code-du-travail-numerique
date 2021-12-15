import { SOURCES } from "@socialgouv/cdtn-sources";

export interface AgreementHighlight {
  title: string;
  content: string;
  searchInfo: string;
}

export interface AgreementWithHighlight {
  num: number;
  highlight: AgreementHighlight;
}

export interface SearchAgreementsHighlightBody {
  _source: string[];
  from: number;
  query: unknown;
  size: number;
}

const getAgreementsHighlight = (
  idccList: number[]
): SearchAgreementsHighlightBody => {
  return {
    _source: ["num", "highlight"],
    from: 0,
    query: {
      bool: {
        filter: [
          {
            exists: {
              field: "highlight",
            },
          },
          { terms: { num: idccList } },
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: idccList.length,
  };
};

export default getAgreementsHighlight;
