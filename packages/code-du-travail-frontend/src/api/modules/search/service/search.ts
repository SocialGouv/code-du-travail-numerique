import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";
import {
  getRelatedArticlesBody,
  getRelatedThemesBody,
  getSearchBody,
} from "../queries";
import { removeDuplicate } from "../utils";
import { getPrequalifiedResults } from "./prequalified";

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;
const THEMES_RESULTS_NUMBER = 5;
const CDT_RESULTS_NUMBER = 5;
const DOCUMENTS_ES = "documents_es";
const THEMES_ES = "themes_es";
const CDT_ES = "cdt_es";

export const searchWithQuery = async (
  query: string,
  skipPrequalifiedResults: boolean,
  sizeParams?: number
) => {
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

  // check prequalified requests
  const prequalifiedResults =
    !skipPrequalifiedResults && (await getPrequalifiedResults(query));
  let documents: any[] = [];
  let articles: any[] = [];
  let themes: any[] = [];

  if (prequalifiedResults) {
    prequalifiedResults.forEach(
      (item) => (item._source.algo = "pre-qualified")
    );
    documents = prequalifiedResults.filter(
      ({ _source: { source } }) =>
        ![SOURCES.CDT, SOURCES.THEMES].includes(source)
    );
    articles = prequalifiedResults.filter(
      ({ _source: { source } }) => source === SOURCES.CDT
    );
    themes = prequalifiedResults.filter(
      ({ _source: { source } }) => source === SOURCES.THEMES
    );
  }

  const searches = {};
  const shouldRequestCdt = articles.length < 5;
  const shouldRequestThemes = themes.length < 5;
  const size = Math.min(sizeParams ?? DEFAULT_RESULTS_NUMBER, MAX_RESULTS);

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

  if (shouldRequestThemes) {
    const themeNumber = THEMES_RESULTS_NUMBER - themes.length;
    searches[THEMES_ES] = [
      { index: elasticDocumentsIndex }, // we search in themeIndex here to try to match title in breadcrumb
      getRelatedThemesBody(query, themeNumber),
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

  const fulltextHits = extractHits(results[DOCUMENTS_ES]);
  fulltextHits.forEach((item) => (item._source.algo = "fulltext"));

  documents.push(...fulltextHits);
  documents = removeDuplicate(documents);

  if (shouldRequestThemes) {
    const fulltextHits = extractHits(results[THEMES_ES]);
    fulltextHits.forEach((item) => (item._source.algo = "fulltext"));
    themes = removeDuplicate(
      themes.concat(fulltextHits).slice(0, THEMES_RESULTS_NUMBER)
    );
  }
  if (shouldRequestCdt) {
    articles = removeDuplicate(articles.concat(results[CDT_ES].hits.hits));
  }

  const mapDocuments = documents.map(({ _score, _source }) => ({
    _score: _score ?? null,
    ..._source,
    title: _source.shortTitle ?? _source.title,
  }));

  return {
    articles: articles.map(({ _score, _source }) => ({
      _score: _score ?? null,
      ..._source,
      title: _source.shortTitle ?? _source.title,
    })),
    documents: mapDocuments,
    // we add source prop since some result might come from dedicated themes index
    // which has no source prop
    themes: themes.map(({ _score, _source }) => ({
      _score: _score ?? null,
      ..._source,
      source: SOURCES.THEMES,
    })),
  };
};

function extractHits(response) {
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
