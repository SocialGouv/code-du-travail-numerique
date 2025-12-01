import { complex } from "talisman/stemmers/french/unine";
import fingerprint from "talisman/tokenizers/fingerprint";
import { ccSearch, isIdccToken } from "../../idcc";
import { SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { getPrequalifiedResults } from "./prequalified";
import { getSearchBody, getRelatedArticlesBody } from "../queries";
import { elasticDocumentsIndex, elasticsearchClient } from "src/api/utils";
import { extractHits } from "./search";
import { removeDuplicate } from "../utils";
import { articleMatcher, extractReferences } from "./referenceExtractor";

export type SearchResult = {
  cdtnId: string;
  shortTitle?: string;
  title: string;
  slug: string;
  source: SourceKeys;
};

// temporary
const defaultIdccResults: SearchResult[] = [
  {
    cdtnId: "db8ffe3574",
    slug: "convention-collective",
    title: "Trouver sa convention collective",
    source: SOURCES.TOOLS,
  },
  {
    cdtnId: "b1041bd7ca",
    slug: "convention-collective",
    title: "Convention collective",
    source: SOURCES.SHEET_SP,
  },
  {
    cdtnId: "825821a69e",
    slug: "comment-consulter-une-convention-collective",
    title: "Comment consulter une convention collective ?",
    source: SOURCES.SHEET_SP,
  },
];

const CC_SCORE_THRESHOLD = 20;

const MATCHING_CC_TOKENS = [
  "convention",
  "collective",
  "conventions",
  "collectives",
  "collectif",
  "national",
  "branche",
  "branches",
  "idcc",
  "ccn",
];

const prepro = (token: string | undefined): string[] => {
  if (!token) return [];
  const tokens = fingerprint(token);
  return tokens ? tokens.map(complex) : [];
};

const isCC = async (query: string): Promise<SearchResult[]> => {
  const tokens: string[] = fingerprint(query);

  if (
    MATCHING_CC_TOKENS.find((t) => tokens.includes(t))?.length ||
    tokens.find(isIdccToken)
  ) {
    const remainingTokens = Array.from([
      ...tokens.filter((t) => !MATCHING_CC_TOKENS.includes(t)),
    ]);

    // in case we find a number, we assume idcc search and remove other tokens to avoid noise
    // otherwise, we run search with all non-matchingCC tokens
    const searchTokens = remainingTokens.find(isIdccToken)
      ? remainingTokens.filter(isIdccToken)
      : remainingTokens;

    // TODO remove "theme"-like tokens when performing CC search
    // or only select tokens that appear in all conventions titles

    const found = await ccSearch(searchTokens.join(" "), CC_SCORE_THRESHOLD);
    if (found) {
      return [found];
    } else {
      // case where CC related content but no match
      return defaultIdccResults;
    }
  } else {
    const foundNoCC = await ccSearch(query, CC_SCORE_THRESHOLD);
    if (foundNoCC) {
      return [foundNoCC];
    } else {
      return [];
    }
  }
};

const getThemes = (
  pQuery: string[],
  themes: SearchResult[]
): SearchResult | undefined => {
  const pThemes = themes.map((theme) => ({
    theme,
    pTheme: prepro(theme.title),
  }));

  let match = pThemes.find((th) => th.pTheme == pQuery);

  if (!match) {
    // in this case, we should select the highest one in the hierarchy
    match = pThemes.find((th) => pQuery.every((to) => th.pTheme.includes(to)));
  }

  return match
    ? {
        title: match.theme.title,
        slug: match.theme.slug,
        cdtnId: match.theme.cdtnId,
        source: match.theme.source,
      }
    : undefined;
};

// TODO borrowed from search / temporary code
const fillup = async (
  query: string,
  n: number,
  matches: SearchResult[]
): Promise<SearchResult[]> => {
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
  const prequalifiedResults = await getPrequalifiedResults(query).then(
    (results) => (results ? results.slice(0, n) : [])
  );

  let documents: SearchResult[] = matches;

  if (prequalifiedResults) {
    prequalifiedResults.forEach(
      (item) => (item._source.algo = "pre-qualified")
    );
    documents.push(
      ...prequalifiedResults
        .filter(
          ({ _source: { source } }) =>
            ![SOURCES.CDT, SOURCES.THEMES].includes(source)
        )
        .map((d) => d._source)
    );
  }

  // if not enough prequalified results, we also trigger ES search
  if (!prequalifiedResults || prequalifiedResults.length + matches.length < n) {
    const docSearch = getSearchBody(
      query,
      n - prequalifiedResults.length,
      sources
    );
    docSearch.size = 10;
    const ftRes = await elasticsearchClient.search({
      index: elasticDocumentsIndex,
      body: docSearch as any,
    });

    const results = extractHits(ftRes).map((d) => d._source);
    documents.push(...results);
    // console.log(JSON.stringify(results, null, 2));

    if (documents.length > 0) {
      documents = removeDuplicate(documents, ({ cdtnId }) => cdtnId);
    }
  }

  return documents
    .map((res) => ({
      type: res.source as any as DocumentType,
      ...res,
      title: res.shortTitle ?? res.title,
    }))
    .slice(0, n);
};

const getArticles = async (query): Promise<SearchResult | undefined> => {
  // proper references
  let refs: { text: string }[] = extractReferences(query);

  if (refs.length < 1) {
    // first token matching regex
    const match = articleMatcher(query.split(" ")[0]);
    if (match) {
      refs.push({ text: match[0] });
    }
  }

  // only retrieve the first matching
  if (refs.length > 0) {
    const match = refs[0];

    const hits = await elasticsearchClient.search({
      body: getRelatedArticlesBody(match.text, 1) as any,
      index: elasticDocumentsIndex,
    });

    return extractHits(hits).map((h) => ({
      ...h._source,
    }));
  } else {
    return undefined;
  }
};

const isNatural = (query: string) => {
  const tokens = fingerprint(query);
  const matching = [
    "comment",
    "combien",
    "quand",
    "je",
    "nous",
    "me",
    "il",
    "doit",
    "quel",
    "quels",
    "on",
  ];
  return (
    query.includes("?") ||
    matching.find((m) => tokens.includes(m)) ||
    tokens.length >= 8
  );
};

export const presearch = async (
  query: string,
  themes: SearchResult[]
): Promise<SearchResult[]> => {
  // const results: StructuredQueryLabel[] = [];
  const results: SearchResult[] = [];

  const pQuery = prepro(query);

  const idccResult = await isCC(query);
  results.push(...idccResult);

  const article = await getArticles(query);
  if (article) {
    results.push(article);
  }

  const matchingTheme = getThemes(pQuery, themes);
  if (matchingTheme) {
    results.push(matchingTheme);
  }

  // const matchingStd = getStandardKeyword(pQuery);
  // if (matchingStd) {
  //   results.push(matchingStd);
  // }

  // if (results.length == 0) {
  //   const natural = isNatural(query);
  //   results.push({
  //     label: natural ? LabelEnum.NATURAL : LabelEnum.KEYWORD,
  //     details: query,
  //   });
  // }

  if (results.length < 4) {
    const filled = await fillup(query, 4, results);
    return filled;
  } else {
    return results;
  }
};
