import type { RequestBody } from "@elastic/elasticsearch/lib/Transport";

type Response = {
  num: string;
  highlight: {
    title: string;
    content: string;
    searchInfo: string;
  };
}[];

const getAgreementsHighlight = (idccList: number[]): RequestBody => {
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
          { term: { source: "conventions_collectives" } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: idccList.length,
  };
};

export default getAgreementsHighlight;
