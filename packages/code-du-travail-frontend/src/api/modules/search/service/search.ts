import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import { getRelatedThemesBody, getSearchBody } from "../queries";
import { esDocToSearchResult, extractHits, removeDuplicate } from "../utils";
import { getPrequalifiedResults } from "./prequalified";
import { presearch } from "./presearch";
import { SEARCH_ALGO, SearchResult } from "./types";

export const DEFAULT_PRESEARCH_RESULTS_NUMBER = 8;

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;

export const searchWithQuery = async (
  query: string,
  sizeParams = DEFAULT_RESULTS_NUMBER,
  withPQ = false
): Promise<{
  documents: SearchResult[];
  class: string;
}> => {
  const size = Math.min(sizeParams, MAX_RESULTS);

  const sources = [
    SOURCES.SHEET_MT,
    SOURCES.SHEET_SP,
    SOURCES.LETTERS,
    SOURCES.TOOLS,
    SOURCES.CONTRIBUTIONS,
    SOURCES.EXTERNALS,
    SOURCES.THEMATIC_FILES,
    SOURCES.EDITORIAL_CONTENT,
    SOURCES.CCN,
    SOURCES.INFOGRAPHICS,
  ];

  const esReq = getRelatedThemesBody(query);
  const themes = await elasticsearchClient
    .search<unknown>({
      index: elasticDocumentsIndex,
      ...esReq,
    })
    .then((r) =>
      extractHits(r).map(esDocToSearchResult(SEARCH_ALGO.FULL_TEXT))
    );

  const parsed = await presearch(query, themes, true);

  const documents: SearchResult[] = parsed.results.slice(0, size);

  // check prequalified requests : to be removed soon
  const prequalifiedResults = withPQ ? await getPrequalifiedResults(query) : [];

  const mappedPrequa: SearchResult[] = prequalifiedResults.map(
    esDocToSearchResult(SEARCH_ALGO.PREQUA)
  );

  for (const e of mappedPrequa) {
    documents.push(e);
  }

  // if not enough prequalified results, we also trigger ES search
  if (removeDuplicate(documents).length < size) {
    const docReq = getSearchBody(query, size, sources);
    const fulltextHits: SearchResult[] = await elasticsearchClient
      .search<unknown>({
        index: elasticDocumentsIndex,
        ...docReq,
      })
      .then((r) =>
        extractHits(r).map(esDocToSearchResult(SEARCH_ALGO.FULL_TEXT))
      );
    // Enrich tool results from presearch/prequalified with displayTitle from fulltext
    const fulltextToolTitles = new Map(
      fulltextHits
        .filter((h) => h.source === SOURCES.TOOLS)
        .map((h) => [h.cdtnId, h.title])
    );

    for (const doc of documents) {
      if (doc.source === SOURCES.TOOLS && fulltextToolTitles.has(doc.cdtnId)) {
        doc.title = fulltextToolTitles.get(doc.cdtnId)!;
      }
    }
    documents.push(...fulltextHits);
  }

  return {
    documents: removeDuplicate(documents).slice(0, size),
    class: parsed.classes[0],
  };
};
