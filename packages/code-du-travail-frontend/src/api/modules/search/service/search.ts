import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import {
  getRelatedArticlesBody,
  getRelatedThemesBody,
  getSearchBody,
} from "../queries";
import { removeDuplicate } from "../utils";
import { getPrequalifiedResults } from "./prequalified";
import { presearch } from "./presearch";
import { SEARCH_ALGO, SearchResponse, SearchResult } from "./types";
import { esDocToSearchResult, extractHits } from "../utils";

export const DEFAULT_PRESEARCH_RESULTS_NUMBER = 8;

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;
const THEMES_RESULTS_NUMBER = 5;
const CDT_RESULTS_NUMBER = 5;

const DOCUMENTS_ES = "documents_es";
const CDT_ES = "cdt_es";

export const searchWithQuery = async (
  query: string,
  sizeParams = DEFAULT_RESULTS_NUMBER
): Promise<SearchResponse> => {
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
  ];

  const articles: SearchResult[] = [];

  const esReq = getRelatedThemesBody(query);
  const themes = await elasticsearchClient
    .search<any>({
      body: esReq,
      index: elasticDocumentsIndex,
    })
    .then((r) =>
      extractHits(r).map(esDocToSearchResult(SEARCH_ALGO.FULL_TEXT))
    );

  const parsed = await presearch(query, themes, true);

  const documents: SearchResult[] = parsed.results.slice(0, size);

  // check prequalified requests : to be removed soon
  const prequalifiedResults = await getPrequalifiedResults(query);

  const mappedPrequa: SearchResult[] = prequalifiedResults.map(
    esDocToSearchResult(SEARCH_ALGO.PREQUA)
  );

  for (const e of mappedPrequa) {
    if (e.source === SOURCES.CDT) {
      articles.push(e);
    } else if (e.source === SOURCES.THEMES) {
      themes.push(e);
    } else {
      documents.push(e);
    }
  }

  const searches = {};
  const shouldRequestCdt = articles.length < 5;

  // if not enough prequalified results, we also trigger ES search
  if (documents.length < size) {
    searches[DOCUMENTS_ES] = [
      { index: elasticDocumentsIndex },
      getSearchBody(query, size, sources),
    ];
  }

  if (shouldRequestCdt) {
    const cdtNumber = CDT_RESULTS_NUMBER - articles.length;
    searches[CDT_ES] = [
      { index: elasticDocumentsIndex },
      getRelatedArticlesBody(query, cdtNumber),
    ];
  }

  const results = await msearch(searches);

  const fulltextHits: SearchResult[] = extractHits(results[DOCUMENTS_ES]).map(
    esDocToSearchResult(SEARCH_ALGO.FULL_TEXT)
  );
  documents.push(...fulltextHits);

  if (shouldRequestCdt) {
    articles.push(
      ...extractHits(results[CDT_ES]).map(
        esDocToSearchResult(SEARCH_ALGO.FULL_TEXT)
      )
    );
  }

  return {
    articles: removeDuplicate(articles),
    documents: removeDuplicate(documents).slice(0, size),
    themes: removeDuplicate(themes).slice(0, THEMES_RESULTS_NUMBER),
    class: parsed.classes[0],
  };
};

async function msearch(searches) {
  const requests: any[] = [];
  const keys: any[] = [];

  // return an empty object if we receive an empty object
  if (Object.keys(searches).length === 0) {
    return {};
  }

  const entries: any[] = Object.entries(searches);

  for (const [key, [index, query]] of entries) {
    requests.push(index, query);
    keys.push(key);
  }

  const body = await elasticsearchClient.msearch({ body: requests });

  const results = keys.reduce((state, key, index) => {
    const resp = body.responses[index];

    if (resp.status !== 200) {
      console.error(
        `Elastic search error : index ${index}, search key ${key} : ${JSON.stringify(resp, null, 2)}`
      );
    }

    state[key] = resp;
    return state;
  }, {});

  return results;
}
