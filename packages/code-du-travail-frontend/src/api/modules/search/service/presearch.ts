import { complex } from "talisman/stemmers/french/unine";
import fingerprint from "talisman/tokenizers/fingerprint";
import { ccSearch, ensureIdccsInstantiated, isIdccToken } from "../../idcc";
import { SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { getPrequalifiedResults } from "./prequalified";
import { getSearchBody, getRelatedArticlesBody } from "../queries";
import { elasticDocumentsIndex, elasticsearchClient } from "src/api/utils";
import { extractHits } from "./search";
import { removeDuplicate } from "../utils";
import { articleMatcher, extractReferences } from "./referenceExtractor";

const keyword_std = [
  "a conservatoir mise pied",
  "a convoc disciplinair entretien prealabl sanction une",
  "a de depart indemnit la retrait",
  "a de depart la prim retrait",
  "a lamiabl ruptur",
  "a mise pied",
  "acident de trajet",
  "acord dentrepris",
  "acquis aret cong malad paye pendant",
  "acquis cong paye",
  "afichag obligatoir",
  "alait",
  "alternanc contrat daprentisag et",
  "amenag de du post travail",
  "ancienet",
  "aprentisag",
  "aret de maintien malad salair",
  "aret de travail",
  "aret malad",
  "atest de travail",
  "au avenant contrat de travail",
  "au harcel moral travail",
  "au inaptitud travail",
  "averti",
  "calcul compt de sold tout",
  "carenc cdd de delai",
  "cdd contrat",
  "cdd renouvel",
  "cdi convention ruptur",
  "cdi demision",
  "cdi preavi",
  "certificat de travail",
  "claus concurenc de non",
  "compens repo",
  "complementair heur",
  "compt de sold tout",
  "cong dancienet",
  "cong dece",
  "cong dece grand parent pour",
  "cong enfant malad",
  "cong et fraction paye",
  "cong et malad paye",
  "cong et mi paye temp therapeut",
  "cong even familial les pour",
  "cong exception",
  "cong parental",
  "cong paternit",
  "cong san sold",
  "contrat de delai document fin",
  "cse",
  "cse entrepris",
  "csp",
  "dan du le paie retard salair",
  "dancienet prim",
  "de delai desai et period prevenanc ruptur",
  "de delai desai period prevenanc",
  "de deleg heur",
  "de demision du dure preavi",
  "de demision letr",
  "de deplac domicil frai trajet travail",
  "de et maintien malad salair",
  "de fich paie",
  "de frai indemnit repa",
  "de gril salair",
  "de indemnit licenc",
  "de letr licenc model type",
  "de paus temp",
  "dece employeu",
  "demenag",
  "dimanch le travail",
  "disciplinair pouvoi",
  "du dure preavi",
  "enfant malad",
  "et mutuel retrait",
  "faut licenc pour",
  "fer jour travail",
  "harcel moral",
  "heur non paye suplementair",
  "impay salair",
  "indemnit licenc",
  "indemnit repa",
  "medical travail visit",
  "minimum salair",
  "mitemp therapeut",
  "preavi",
  "prevoyanc",
  "retard",
];

export enum PresearchClass {
  CC = "cc",
  CC_FOUND = "cc_found",
  KEYWORD = "keyword",
  KEYWORD_STD = "keyword_standard",
  ARTICLE = "article",
  THEME = "theme",
  NATURAL = "natural",
  UNKNOWN = "unknown",
}

export type SearchResult = {
  cdtnId: string;
  shortTitle?: string;
  title: string;
  slug: string;
  source: SourceKeys;
  class: PresearchClass;
  algo: "presearch";
};

export type ThemeSearchResult = SearchResult & { breadcrumbs: unknown[] };

// temporary
const defaultIdccResults: SearchResult[] = [
  {
    cdtnId: "db8ffe3574",
    slug: "convention-collective",
    title: "Trouver sa convention collective",
    source: SOURCES.TOOLS,
    class: PresearchClass.CC_FOUND,
    algo: "presearch",
  },
  {
    cdtnId: "b1041bd7ca",
    slug: "convention-collective",
    title: "Convention collective",
    source: SOURCES.SHEET_SP,
    class: PresearchClass.CC_FOUND,
    algo: "presearch",
  },
  {
    cdtnId: "825821a69e",
    slug: "comment-consulter-une-convention-collective",
    title: "Comment consulter une convention collective ?",
    source: SOURCES.SHEET_SP,
    class: PresearchClass.CC_FOUND,
    algo: "presearch",
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

const tokenize = (content: string): string[] => {
  const cleaned = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
  return fingerprint(cleaned);
};

const prepro = (content: string | undefined): string[] => {
  if (!content) return [];
  const tokens = tokenize(content);
  return tokens ? tokens.map(complex) : [];
};

const isCC = async (query: string): Promise<SearchResult[]> => {
  await ensureIdccsInstantiated();

  const tokens: string[] = tokenize(query);

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

    const found = await ccSearch(
      searchTokens.join(" "),
      CC_SCORE_THRESHOLD - 10
    );

    if (found) {
      return [{ ...found, class: PresearchClass.CC, algo: "presearch" }];
    } else {
      // case where CC related content but no match
      return defaultIdccResults;
    }
  } else {
    const foundNoCC = await ccSearch(query, CC_SCORE_THRESHOLD);
    if (foundNoCC) {
      return [{ ...foundNoCC, class: PresearchClass.CC, algo: "presearch" }];
    } else {
      return [];
    }
  }
};

const getThemes = (
  pQuery: string[],
  themes: ThemeSearchResult[]
): SearchResult | undefined => {
  // sort by breadcrumbs
  const pThemes = themes
    .sort((a, b) => a.breadcrumbs.length - b.breadcrumbs.length)
    .map((theme) => ({
      theme,
      pTheme: prepro(theme.title),
    }));

  let match = pThemes.find((th) => th.pTheme == pQuery);

  if (!match) {
    // in this case, we select the highest one in the hierarchy (thanks to breadcrumbs length sort above)
    match = pThemes.find((th) => pQuery.every((to) => th.pTheme.includes(to)));
  }

  return match
    ? {
        title: match.theme.title,
        slug: match.theme.slug,
        cdtnId: match.theme.cdtnId,
        source: match.theme.source,
        class: PresearchClass.THEME,
        algo: "presearch",
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
  if (documents.length < n) {
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
  }

  // Always deduplicate to avoid duplicate sources
  if (documents.length > 0) {
    documents = removeDuplicate(documents, ({ cdtnId }) => cdtnId);
  }

  return documents
    .map((res) => ({
      type: res.source as any as DocumentType,
      ...res,
      title: res.shortTitle ?? res.title,
    }))
    .slice(0, n);
};

const getArticles = async (query): Promise<SearchResult[]> => {
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
  if (refs.length > 0 && refs[0].text.length > 4) {
    const match = refs[0];

    const hits = await elasticsearchClient.search({
      body: getRelatedArticlesBody(match.text, 1) as any,
      index: elasticDocumentsIndex,
    });

    return extractHits(hits).map((h) => ({
      ...h._source,
      presearch: PresearchClass.ARTICLE,
    }));
  } else {
    return [];
  }
};

const isStandardKeyword = (pQuery: string[]) =>
  keyword_std.includes(pQuery.join(" "));

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
  themes: ThemeSearchResult[],
  allClasses: Boolean
): Promise<{ results: SearchResult[]; classes: PresearchClass[] }> => {
  // const results: StructuredQueryLabel[] = [];
  const results: SearchResult[] = [];

  const pQuery = prepro(query);

  const idccResult = await isCC(query);
  results.push(...idccResult);

  const articles = await getArticles(query);
  if (articles) {
    results.push(...articles);
  }

  const matchingTheme = getThemes(pQuery, themes);
  if (matchingTheme) {
    results.push(matchingTheme);
  }

  const classes = results.map((r) => r.class);

  if (allClasses) {
    const matchingStd = isStandardKeyword(pQuery);
    if (matchingStd && classes.length == 0) {
      classes.push(PresearchClass.KEYWORD_STD);
    }

    if (isNatural(query)) {
      classes.push(PresearchClass.NATURAL);
    }
  }

  if (classes.length < 1) {
    classes.push(PresearchClass.UNKNOWN);
  }

  if (results.length < 4) {
    const filled = await fillup(query, 4, results);
    return { results: filled, classes };
  } else {
    return { results, classes };
  }
};
