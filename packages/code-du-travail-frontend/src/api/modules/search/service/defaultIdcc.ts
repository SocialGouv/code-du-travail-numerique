import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "src/api/utils";
import { extractHits } from "../utils";
import { PresearchClass, PreSearchResult, SEARCH_ALGO } from "./types";

const DEFAULT_CC_CONTENT = [
  {
    slug: "convention-collective",
    source: SOURCES.TOOLS,
  },
  {
    slug: "convention-collective",
    source: SOURCES.SHEET_SP,
  },
  {
    slug: "comment-consulter-une-convention-collective",
    source: SOURCES.SHEET_SP,
  },
];

let defaultsIdccResults: PreSearchResult[] = [];

export const NO_CC_TOKENS = ["ruptur"];

export const MATCHING_CC_TOKENS = [
  "convention",
  "colectif",
  "national",
  "branch",
  "idcc",
  "ccn",
];

export const getDefaultIdccResults = async (): Promise<PreSearchResult[]> => {
  if (defaultsIdccResults.length < 1) {
    const query = {
      bool: {
        must: {
          bool: {
            should: DEFAULT_CC_CONTENT.map(({ slug, source }) => ({
              bool: {
                must: [{ term: { slug } }, { term: { source } }],
              },
            })),
          },
        },
      },
    };

    defaultsIdccResults = await elasticsearchClient
      .search<any>({
        body: {
          size: 1000,
          _source: [
            "title",
            "slug",
            "url",
            "source",
            "cdtnId",
            "description",
            "breadcrumbs",
          ],
          query,
        },
        index: elasticDocumentsIndex,
      })
      .then((r) =>
        extractHits(r).map(({ _source }) => ({
          ..._source,
          algo: SEARCH_ALGO.PRESEARCH,
          class: PresearchClass.CC_FOUND,
        }))
      );
  }
  return defaultsIdccResults;
};
