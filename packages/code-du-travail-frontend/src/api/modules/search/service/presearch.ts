import { complex } from "talisman/stemmers/french/unine";
import fingerprint from "talisman/tokenizers/fingerprint";
import { ccSearch, ensureIdccsInstantiated, isIdccToken } from "../../idcc";
import { getRelatedArticlesBody } from "../queries";
import { elasticDocumentsIndex, elasticsearchClient } from "src/api/utils";
import { extractHits } from "../utils";
import { articleMatcher, extractReferences } from "./referenceExtractor";
import {
  getDefaultIdccResults,
  MATCHING_CC_TOKENS,
  NO_CC_TOKENS,
} from "./defaultIdcc";
import {
  PresearchClass,
  PreSearchResult,
  SEARCH_ALGO,
  SearchResult,
  ThemeSearchResult,
} from "./types";

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

const CC_SCORE_THRESHOLD = 20;

const PRESEARCH_MAX_RESULTS = 8;

const tokenize = (content: string): string[] => {
  const cleaned = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
  return fingerprint(cleaned);
};

const prepro = (content: string | undefined): string[] => {
  if (!content) return [];
  const tokens = tokenize(content);
  return tokens ? tokens.map(complex) : [];
};

const isCC = async (query: string): Promise<PreSearchResult[]> => {
  await ensureIdccsInstantiated();

  const tokens: string[] = tokenize(query);

  if (
    // if query includes a CC related token
    (tokens.find((t) => MATCHING_CC_TOKENS.includes(complex(t)))?.length ||
      // or an IDCC
      tokens.find(isIdccToken)) &&
    // and none of the excluded token
    !tokens.find((t) => NO_CC_TOKENS.includes(complex(t)))?.length
  ) {
    const remainingTokens = Array.from([
      ...tokens.filter((t) => !MATCHING_CC_TOKENS.includes(complex(t))),
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
      return [
        {
          ...found,
          class: PresearchClass.CC,
          algo: SEARCH_ALGO.PRESEARCH,
        },
      ];
    } else {
      // case where CC related content but no match
      return getDefaultIdccResults();
    }
  } else {
    const foundNoCC = await ccSearch(query, CC_SCORE_THRESHOLD);
    if (foundNoCC) {
      return [
        {
          ...foundNoCC,
          class: PresearchClass.CC,
          algo: SEARCH_ALGO.PRESEARCH,
        },
      ];
    } else {
      return [];
    }
  }
};

const getThemes = (
  pQuery: string[],
  themes: ThemeSearchResult[]
): PreSearchResult | undefined => {
  // sort by breadcrumbs
  themes.sort((a, b) => a.breadcrumbs.length - b.breadcrumbs.length);

  const pThemes = themes.map((theme) => ({
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
        algo: SEARCH_ALGO.PRESEARCH,
        description: `Retrouvez les contenus relatifs au thème : ${match.theme.title}`,
      }
    : undefined;
};

const getArticles = async (query): Promise<PreSearchResult[]> => {
  // proper references
  const refs: { text: string }[] = extractReferences(query);

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
      class: PresearchClass.ARTICLE,
      algo: SEARCH_ALGO.PRESEARCH,
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
  allClasses: boolean
): Promise<{ results: SearchResult[]; classes: PresearchClass[] }> => {
  const results: PreSearchResult[] = [];

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

  const uniqueClasses = [...new Set(classes)];

  return {
    results: results.slice(0, PRESEARCH_MAX_RESULTS),
    classes: uniqueClasses,
  };
};
