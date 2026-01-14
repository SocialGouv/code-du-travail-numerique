import { SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import {
  getRelatedArticlesBody,
  getRelatedThemesBody,
  getSearchBody,
} from "../queries";
import { removeDuplicate } from "../utils";
import { getPrequalifiedResults } from "./prequalified";
import { presearch, PresearchClass } from "./presearch";

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;
const THEMES_RESULTS_NUMBER = 5;
const CDT_RESULTS_NUMBER = 5;

const DOCUMENTS_ES = "documents_es";
const CDT_ES = "cdt_es";

export const SEARCH_ALGO = {
  PREQUA: "pre-qualified",
  FULL_TEXT: "fulltext",
  PRESEARCH: "presearch",
} as const;

export type SearchAlgo = (typeof SEARCH_ALGO)[keyof typeof SEARCH_ALGO];

export type SearchResult = {
  _score?: number;
  description: string;
  cdtnId: string;
  slug: string;
  source: SourceKeys;
  title: string;
  algo: SearchAlgo;
  breadcrumbs?: {
    label: string;
    position: number;
    slug: string;
  }[];
  url?: string;
};

const esDocToSearchResult =
  (algo: SearchAlgo) =>
  ({ _score, _source }): SearchResult => ({
    _score: _score ?? null,
    ..._source,
    title: _source.shortTitle ?? _source.title,
    algo,
  });

export const searchWithQuery = async (
  query: string,
  sizeParams = DEFAULT_RESULTS_NUMBER
): Promise<{
  articles: SearchResult[];
  themes: SearchResult[];
  documents: SearchResult[];
  classes: string[];
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

  const documents: SearchResult[] = parsed.results;

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
  if (
    !prequalifiedResults ||
    prequalifiedResults.length < DEFAULT_RESULTS_NUMBER
  ) {
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
    articles: removeDuplicate(documents),
    documents: removeDuplicate(documents),
    themes: removeDuplicate(themes).slice(0, THEMES_RESULTS_NUMBER),
    classes: parsed.classes,
  };
};

export function extractHits(response) {
  if (response && response.hits) {
    return response.hits.hits;
  }
  return [];
}

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
