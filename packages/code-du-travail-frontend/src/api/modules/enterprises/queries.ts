import { SOURCES } from "@socialgouv/cdtn-utils";
import { Agreement } from "../../../outils/types";

export type AgreementResponse = Agreement & {
  contributions?: boolean;
};

export const getAgreements = (idccList: number[]) => {
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
